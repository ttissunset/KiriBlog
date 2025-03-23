<template>
  <MainLayout>
    <div v-if="article" class="article-page">
      <div class="back-to-blog">
        <router-link to="/blog" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          <span>{{ $t('common.backToList') }}</span>
        </router-link>
      </div>
      
      <article class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <div class="meta-item">
              <span class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              <span class="meta-text">{{ formatDateTime(article.createdAt) }}</span>
            </div>
            <div class="meta-item category">
              <span class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </span>
              <router-link 
                :to="{ name: 'blog', query: { category: article.category } }"
                class="category-link"
              >
                {{ article.category }}
              </router-link>
            </div>
          </div>
        </header>

        <div class="article-summary">{{ article.summary }}</div>

        <div class="ai-summary" :class="{ expanded: isSummaryExpanded }">
          <div class="summary-header">
            <span class="summary-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            <span class="summary-title">{{ $t('article.aiSummary') }}</span>
            <span class="summary-powered">{{ $t('article.poweredBy') }}</span>
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
            <span v-if="!isSummaryExpanded"
              >开发 ≠ 搬运。不学习底层原理你永远不知道...</span
            >
            <button class="show-more-btn" @click="toggleSummary" style="margin-left: auto;">
              <span class="arrow-icon" :class="{ up: isSummaryExpanded }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
              {{ isSummaryExpanded ? $t('article.showLess') : $t('article.showMore') }}
            </button>
          </div>
        </div>

        <div class="markdown-body" v-html="renderedContent"></div>

        <div class="article-footer">
          <div class="article-tags">
            <span class="tags-label">{{ $t('common.tags') }}</span>
            <router-link 
              v-for="tag in article.tags" 
              :key="tag"
              :to="{ name: 'blog', query: { tag } }"
              class="article-tag"
            >
              #{{ tag }}
            </router-link>
          </div>
          
          <div class="article-views">
            <span class="views-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </span>
            <span class="views-count">{{ article.views }} {{ $t('common.viewCount') }}</span>
          </div>
        </div>
      </article>

      <div class="article-navigation">
        <div class="prev-article" v-if="prevArticle">
          <span>{{ $t('article.prevArticle') }}</span>
          <router-link :to="{ name: 'article', params: { id: prevArticle.id } }">
            {{ prevArticle.title }}
          </router-link>
        </div>
        <div class="next-article" v-if="nextArticle">
          <span>{{ $t('article.nextArticle') }}</span>
          <router-link :to="{ name: 'article', params: { id: nextArticle.id } }">
            {{ nextArticle.title }}
          </router-link>
        </div>
      </div>

      <div class="related-articles" v-if="relatedArticles.length > 0">
        <h3>{{ $t('article.relatedArticles') }}</h3>
        <div class="related-list">
          <div v-for="relatedArticle in relatedArticles" :key="relatedArticle.id" class="related-item">
            <router-link :to="{ name: 'article', params: { id: relatedArticle.id } }">
              {{ relatedArticle.title }}
            </router-link>
            <div class="related-meta">
              <span>{{ formatDateTime(relatedArticle.createdAt) }}</span>
              <span>{{ relatedArticle.views }} {{ $t('common.viewCount') }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-else class="article-not-found">
      <h1>{{ $t('article.notFound') }}</h1>
      <p>{{ $t('article.notFoundDesc') }}</p>
      <router-link to="/" class="back-link">{{ $t('article.backToHome') }}</router-link>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { format } from "date-fns";
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Header.vue";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import DOMPurify from 'dompurify';

// 自定义安全渲染Markdown的函数
const renderMarkdown = (markdown) => {
  if (!markdown || typeof markdown !== 'string') {
    return '<p>没有内容可显示</p>';
  }
  
  try {
    // 处理代码块 (必须先处理，避免内部内容被其他规则匹配)
    let html = markdown.replace(/```([a-z]*)\n([\s\S]+?)```/g, (match, language, code) => {
      const langClass = language ? `language-${language}` : '';
      const highlightedCode = language && hljs.getLanguage(language)
        ? hljs.highlight(code.trim(), { language }).value
        : hljs.highlightAuto(code.trim()).value;
        
      // 为代码添加行号
      const codeLines = highlightedCode.split('\n');
      let codeWithLineNumbers = '';
      
      // 生成带行号的代码，确保行号与代码在同一行
      codeLines.forEach((line, index) => {
        const lineNumber = index + 1;
        codeWithLineNumbers += `<tr><td class="line-number">${lineNumber}</td><td class="line-content"><span class="hljs ${langClass}">${line || ' '}</span></td></tr>`;
      });
      
      // 根据语言生成合适的文件名示例
      let filename = '';
      if (language === 'js' || language === 'javascript') {
        filename = 'example.js';
      } else if (language === 'ts' || language === 'typescript') {
        filename = 'app/users/page.tsx';
      } else if (language === 'html') {
        filename = 'index.html';
      } else if (language === 'css') {
        filename = 'styles.css';
      } else if (language === 'vue') {
        filename = 'Component.vue';
      } else {
        filename = language ? `file.${language}` : 'code';
      }
      
      return `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <div class="file-path">
              <svg class="file-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>${filename}</span>
            </div>
            <div class="copy-button" onclick="copyCode(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </div>
          </div>
          <div class="code-content">
            <table class="code-table">
              <tbody>${codeWithLineNumbers}</tbody>
            </table>
          </div>
        </div>
      `;
    });
    
    // 处理标题 (h1 - h6)
    html = html.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      const id = content.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level} id="${id}">${content}</h${level}>`;
    });
    
    // 处理粗体
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // 处理斜体
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // 处理链接 [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      return `<a href="${url}" target="_blank">${text}</a>`;
    });
    
    // 处理图片 ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      return `<img src="${url}" alt="${alt}" class="markdown-image">`;
    });
    
    // 处理行内代码
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // 处理分割线
    html = html.replace(/^---$/gm, '<hr class="markdown-hr">');
    
    // 处理引用块
    html = html.replace(/^>\s(.+)$/gm, '<blockquote>$1</blockquote>');
    
    // 处理无序列表 (先标记项目，后包装列表)
    const ulMatch = html.match(/^[\*\-]\s(.+)$/gm);
    if (ulMatch) {
      const items = ulMatch.map(item => `<li>${item.replace(/^[\*\-]\s/, '')}</li>`).join('');
      html = html.replace(/^[\*\-]\s(.+)$/gm, '<!-- list-item -->');
      html = html.replace(/<!-- list-item -->([\s\S]*?)(?=(^[^<])|$)/gm, '<ul>$1</ul>');
    }
    
    // 处理有序列表
    const olMatch = html.match(/^\d+\.\s(.+)$/gm);
    if (olMatch) {
      const items = olMatch.map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('');
      html = html.replace(/^\d+\.\s(.+)$/gm, '<!-- list-item -->');
      html = html.replace(/<!-- list-item -->([\s\S]*?)(?=(^[^<])|$)/gm, '<ol>$1</ol>');
    }
    
    // 处理段落 (对非标签开头的行添加段落标签)
    html = html.replace(/^(?!<[a-z]).+$/gm, '<p>$&</p>');
    
    // 替换换行符为实际的换行
    html = html.replace(/\n/g, '');
    
    // 使用DOMPurify清理HTML，防止XSS攻击
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.error('Markdown渲染错误:', error);
    return '<p>内容渲染出错，请刷新页面重试。</p>';
  }
};

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();

// AI Summary 展开/收起状态控制
const isSummaryExpanded = ref(false);

// 切换摘要展开/收起状态
const toggleSummary = () => {
  isSummaryExpanded.value = !isSummaryExpanded.value;
};

// 从路由参数获取文章ID
const articleId = computed(() => Number(route.params.id));

// 根据ID获取文章详情
const article = computed(() => blogStore.getArticleById(articleId.value));

// 获取与当前文章相关的文章列表
const relatedArticles = computed(() =>
  article.value ? blogStore.getRelatedArticles(articleId.value) : []
);

// 使用自定义函数处理Markdown内容为HTML
const renderedContent = computed(() => {
  if (!article.value || !article.value.content) return "";
  return renderMarkdown(article.value.content);
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
  const wordsPerMinute = 300; // 假设平均阅读速度为每分钟300个单词
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// 在组件挂载时添加复制代码功能
onMounted(() => {
  if (article.value) {
    blogStore.incrementArticleViews(articleId.value);
  }
  
  // 添加复制代码的全局函数
  window.copyCode = (button) => {
    // 找到代码内容
    const codeWrapper = button.closest('.code-block-wrapper');
    const lineContents = codeWrapper.querySelectorAll('.line-content');
    
    // 从各行内容中提取纯文本
    const codeText = Array.from(lineContents)
      .map(line => line.textContent)
      .join('\n');
    
    // 复制到剪贴板
    navigator.clipboard.writeText(codeText).then(() => {
      const originalIcon = button.innerHTML;
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerHTML = originalIcon;
        button.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制');
    });
  };
});
</script>

<style>
/* GitHub-like Markdown Styles */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #24292e;
  word-wrap: break-word;
}

.markdown-body img {
  max-width: 100%;
  box-sizing: border-box;
  background-color: #fff;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-body h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body h4 {
  font-size: 1em;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}

.markdown-body pre {
  word-wrap: normal;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
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
  color: #0366d6;
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
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
  padding: 30px 20px;
}

.article-content {
  padding: 0;
  position: relative;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
}

.article-header {
  margin-bottom: 40px;
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
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
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.85;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--border-color);
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
  margin: 1.5em 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.file-path {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #444;
}

.file-icon {
  margin-right: 6px;
  color: #666;
}

.copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.copy-button:hover {
  opacity: 1;
}

.copy-button.copied {
  color: #28a745;
}

.code-content {
  position: relative;
  overflow-x: auto;
  background-color: #ffffff;
}

.code-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font-size: 13px;
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
}

.code-table tr {
  line-height: 1.3;
}

.line-number {
  user-select: none;
  text-align: right;
  color: #aaa;
  padding: 1px 8px;
  width: 1%;
  min-width: 40px;
  border-right: 1px solid #eee;
  white-space: nowrap;
}

.line-content {
  padding: 1px 8px;
  white-space: pre;
  width: 99%;
}

.inline-code {
  background-color: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.85em;
  color: #e83e8c;
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
  margin: 40px 0;
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

.related-articles {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
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
  margin-bottom: 20px;
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

@media (max-width: 768px) {
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
</style>
