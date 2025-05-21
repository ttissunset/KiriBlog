<template>
  <div class="article-view">
    <div v-if="article" class="article-page">
      <!-- 返回博客列表 -->
      <div class="back-to-blog">
        <router-link to="/blog" class="back-button">
          <MaterialIcon icon="arrow_back" />
          <span>返回列表</span>
        </router-link>

        <div class="export-buttons">
          <button class="export-button" @click="exportToPDF" title="导出为PDF">
            <MaterialIcon icon="picture_as_pdf" />
            <span>PDF</span>
          </button>
          <button class="export-button" @click="exportToMarkdown" title="导出为Markdown">
            <MaterialIcon icon="download" />
            <span>Markdown</span>
          </button>
        </div>
      </div>

      <!-- 文章内容 -->
      <article class="article-content">
        <!-- 阅读进度条 -->
        <div class="article-progress-container">
          <div class="article-progress-bar" ref="progressBar"></div>
        </div>
        
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <div class="meta-item">
              <span class="meta-icon">
                <MaterialIcon icon="calendar_today" />
              </span>
              <span class="meta-text">{{
                formatDateTime(article.createdAt)
              }}</span>
              <span class="meta-separator">•</span>
              <span class="meta-icon">
                <MaterialIcon icon="folder" />
            </span>
              <router-link :to="{ name: 'blog', query: { category: article.category } }" class="category-link">
                {{ article.category }}
              </router-link>
            </div>
            <span class="detail-separator">•</span>
            <div class="meta-author">
              <span class="author-icon">
                <MaterialIcon icon="person" />
            </span>
              <span class="author-name">{{ article.author || "Kiri" }}</span>
              <span class="detail-separator">•</span>
              <span class="time-icon">
                <MaterialIcon icon="access_time" />
            </span>
              <span class="time-text">预计阅读时间{{ calculateReadingTime(article.content) }}分钟</span>
            </div>
          </div>
        </header>

        <div class="article-container">
          <div class="article-main">
            <div class="article-summary">
              {{ article.summary }}
            </div>

        <div class="ai-summary" :class="{ expanded: isSummaryExpanded }">
          <div class="summary-header">
                <span class="summary-icon">
                  <MaterialIcon icon="star" />
                </span>
                <span class="summary-title">AI摘要</span>
                <span class="summary-powered">由AI提供</span>
          </div>
          <div class="summary-content">
            <p>时光如镜映代码，云舟载梦启航程。</p>
            <p>星火轻盈燃运维，容器万千纳轻舟。</p>
            <div v-if="isSummaryExpanded" class="summary-full-content">
              <p>
                云计算是一种通过互联网提供计算服务的模式，它允许用户在不拥有实际物理设备的情况下，通过网络按需访问计算资源。
              </p>
              <p>
                容器技术如Docker简化了应用程序部署流程，使应用能够运行在任何支持容器的环境中，无需考虑底层系统配置差异。
              </p>
              <p>
                本文将探讨Docker容器技术的核心概念、实际应用场景及部署最佳实践，帮助开发者充分利用容器化技术优势。
              </p>
            </div>
          </div>
          <div class="summary-more">
                <span v-if="!isSummaryExpanded">开发 ≠ 搬运。不学习底层原理你永远不知道...</span>
                <button class="show-more-btn" @click="toggleSummary" style="margin-left: auto">
                  <span class="arrow-icon" :class="{ up: isSummaryExpanded }">
                    <MaterialIcon icon="expand_more" />
                  </span>
                  {{ isSummaryExpanded ? "显示更少" : "显示更多" }}
            </button>
          </div>
        </div>

            <!-- 使用动态组件渲染Markdown内容，支持代码块 -->
            <div v-if="processedContent.length > 0" class="markdown-body">
              <template v-for="(block, index) in processedContent" :key="index">
                <codepen-viewer v-if="block.type === 'code'" :code="block.content" :language="block.language" />
                <div v-else v-html="block.content"></div>
              </template>
            </div>
            <div v-else class="markdown-body" v-html="renderedContent"></div>

        <div class="article-footer">
          <div class="article-tags">
                <span class="tags-label">标签</span>
                <router-link v-for="tag in article.tags" :key="tag" :to="{ name: 'blog', query: { tag } }" class="article-tag">
                  #{{ tag }}
            </router-link>
          </div>

              <div class="article-views">
                <span class="views-icon">
                  <MaterialIcon icon="visibility" />
                </span>
                <span class="views-count">{{ article.views }} 次浏览</span>
              </div>
            </div>
          </div>

          <!-- 文章大纲 -->
          <div class="article-toc desktop-toc" v-if="tableOfContents.length > 0">
            <h3 class="toc-title">目录</h3>
            <ul class="toc-list">
              <li v-for="(heading, index) in tableOfContents" :key="index" :class="[`toc-level-${heading.level}`, { active: heading.isActive }]">
                <a :href="`#${heading.id}`" @click.prevent="scrollToHeading(heading.id)">
                  {{ heading.text }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 移动端悬浮目录按钮 -->
          <div class="mobile-toc-button" @click="toggleToc" v-if="tableOfContents.length > 0">
            <MaterialIcon icon="menu" />
          </div>

          <!-- 移动端目录弹出层 -->
          <div class="mobile-toc-container" v-if="isTocVisible && tableOfContents.length > 0">
            <div class="mobile-toc-overlay" @click="toggleToc"></div>
            <div class="mobile-toc">
              <div class="mobile-toc-header">
                <h3 class="toc-title">目录</h3>
                <button @click="toggleToc" class="close-toc-btn">
                  <MaterialIcon icon="close" />
                </button>
              </div>
              <ul class="toc-list">
                <li v-for="(heading, index) in tableOfContents" :key="index" :class="[`toc-level-${heading.level}`, { active: heading.isActive }]">
                  <a :href="`#${heading.id}`" @click.prevent="scrollToHeading(heading.id); toggleToc();">
                    {{ heading.text }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <!-- 上一篇和下一篇 -->
      <div class="article-navigation">
        <div class="prev-article" v-if="prevArticle">
          <span>上一篇</span>
          <router-link :to="{ name: 'article', params: { id: prevArticle.id } }">
            {{ prevArticle.title }}
          </router-link>
        </div>
        <div class="next-article" v-if="nextArticle">
          <span>下一篇</span>
          <router-link :to="{ name: 'article', params: { id: nextArticle.id } }">
            {{ nextArticle.title }}
          </router-link>
        </div>
      </div>

      <!-- 相关文章 -->
      <div class="related-articles" v-if="relatedArticles.length > 0">
        <h3>相关文章</h3>
        <div class="related-list">
          <div v-for="relatedArticle in relatedArticles" :key="relatedArticle.id" class="related-item">
            <router-link :to="{ name: 'article', params: { id: relatedArticle.id } }">
              {{ relatedArticle.title }}
            </router-link>
            <div class="related-meta">
              <span>{{ formatDateTime(relatedArticle.createdAt) }}</span>
              <span>{{ relatedArticle.views }} 次浏览</span>
            </div>
          </div>
        </div>
          </div>
    </div>
    <div v-else class="article-not-found">
      <h1>文章未找到</h1>
      <p>抱歉，您要查看的文章不存在或已被删除</p>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogStore } from "../stores/blogStore";
import { format } from "date-fns";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { saveAs } from "file-saver";
import { createApp } from "vue";

// 处理Markdown内容，分离代码块和普通内容
const processMarkdown = (markdown) => {
  if (!markdown || typeof markdown !== "string") {
    return [];
  }
  
  try {
    const result = [];
    let lastIndex = 0;
    const codeBlockRegex = /```([a-z]*)\n([\s\S]+?)```/g;
    let match;

    // 查找所有代码块
    while ((match = codeBlockRegex.exec(markdown)) !== null) {
      // 添加代码块前的内容
      if (match.index > lastIndex) {
        const textBefore = markdown.substring(lastIndex, match.index);
        if (textBefore.trim()) {
          result.push({
            type: "text",
            content: renderTextContent(textBefore),
          });
        }
      }

      // 添加代码块
      result.push({
        type: "code",
        language: match[1] || "",
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    // 添加最后一个代码块后的内容
    if (lastIndex < markdown.length) {
      const textAfter = markdown.substring(lastIndex);
      if (textAfter.trim()) {
        result.push({
          type: "text",
          content: renderTextContent(textAfter),
        });
      }
    }

    return result;
  } catch (error) {
    console.error("Markdown处理错误:", error);
    return [];
  }
};

// 仅渲染文本内容（非代码块）
const renderTextContent = (text) => {
  try {
    // 查找所有图片语法并记录
    const imgMatches = text.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
    if (imgMatches) {
      console.log('找到图片语法:', imgMatches.length, imgMatches);
    }
    
    // 处理标题 (h1 - h6)
    let html = text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      const id = content.toLowerCase().replace(/[^\w]+/g, "-");
      return `<h${level} id="${id}">${content}</h${level}>`;
    });
    
    // 处理粗体
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    
    // 处理斜体
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    
    // 重要：先处理图片语法，避免与链接语法冲突
    // 图片语法：![alt](url)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
      try {
        const safeUrl = url.trim();
        const safeAlt = (alt || '').trim() || '图片';
        
        console.log('处理图片:', { match, alt: safeAlt, url: safeUrl });
        
        return `
          <figure class="article-image-wrapper">
            <img src="${safeUrl}" alt="${safeAlt}" class="article-image" title="${safeAlt}">
          </figure>
        `;
      } catch (error) {
        console.error('图片处理错误:', error, match);
        return `<img src="${url}" alt="${alt || '图片'}" class="fallback-image">`;
      }
    });
    
    // 处理链接 [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const safeUrl = url.trim();
      const safeText = text.trim();
      return `<a href="${safeUrl}" target="_blank">${safeText}</a>`;
    });
    
    // 继续其他处理...
    // 处理行内代码
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // 处理分割线
    html = html.replace(/^---$/gm, '<hr class="markdown-hr">');
    
    // 处理引用块
    html = html.replace(/^>\s(.+)$/gm, "<blockquote class=\"highlighted-quote\">$1</blockquote>");
    
    // 处理表格
    if (html.includes('|')) {
      // 改进的表格正则表达式，更精确地匹配Markdown表格结构
      const tableRegex = /(?:^\|.+\|[ \t]*$[\r\n]+^\|[-:| \t]+\|[ \t]*$[\r\n]+(^\|.+\|[ \t]*$[\r\n]+)+)/gm;
      
      html = html.replace(tableRegex, (match) => {
        // 确保表格数据正确传递
        console.log('匹配到表格:', match);
        return `<div class="table-component-wrapper" data-markdown-table="${encodeURIComponent(match)}"></div>`;
      });
    }
    
    // 处理无序列表 (先标记项目，后包装列表)
    const ulMatch = html.match(/^[\*\-]\s(.+)$/gm);
    if (ulMatch) {
      const items = ulMatch
        .map((item) => `<li>${item.replace(/^[\*\-]\s/, "")}</li>`)
        .join("");
      html = html.replace(/^[\*\-]\s(.+)$/gm, (match) => {
        return `<li>${match.replace(/^[\*\-]\s/, "")}</li>`;
      });
      
      // 将连续的<li>元素用<ul>包裹
      html = html.replace(/(<li>[\s\S]+?<\/li>)(?!\s*<li>)/g, "<ul class=\"markdown-list\">$1</ul>");
    }
    
    // 处理有序列表
    const olMatch = html.match(/^\d+\.\s(.+)$/gm);
    if (olMatch) {
      const items = olMatch
        .map((item) => `<li>${item.replace(/^\d+\.\s/, "")}</li>`)
        .join("");
      html = html.replace(/^\d+\.\s(.+)$/gm, (match) => {
        return `<li>${match.replace(/^\d+\.\s/, "")}</li>`;
      });
      
      // 将连续的<li>元素用<ol>包裹
      html = html.replace(/(<li>[\s\S]+?<\/li>)(?!\s*<li>)/g, "<ol class=\"markdown-list\">$1</ol>");
    }
    
    // 处理段落 (对非标签开头的行添加段落标签)
    html = html.replace(/^(?!<[a-z]).+$/gm, "<p>$&</p>");
    
    // 替换换行符为实际的换行
    html = html.replace(/\n/g, "");
    
    // 使用DOMPurify清理HTML，防止XSS攻击
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.error("Markdown渲染错误:", error);
    return "<p>内容渲染出错，请刷新页面重试。</p>";
  }
};

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const isSummaryExpanded = ref(false);
const progressBar = ref(null);
const tableOfContents = ref([]);
const headingElements = ref([]);
const isTocVisible = ref(false); // 新增：控制目录显示/隐藏状态

// 获取文章ID
const articleId = computed(() => Number(route.params.id));

// 获取当前文章
const article = computed(() => blogStore.getArticleById(articleId.value));

// 生成文章大纲
const generateTableOfContents = () => {
  // 需要等待DOM渲染完成
  setTimeout(() => {
    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6');
    
    if (headings.length === 0) return;
    
    const contents = [];
    headingElements.value = Array.from(headings);
    
    headingElements.value.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      const text = heading.textContent;
      const id = heading.id || text.toLowerCase().replace(/[^\w]+/g, '-');
      
      // 确保每个标题都有ID，以便能够跳转
      if (!heading.id) {
        heading.id = id;
      }
      
      contents.push({
        level,
        text,
        id,
        isActive: false
      });
    });
    
    tableOfContents.value = contents;
  }, 100);
};

// 跳转到指定标题
const scrollToHeading = (headingId) => {
  const element = document.getElementById(headingId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// 更新阅读进度条和目录高亮
const updateProgress = () => {
  if (!progressBar.value) return;
  
  // 计算滚动百分比
  const scrollPosition = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollPosition / documentHeight) * 100;
  
  // 更新进度条
  progressBar.value.style.width = `${scrollPercentage}%`;
  
  // 更新目录高亮
  if (headingElements.value.length > 0) {
    // 找到当前视口中的标题
    let currentHeadingIndex = -1;
    
    for (let i = 0; i < headingElements.value.length; i++) {
      const heading = headingElements.value[i];
      const rect = heading.getBoundingClientRect();
      
      // 认为标题进入视口顶部100px内就是当前位置
      if (rect.top <= 100) {
        currentHeadingIndex = i;
      } else {
        break;
      }
    }
    
    // 更新目录激活状态
    tableOfContents.value.forEach((item, index) => {
      item.isActive = index === currentHeadingIndex;
    });
  }
};

// 获取与当前文章相关的文章列表
const relatedArticles = computed(() =>
  article.value ? blogStore.getRelatedArticles(articleId.value) : []
);

// 处理后的内容，包含代码块和普通内容
const processedContent = computed(() => {
  if (!article.value || !article.value.content) return [];
  return processMarkdown(article.value.content);
});

// 使用自定义函数处理Markdown内容为HTML（备用方案）
const renderedContent = computed(() => {
  if (!article.value || !article.value.content) return "";
  return renderTextContent(article.value.content);
});

// 获取上一篇文章（如果存在）
const prevArticle = computed(() => {
  if (!article.value) return null;
  const allArticles = blogStore.articles;
  const currentIndex = allArticles.findIndex((a) => a.id === articleId.value);
  return currentIndex > 0 ? allArticles[currentIndex - 1] : null;
});

// 获取下一篇文章（如果存在）
const nextArticle = computed(() => {
  if (!article.value) return null;
  const allArticles = blogStore.articles;
  const currentIndex = allArticles.findIndex((a) => a.id === articleId.value);
  return currentIndex < allArticles.length - 1
    ? allArticles[currentIndex + 1]
    : null;
});

// 格式化日期为精确到秒的格式
const formatDateTime = (dateString) => {
  return format(new Date(dateString), "yyyy/MM/dd HH:mm:ss");
};

// 格式化更新日期为精确到秒的格式
const formatUpdatedDate = (dateString) => {
  return format(new Date(dateString), "yyyy/MM/dd HH:mm:ss");
};

// 估算文章阅读时间（基于单词数量）
const calculateReadingTime = (content) => {
  if (!content) return 1;
  const wordsPerMinute = 300; // 假设平均阅读速度为每分钟300个单词
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes < 1 ? 1 : minutes; // 至少1分钟
};

// 切换摘要展开/收起状态
const toggleSummary = () => {
  isSummaryExpanded.value = !isSummaryExpanded.value;
};

// 切换目录显示/隐藏
const toggleToc = () => {
  isTocVisible.value = !isTocVisible.value;
};

// 在组件挂载时添加复制代码功能
onMounted(() => {
  if (article.value) {
    blogStore.incrementArticleViews(articleId.value);
  }
  
  // 处理图片点击事件，添加放大查看功能
  setTimeout(() => {
    document.querySelectorAll('.article-image').forEach(img => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 创建放大查看容器
        const viewer = document.createElement('div');
        viewer.className = 'image-viewer-overlay';
        viewer.innerHTML = `
          <div class="image-viewer-container">
            <img src="${img.src}" alt="${img.alt}" class="image-viewer-img">
            <div class="image-viewer-caption">${img.alt}</div>
            <button class="image-viewer-close">×</button>
            <button class="image-viewer-save">
              <span class="material-icons-sharp">download</span>
              保存图片
            </button>
          </div>
        `;
        
        document.body.appendChild(viewer);
        
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
        
        // 添加关闭事件
        viewer.querySelector('.image-viewer-close').addEventListener('click', () => {
          document.body.removeChild(viewer);
          document.body.style.overflow = '';
        });
        
        // 点击背景关闭
        viewer.addEventListener('click', (e) => {
          if (e.target === viewer) {
            document.body.removeChild(viewer);
            document.body.style.overflow = '';
          }
        });
        
        // 添加保存事件
        viewer.querySelector('.image-viewer-save').addEventListener('click', () => {
          window.saveImage(img.src, img.alt);
        });
      });
    });
  }, 200);

  // 处理表格组件的挂载 - 修改为使用Vue组件进行渲染
  setTimeout(() => {
    document.querySelectorAll('.table-component-wrapper').forEach(wrapper => {
      try {
        const markdownTable = decodeURIComponent(wrapper.getAttribute('data-markdown-table'));
        console.log('解码后的表格数据:', markdownTable);
        
        // 清理表格数据，移除可能干扰解析的前后空白
        const cleanedTable = markdownTable.trim();
        
        // 创建TableViewer组件实例
        const app = createApp(TableViewer, {
          markdown: cleanedTable
        });
        
        // 挂载组件
        const mountElement = document.createElement('div');
        wrapper.innerHTML = ''; // 清空原有内容
        wrapper.appendChild(mountElement);
        app.mount(mountElement);
      } catch (error) {
        console.error("表格组件渲染失败:", error);
        // 回退到旧的渲染方式
        const markdownTable = decodeURIComponent(wrapper.getAttribute('data-markdown-table'));
        const fallbackTableHtml = renderFallbackTable(markdownTable);
        wrapper.innerHTML = fallbackTableHtml;
      }
    });
  }, 100);
  
  // 添加复制代码的全局函数
  window.copyCode = (button) => {
    // 找到代码内容
    const codeWrapper = button.closest(".code-block-wrapper");
    const lineContents = codeWrapper.querySelectorAll(".line-content");
    
    // 从各行内容中提取纯文本
    const codeText = Array.from(lineContents)
      .map((line) => line.textContent)
      .join("\n");
    
    // 复制到剪贴板
    navigator.clipboard
      .writeText(codeText)
      .then(() => {
      const originalIcon = button.innerHTML;
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
        button.classList.add("copied");
        
        // 显示成功提示 - 使用全局toast
        if (window.$toast) {
          window.$toast.success("代码已复制到剪贴板", {
            title: "复制成功"
          });
        } else {
          // 使用备用方法
          showSimpleToast("代码已复制到剪贴板", "success");
        }
      
      setTimeout(() => {
        button.innerHTML = originalIcon;
          button.classList.remove("copied");
      }, 2000);
      })
      .catch((err) => {
        console.error("复制失败:", err);
        if (window.$toast) {
          window.$toast.error("复制失败，请手动复制", {
            title: "复制失败"
          });
        } else {
          showSimpleToast("复制失败，请手动复制", "error");
        }
    });
  };
  
  // 添加保存图片的全局函数
  window.saveImage = (url, filename) => {
    try {
      // 从URL中提取文件名
      const extractFilename = (url) => {
        let urlObj;
        try {
          urlObj = new URL(url);
          const pathname = urlObj.pathname;
          const parts = pathname.split('/');
          let name = parts[parts.length - 1];
          
          // 移除查询参数
          if (name.includes('?')) {
            name = name.split('?')[0];
          }
          
          // 确保有扩展名
          if (!name.includes('.')) {
            name += '.jpg'; // 默认扩展名
          }
          
          return name || (filename ? `${filename}.jpg` : 'image.jpg');
        } catch (e) {
          console.error('URL解析错误:', e);
          return filename ? `${filename}.jpg` : 'image.jpg';
        }
      };
      
      const imgFilename = extractFilename(url);
      console.log('保存图片:', { url, filename: imgFilename });
      
      // 创建链接元素
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          // 创建临时URL
          const blobUrl = URL.createObjectURL(blob);
          
          // 创建下载链接
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = imgFilename;
          document.body.appendChild(link);
          
          // 触发下载
          link.click();
          
          // 清理
          setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
          }, 100);
          
          // 显示成功提示
          if (window.$toast) {
            window.$toast.success(`图片 "${imgFilename}" 已保存`, {
              title: "保存成功",
              duration: 3000
            });
          } else {
            // 使用备用方式
            showSimpleToast(`图片 "${imgFilename}" 已保存`, "success");
          }
        })
        .catch(error => {
          console.error('保存图片失败:', error);
          if (window.$toast) {
            window.$toast.error("图片保存失败，请稍后重试", {
              title: "保存失败",
              duration: 3000
            });
          } else {
            showSimpleToast("图片保存失败，请稍后重试", "error");
          }
        });
    } catch (error) {
      console.error('保存图片出错:', error);
      showSimpleToast("图片保存出错，请稍后重试", "error");
    }
  };
  
  // 生成文章大纲
  generateTableOfContents();
  
  // 监听滚动事件，更新阅读进度
  window.addEventListener('scroll', updateProgress);
  
  // 初始更新一次进度
  updateProgress();
});

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress);
});

// 备用提示函数 - 简单的提示
const showSimpleToast = (message, type = 'info') => {
  try {
    // 尝试使用全局toast服务
    const instance = getCurrentInstance();
    if (instance && instance.appContext && instance.appContext.config.globalProperties.$toast) {
      instance.appContext.config.globalProperties.$toast[type](message, {
        title: type === 'success' ? '成功' : 
               type === 'error' ? '错误' : 
               type === 'warning' ? '警告' : '提示'
      });
      return;
    }
  } catch (err) {
    console.error("无法使用全局toast服务，降级使用内联toast:", err);
  }
  
  // 备用方案 - 创建一个简单的提示元素
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 16px';
  toast.style.background = type === 'success' ? '#f0f9eb' : 
                         type === 'error' ? '#fef0f0' : 
                         type === 'warning' ? '#fdf6ec' : '#f4f4f5';
  toast.style.color = '#606266';
  toast.style.borderLeft = type === 'success' ? '4px solid #67c23a' : 
                         type === 'error' ? '4px solid #f56c6c' : 
                         type === 'warning' ? '4px solid #e6a23c' : '4px solid #909399';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
  toast.style.zIndex = '9999';
  toast.style.transition = 'all 0.3s';
  toast.innerText = message;
  
  document.body.appendChild(toast);
  
  // 3秒后移除
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

// 导出为PDF
const exportToPDF = () => {
  if (!article.value) return;

  // 创建一个临时容器用于生成PDF
  const element = document.createElement("div");
  element.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="text-align: center; margin-bottom: 20px;">${article.value.title
      }</h1>
      <div style="color: #666; text-align: center; margin-bottom: 10px;">
        作者: ${article.value.author || "Kiri"} | 
        发布时间: ${formatDateTime(article.value.createdAt)}
      </div>
      <div style="margin: 20px 0; padding: 10px; background-color: #f5f5f5; border-left: 4px solid #ccc;">
        ${article.value.summary}
      </div>
      <div>${renderedContent.value}</div>
    </div>
  `;

  document.body.appendChild(element);

  // 配置PDF选项
  const options = {
    margin: [15, 15, 15, 15],
    filename: `${article.value.title.replace(/\s+/g, "_")}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: false, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // 生成PDF
  html2pdf()
    .from(element)
    .set(options)
    .save()
    .then(() => {
      document.body.removeChild(element);
      // 显示成功提示
      try {
        const instance = getCurrentInstance();
        if (instance && instance.appContext && instance.appContext.config.globalProperties.$toast) {
          instance.appContext.config.globalProperties.$toast.success("PDF已成功导出", {
            title: "导出成功"
          });
        } else {
          // 备用提示方式
          showSimpleToast("PDF已成功导出", "success");
        }
      } catch (err) {
        console.error("无法显示Toast提示:", err);
        showSimpleToast("PDF已成功导出", "success");
      }
    });
};

// 导出为Markdown
const exportToMarkdown = () => {
  if (!article.value) return;

  // 构建Markdown内容
  let markdownContent = `# ${article.value.title}\n\n`;
  markdownContent += `> 作者: ${article.value.author || "Kiri"
  } | 发布时间: ${formatDateTime(article.value.createdAt)}\n\n`;
  markdownContent += `**摘要:** ${article.value.summary}\n\n`;

  // 添加分类和标签
  markdownContent += `**分类:** ${article.value.category}\n\n`;
  if (article.value.tags && article.value.tags.length > 0) {
    markdownContent += `**标签:** ${article.value.tags
      .map((tag) => `#${tag}`)
      .join(" ")}\n\n`;
  }

  // 添加正文内容
  markdownContent += `---\n\n${article.value.content}\n\n`;

  // 使用Blob和FileSaver导出为.md文件
  const blob = new Blob([markdownContent], {
    type: "text/markdown;charset=utf-8",
  });
  saveAs(blob, `${article.value.title.replace(/\s+/g, "_")}.md`);
  
  // 显示成功提示
  try {
    const instance = getCurrentInstance();
    if (instance && instance.appContext && instance.appContext.config.globalProperties.$toast) {
      instance.appContext.config.globalProperties.$toast.success("Markdown已成功导出", {
        title: "导出成功"
      });
    } else {
      // 备用提示方式
      showSimpleToast("Markdown已成功导出", "success");
    }
  } catch (err) {
    console.error("无法显示Toast提示:", err);
    showSimpleToast("Markdown已成功导出", "success");
  }
};

// 监听文章ID变化，滚动到顶部
watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // 重新生成目录
  generateTableOfContents();
});

// 添加一个表格回退渲染函数
const renderFallbackTable = (markdown) => {
  const rows = markdown.split(/[\r\n]+/).filter(row => row.trim() !== '');
  
  if (rows.length < 3) return markdown; // 需要至少有表头、分隔符和一行数据
  
  // 处理表头行
  const headerRow = rows[0];
  const headers = headerRow
    .split('|')
    .filter((cell, index, array) => index > 0 && index < array.length - 1) // 去除首尾空单元格
    .map(cell => cell.trim());
  
  // 处理分隔行，确定列对齐方式
  const alignmentRow = rows[1];
  const alignments = alignmentRow
    .split('|')
    .filter((cell, index, array) => index > 0 && index < array.length - 1)
    .map(cell => {
      const trimmed = cell.trim();
      if (!trimmed || trimmed.length === 0) return 'left';
      
      if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
      if (trimmed.endsWith(':')) return 'right';
      return 'left';
    });
  
  // 处理数据行
  const dataRows = rows.slice(2);
  
  // 构建表格HTML
  let tableHTML = '<div class="markdown-table-container"><table class="markdown-table">';
  
  // 添加表头
  tableHTML += '<thead><tr>';
  headers.forEach((header, index) => {
    const align = alignments[index] || 'left';
    tableHTML += `<th style="text-align:${align}">${header}</th>`;
  });
  tableHTML += '</tr></thead>';
  
  // 添加表格内容
  tableHTML += '<tbody>';
  dataRows.forEach(row => {
    tableHTML += '<tr>';
    const cells = row
      .split('|')
      .filter((cell, index, array) => index > 0 && index < array.length - 1)
      .map(cell => cell.trim());
    
    cells.forEach((cell, index) => {
      const align = alignments[index] || 'left';
      tableHTML += `<td style="text-align:${align}">${cell}</td>`;
    });
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table></div>';
  return tableHTML;
};
</script>

<style>
/* GitHub-like Markdown Styles */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif;
  font-size: var(--fs-16);
  line-height: 1.6;
  color: var(--dark);
  word-wrap: break-word;
}

.markdown-body img {
  max-width: 100%;
  box-sizing: border-box;
  background-color: var(--light-white);
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: var(--fw-600);
  line-height: 1.25;
}

.markdown-body h1 {
  font-size: 2em;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.3em;
}

.markdown-body h2 {
  font-size: 1.5em;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.3em;
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body h4 {
  font-size: 1em;
}

.markdown-body blockquote {
  padding: 0.5em 1em;
  color: var(--dark);
  border-left: 0.3em solid var(--blue-crayola);
  margin: 0 0 16px 0;
  background-color: var(--white_a8);
  border-radius: 0 var(--radius-4) var(--radius-4) 0;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: var(--light);
  border-radius: var(--radius-6);
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-body pre {
  word-wrap: normal;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: var(--cultured);
  border-radius: var(--radius-6);
  margin-bottom: 16px;
}

.markdown-body pre code {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  word-break: normal;
  white-space: pre;
}

.markdown-body a {
  color: var(--blue-crayola);
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body blockquote.highlighted-quote,
.markdown-body .highlighted-quote {
  padding: 0.75em 1em;
  color: var(--dark);
  border-left: 0.35em solid var(--blue-crayola);
  margin: 0 0 16px 0;
  background-color: var(--cultured);
  border-radius: 0 var(--radius-6) var(--radius-6) 0;
  font-style: italic;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .markdown-body blockquote.highlighted-quote,
  .markdown-body .highlighted-quote {
    color: var(--light-white);
    background-color: var(--dark);
    border-left-color: var(--blue-crayola);
  }
}
</style>

<style scoped>
.article-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0 20px;
}

.article-content {
  padding: 0;
  position: relative;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
}

.article-header {
  text-align: center;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.3;
  color: var(--text-color);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.meta-icon {
  margin-right: 5px;
}

.meta-text {
  color: var(--text-color-light);
}

.category-link {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s;
}

.category-link:hover {
  color: var(--link-hover);
}

.article-summary {
  margin: 20px 0;
  padding: 0.75em 1em;
  background-color: #f8f9fa;
  border-left: 0.35em solid #3498db;
  border-radius: 0 4px 4px 0;
  line-height: 1.6;
  color: #333;
  font-style: italic;
}

/* 暗色模式下的简介样式 */
@media (prefers-color-scheme: dark) {
  .article-summary {
    color: #e0e0e0;
    background-color: #1a2939;
    border-left-color: #3498db;
  }
}

.ai-summary {
  margin: 30px 0 40px 0;
  border-radius: 12px;
  padding: 25px;
  background-color: rgba(230, 217, 255, 0.4); /* 默认浅紫色背景 */
}

.ai-summary.expanded {
  background-color: rgba(230, 217, 255, 0.7); /* 扩展时略深一点的紫色 */
}

.summary-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.summary-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.summary-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.summary-powered {
  margin-left: auto;
  font-size: 0.8rem;
  color: #999;
}

.summary-content {
  line-height: 1.7;
  color: #444;
  margin-bottom: 15px;
}

.summary-content p {
  margin-bottom: 8px;
}

.summary-full-content {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

.show-more-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #6d41d1; /* 紫色按钮 */
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0;
}

.arrow-icon {
  font-size: 0.6rem;
  margin-right: 4px;
  transition: transform 0.3s ease;
}

.arrow-icon.up {
  transform: rotate(180deg);
}

.article-sidebar {
  position: sticky;
  top: 90px;
  float: left;
  margin-right: 20px;
  margin-left: -100px;
  width: 80px;
}

.sidebar-sections {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-section {
  text-align: center;
  padding: 8px 0;
}

.sidebar-section h3 {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  margin: 0;
}

.code-block-wrapper {
  margin: 24px 0;
  border-radius: 0;
  overflow: hidden;
  background-color: #fff;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  border: 1px solid #ddd;
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
}

.code-type-label {
  background-color: #f0f0f0;
  color: #333;
  padding: 2px 8px;
  border-radius: 0;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #ddd;
}

.code-type-arrow {
  margin-left: 6px;
  font-size: 12px;
  color: #666;
}

.copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  transition: background-color 0.2s;
  border: 1px solid #ddd;
}

.copy-button:hover {
  background-color: #f0f0f0;
}

.copy-button.copied {
  background-color: rgba(40, 167, 69, 0.1);
}

.code-main-container {
  display: flex;
  position: relative;
  border-bottom: 1px solid #ddd;
}

.line-numbers-area {
  position: relative;
  width: 50px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
}

.line-numbers-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 11px;
  color: #666;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.line-number-arrow {
  margin: 0 4px;
}

.line-numbers-text {
  white-space: nowrap;
}

.code-content {
  flex: 1;
  overflow-x: auto;
  max-height: 300px;
  overflow-y: auto;
}

.code-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.5;
}

.line-number {
  width: 50px;
  text-align: right;
  padding: 0 8px;
  color: #999;
  user-select: none;
  border-right: 1px solid #ddd;
}

.line-content {
  padding: 0 12px;
  white-space: pre;
}

.line-content .hljs {
  background: transparent;
  padding: 0;
}

/* JSON 代码语法高亮特定颜色 */
.language-json .hljs-attr {
  color: #24292e;
}

.language-json .hljs-string {
  color: #032f62;
}

.language-json .hljs-number {
  color: #005cc5;
}

.language-json .hljs-literal {
  color: #005cc5;
}

.code-footer {
  padding: 8px 0;
  text-align: center;
  background-color: #f9f9f9;
}

.show-all-code {
  font-size: 12px;
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.show-all-code:hover {
  text-decoration: none;
  color: #333;
}

.show-all-code span {
  font-weight: 600;
}

.inline-code {
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tags-label {
  font-size: 0.9rem;
  color: var(--text-color-light);
  margin-right: 5px;
}

.article-tag {
  display: inline-block;
  padding: 3px 10px;
  background-color: rgba(var(--link-color-rgb), 0.1);
  color: var(--link-color);
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
}

.article-tag:hover {
  background-color: rgba(var(--link-color-rgb), 0.2);
  transform: translateY(-1px);
}

.article-views {
  display: flex;
  align-items: center;
  color: var(--text-color-light);
  font-size: 0.9rem;
}

.views-icon {
  margin-right: 5px;
}

.views-count {
  font-weight: 500;
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 30px 0;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.prev-article,
.next-article {
  display: flex;
  flex-direction: column;
}

.prev-article span,
.next-article span {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.prev-article a,
.next-article a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.prev-article a:hover,
.next-article a:hover {
  color: #3273dc;
}

.related-articles h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  padding-bottom: 0;
  border-bottom: none;
  color: var(--text-color);
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.related-item {
  background-color: rgba(0, 0, 0, 0.02);
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.related-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.related-item a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.related-item a:hover {
  color: #3273dc;
}

.related-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.85rem;
  color: #666;
}

.comments-section {
  display: none; /* 隐藏评论部分 */
}

.next-article {
  margin-left: auto;
  text-align: right;
}

.article-not-found {
  text-align: center;
  padding: 50px 0;
}

.article-not-found h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .article-content {
    padding: 20px;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    justify-content: flex-start;
  }

  .meta-item::after {
    display: none;
  }

  .article-sidebar {
    display: none;
  }
}

/* 代码高亮样式 */
:deep(.hljs-keyword),
:deep(.hljs-reserved),
:deep(.hljs-type) {
  color: #d73a49; /* 红色 - 如 export, default, const, async, function */
}

:deep(.hljs-string) {
  color: #22863a; /* 绿色 - 字符串 */
}

:deep(.hljs-built_in),
:deep(.hljs-tag),
:deep(.hljs-tag .hljs-name) {
  color: #0366d6; /* 蓝色 - 标签名和内置函数如 map */
}

:deep(.hljs-attr),
:deep(.hljs-property),
:deep(.hljs-variable) {
  color: #6f42c1; /* 紫色 - 属性名如 key, id */
}

:deep(.hljs-title),
:deep(.hljs-title.function_) {
  color: #6f42c1; /* 紫色 - 函数名 */
}

:deep(.hljs-params) {
  color: #24292e; /* 黑色 - 参数 */
}

:deep(.hljs-operator) {
  color: #d73a49; /* 红色 - 操作符 */
}

/* 修改返回按钮样式 */
.back-to-blog {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  background-color: transparent;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-button:hover {
  color: var(--link-color);
  transform: translateX(-3px);
}

.back-button svg {
  margin-right: 8px;
  transition: transform 0.2s ease;
}

.back-button:hover svg {
  transform: translateX(-3px);
}

/* 导出按钮样式 */
.export-buttons {
  display: flex;
  gap: 10px;
}

.export-button {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f8f9fa;
  color: #495057;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-button:hover {
  background-color: #e9ecef;
  border-color: #ced4da;
  color: #212529;
}

.export-button svg {
  margin-right: 6px;
}

@media (max-width: 768px) {
  .back-to-blog {
  flex-direction: column;
    align-items: flex-start;
  gap: 15px;
}

  .export-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .back-button {
    padding: 6px 0;
    font-size: 0.9rem;
  }

  .back-button svg {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
}

/* 文章标题下方作者和阅读时长样式 */
.article-details {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px auto 15px;
  font-size: 14px;
  color: #6c757d;
}

.detail-separator,
.meta-separator {
  color: #adb5bd;
  margin: 0 6px;
}

.meta-author {
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-icon,
.time-icon {
  display: flex;
  align-items: center;
}

.author-name {
  font-weight: 500;
}

.article-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-tag-small {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: #e9ecef;
  color: #495057;
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.article-tag-small:hover {
  background-color: #dee2e6;
  color: #212529;
  text-decoration: none;
}

/* 文章内容样式优化 */
.article-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 30px;
  overflow: hidden;
}

.article-title {
  font-size: 2rem;
  margin-bottom: 12px;
  color: #212529;
  text-align: center;
}

.article-meta {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  color: #6c757d;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.meta-icon {
  display: flex;
  align-items: center;
}

.meta-text,
.category-link {
  font-size: 14px;
}

.article-summary {
  margin-top: 15px;
  margin-bottom: 20px;
  color: #495057;
  font-size: 16px;
  line-height: 1.6;
}

/* 确保在移动设备上正确换行 */
@media (max-width: 640px) {
  .article-meta {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .article-content {
    padding: 20px;
  }

  .article-title {
    font-size: 1.7rem;
  }
}

/* 图片容器与保存按钮 */
.article-image-wrapper {
  position: relative;
  display: block;
  margin: 24px auto;
  max-width: 100%;
  text-align: center;
}

.article-image {
  max-width: 100%;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-image:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.image-caption {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--text-color-light);
  text-align: center;
}

.save-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  z-index: 2;
}

.article-image-wrapper:hover .save-image-btn {
  opacity: 1;
}

.save-image-btn:hover {
  background-color: rgba(52, 152, 219, 0.8);
}

.dark-mode .article-image {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .save-image-btn {
  background-color: rgba(0, 0, 0, 0.8);
}

.dark-mode .save-image-btn:hover {
  background-color: rgba(52, 152, 219, 0.9);
}

.dark-mode .image-caption {
  color: var(--text-color-light);
}

/* 文章布局 */
.article-container {
  display: flex;
  gap: 40px;
  position: relative;
}

.article-main {
  flex: 1;
  min-width: 0; /* 防止溢出 */
}

/* 阅读进度条 */
.article-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.article-progress-bar {
  height: 100%;
  width: 0;
  background-color: var(--primary-color, #3498db);
  transition: width 0.2s ease;
}

/* 文章大纲样式 */
.article-toc {
  width: 250px;
  position: fixed;
  right: 40px;
  top: 80px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 15px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.toc-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 10px;
  padding-left: 0;
}

.toc-list li a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  display: block;
  transition: color 0.2s;
  padding: 3px 0;
}

.toc-list li a:hover {
  color: var(--primary-color, #2196f3);
}

.toc-list li.active a {
  font-weight: bold;
  color: var(--primary-color, #2196f3);
}

.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: 15px;
}

.toc-level-4 {
  padding-left: 30px;
}

/* 响应式设计 */
@media (max-width: 1420px) {
  .article-toc.desktop-toc {
    right: 20px;
  }
}

@media (max-width: 1200px) {
  .article-toc.desktop-toc {
    right: 15px;
  }
}

@media (max-width: 991px) {
  .desktop-toc {
    display: none;
  }
  
  .article-content {
    margin-right: 0;
  }
}

/* 在大屏幕上隐藏移动端目录按钮及相关元素 */
@media (min-width: 992px) {
  .mobile-toc-button, 
  .mobile-toc-container {
    display: none;
  }
}

/* 移动端悬浮目录按钮 */
.mobile-toc-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: rgba(33, 150, 243, 0.75);
  color: #fff;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.mobile-toc-button:hover,
.mobile-toc-button:active {
  background-color: rgba(25, 118, 210, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

/* 修改目录按钮内的图标大小 */
.mobile-toc-button svg {
  width: 18px;
  height: 18px;
}

/* 移动端目录弹出层 */
.mobile-toc-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
}

.mobile-toc-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  animation: fadeIn 0.3s ease-in-out;
}

.mobile-toc {
  position: relative;
  z-index: 2;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.mobile-toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.mobile-toc-header .toc-title {
  margin: 0;
  font-size: 18px;
}

.close-toc-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.close-toc-btn:hover {
  color: #333;
}

/* 深色模式适配 */
.dark-mode .article-toc {
  background-color: #2a2a2a;
  border-color: #444;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dark-mode .article-toc .toc-title {
  color: #fff;
}

.dark-mode .toc-list li a {
  color: #ddd;
}

.dark-mode .toc-list li a:hover,
.dark-mode .toc-list li.active a {
  color: var(--primary-color, #2196f3);
}

.dark-mode .mobile-toc {
  background-color: #2a2a2a;
  color: #fff;
}

.dark-mode .mobile-toc-header {
  border-bottom-color: #444;
}

.dark-mode .close-toc-btn {
  color: #aaa;
}

.dark-mode .close-toc-btn:hover {
  color: #fff;
}
</style>
