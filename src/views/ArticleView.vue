<template>
  <MainLayout>
    <div v-if="article" class="article-page">
      <article class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="meta-item author">
              <svg
                class="meta-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <router-link :to="'/'" class="author-link">{{
                article.author || "grtsiny43"
              }}</router-link>
            </span>
            <span class="meta-item date">
              <svg
                class="meta-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ formatDate(article.createdAt) }}
              <span class="update-date" v-if="article.updatedAt"
                >(更新于 {{ formatUpdatedDate(article.updatedAt) }})</span
              >
            </span>
            <span class="meta-item views">
              <svg
                class="meta-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {{ article.views }} views
            </span>
            <span class="meta-item reading-time">
              <svg
                class="meta-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              预计阅读时长 {{ calculateReadingTime(article.content) }} 分钟
            </span>
          </div>
        </header>

        <div class="ai-summary" :class="{ expanded: isSummaryExpanded }">
          <div class="summary-header">
            <span class="summary-icon">✨</span>
            <span class="summary-title">AI Summary</span>
            <span class="summary-powered">Powered By DeepSeek-中文</span>
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
              <span class="arrow-icon" :class="{ up: isSummaryExpanded }">{{
                isSummaryExpanded ? "▲" : "▼"
              }}</span>
              {{ isSummaryExpanded ? "Show Less" : "Show More" }}
            </button>
          </div>
        </div>

        <div class="markdown-body" v-html="renderedContent"></div>

        <div class="article-footer">
          <div class="article-tags">
            <router-link
              v-for="tag in article.tags"
              :key="tag"
              :to="{ name: 'blog', query: { tag } }"
              class="tag"
            >
              {{ tag }}
            </router-link>
          </div>

          <div class="article-actions">
            <button class="like-button">
              <span class="like-icon">♥</span>
              <span>{{ article.likes || 4 }}</span>
            </button>
            <button class="comment-button">
              <span class="comment-icon">💬</span>
              <span>{{ article.comments.length || 4 }}</span>
            </button>
            <button class="share-button">
              <span class="share-icon">🔗</span>
            </button>
          </div>
        </div>
      </article>

      <div class="article-navigation">
        <div v-if="prevArticle" class="prev-article">
          <span>上一篇</span>
          <router-link
            :to="{ name: 'article', params: { id: prevArticle.id } }"
          >
            {{ prevArticle.title }}
          </router-link>
        </div>
        <div v-if="nextArticle" class="next-article">
          <span>下一篇</span>
          <router-link
            :to="{ name: 'article', params: { id: nextArticle.id } }"
          >
            {{ nextArticle.title }}
          </router-link>
        </div>
      </div>

      <div class="related-articles">
        <h3>相关文章</h3>
        <div class="related-list">
          <div
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            class="related-item"
          >
            <router-link
              :to="{ name: 'article', params: { id: relatedArticle.id } }"
            >
              {{ relatedArticle.title }}
            </router-link>
            <div class="related-meta">
              <span>{{ formatDate(relatedArticle.createdAt) }}</span>
              <span>{{ relatedArticle.views }} 次阅读</span>
            </div>
          </div>
        </div>
      </div>

      <section class="comments-section">
        <h3>评论区 ({{ article.comments.length }})</h3>

        <div v-if="article.comments.length > 0" class="comments-list">
          <div
            v-for="comment in article.comments"
            :key="comment.id"
            class="comment-item"
          >
            <div class="comment-meta">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{
                formatDate(comment.createdAt)
              }}</span>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
        <div v-else class="no-comments">暂无评论</div>

        <div class="comment-form">
          <h4>发表评论</h4>
          <p class="comment-note">评论需要管理员审核后才会显示</p>
          <div class="form-group">
            <input
              type="text"
              v-model="newComment.author"
              placeholder="您的昵称 (可选)"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <textarea
              v-model="newComment.content"
              placeholder="评论内容"
              class="form-control"
              rows="4"
            ></textarea>
          </div>
          <button
            @click="submitComment"
            class="submit-btn"
            :disabled="!newComment.content.trim()"
          >
            提交评论
          </button>
        </div>
      </section>
    </div>
    <div v-else class="article-not-found">
      <h2>文章未找到</h2>
      <p>您访问的文章可能已被删除或移动到其他位置。</p>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { format } from "date-fns";
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Header.vue";
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 配置marked选项，设置代码高亮和其他Markdown渲染选项
marked.setOptions({
  highlight: function(code, lang) {
    // 如果指定了语言且highlight.js支持该语言，则使用该语言进行高亮，否则使用纯文本
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // 添加到代码块class的前缀
  gfm: true,                    // 启用GitHub风格的Markdown
  breaks: true,                 // 将换行符转换为<br>
  renderer: {
    code(code, language) {
      language = language || 'plaintext';
      const languageDisplay = language.charAt(0).toUpperCase() + language.slice(1);
      
      return `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-language">${languageDisplay}</span>
            <button class="copy-button" onclick="copyCode(this)">复制</button>
          </div>
          <pre class="code-block"><code class="hljs language-${language}">${hljs.highlight(code, {language}).value}</code></pre>
        </div>
      `;
    }
  }
});

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

// 使用marked处理Markdown内容为HTML
const renderedContent = computed(() => {
  if (!article.value) return "";
  return marked(article.value.content);
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

// 评论表单数据
const newComment = ref({
  author: "",
  content: "",
});

// 提交评论到博客存储
const submitComment = () => {
  if (!newComment.value.content.trim()) return;

  blogStore.addComment(
    articleId.value,
    newComment.value.author.trim(),
    newComment.value.content.trim()
  );

  // 重置表单数据
  newComment.value = {
    author: "",
    content: "",
  };

  alert("评论已提交，等待管理员审核");
};

// 格式化日期为月/日/年格式
const formatDate = (dateString) => {
  return format(new Date(dateString), "MM/dd/yyyy");
};

// 格式化更新日期为月/日/年格式
const formatUpdatedDate = (dateString) => {
  return format(new Date(dateString), "MM/dd/yyyy");
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
    const pre = button.parentElement.nextElementSibling;
    const code = pre.querySelector('code').innerText;
    
    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.innerText;
      button.innerText = '已复制!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerText = originalText;
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
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 5px;
  color: #666;
}

.meta-item::after {
  content: "·";
  margin-left: 15px;
  color: #ccc;
}

.meta-item:last-child::after {
  display: none;
}

.author-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.author-link:hover {
  text-decoration: underline;
}

.update-date {
  margin-left: 5px;
  color: #999;
}

.ai-summary {
  margin: 30px 0 40px 0;
  border-radius: 12px;
  padding: 25px;
}

.ai-summary.expanded {
  background-color: #e6d9ff; /* 扩展时略深一点的紫色 */
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
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #e8e8e8;
  border-bottom: 1px solid #ddd;
}

.code-language {
  font-size: 0.85rem;
  font-weight: 500;
  color: #555;
  padding: 2px 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
}

.copy-button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
  padding: 2px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background-color: #f0f0f0;
  color: #333;
}

.copy-button.copied {
  background-color: #e6f7e6;
  color: #28a745;
  border-color: #28a745;
}

.code-block {
  margin: 0;
  padding: 15px;
  overflow-x: auto;
  background-color: #f8f8f8;
  line-height: 1.5;
}

.inline-code {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
  color: #e83e8c;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background-color: var(--button-bg);
  border-radius: 15px;
  font-size: 0.7rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.15s ease;
  border: 1px solid var(--border-color);
  font-weight: 500;
}

.tag:hover {
  background-color: var(--button-hover);
  transform: translateY(-1px);
}

.article-actions {
  display: flex;
  gap: 10px;
}

.like-button,
.comment-button,
.share-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: none;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.like-button:hover,
.comment-button:hover,
.share-button:hover {
  background-color: #f5f5f5;
  color: #333;
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
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.comments-section h3 {
  font-size: 1.4rem;
  margin-bottom: 25px;
  color: var(--text-color);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item {
  background-color: rgba(0, 0, 0, 0.02);
  padding: 20px;
  border-radius: 8px;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-author {
  font-weight: 500;
}

.comment-date {
  color: #666;
  font-size: 0.85rem;
}

.comment-content {
  line-height: 1.6;
}

.no-comments {
  background-color: rgba(0, 0, 0, 0.02);
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  color: #666;
}

.comment-form {
  margin-top: 30px;
  padding: 25px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
}

.comment-form h4 {
  margin-bottom: 15px;
  color: var(--text-color);
}

.comment-note {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  background-color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--link-color);
}

.submit-btn {
  background-color: var(--link-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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
</style>
