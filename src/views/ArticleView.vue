<template>
  <MainLayout>
    <div v-if="article" class="article-page">
      <article class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="meta-item author">
              <router-link :to="'/'" class="author-link">{{ article.author || 'grtsiny43' }}</router-link>
            </span>
            <span class="meta-item date">
              {{ formatDate(article.createdAt) }}
              <span class="update-date" v-if="article.updatedAt">(更新于 {{ formatUpdatedDate(article.updatedAt) }})</span>
            </span>
            <span class="meta-item views">
              {{ article.views }} views
            </span>
            <span class="meta-item reading-time">
              预计阅读时长 {{ calculateReadingTime(article.content) }} 分钟
            </span>
          </div>
        </header>

        <div class="ai-summary">
          <div class="summary-header">
            <span class="summary-icon">✨</span>
            <span class="summary-title">AI Summary</span>
            <span class="summary-powered">Powered By DeepSeek-中文</span>
          </div>
          <div class="summary-content">
            <p>时光如镜映代码，云舟载梦启航程。</p>
            <p>星火轻盈燃运维，容器万千纳轻舟。</p>
          </div>
          <div class="summary-more">
            <span>开发 ≠ 搬运。不学习底层原理你永远不知道...</span>
            <button class="show-more-btn">
              <span class="arrow-icon">▼</span>
              Show More
            </button>
          </div>
        </div>

        <div class="article-sidebar">
          <div class="sidebar-sections">
            <div class="sidebar-section">
              <h3>0 %</h3>
            </div>
            <div class="sidebar-section">
              <h3>部署教程 (快速简单)</h3>
            </div>
            <div class="sidebar-section">
              <h3>完整步骤</h3>
            </div>
          </div>
        </div>

        <div class="markdown-content" v-html="renderedContent"></div>

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
          <router-link :to="{ name: 'article', params: { id: prevArticle.id } }">
            {{ prevArticle.title }}
          </router-link>
        </div>
        <div v-if="nextArticle" class="next-article">
          <span>下一篇</span>
          <router-link :to="{ name: 'article', params: { id: nextArticle.id } }">
            {{ nextArticle.title }}
          </router-link>
        </div>
      </div>

      <div class="related-articles">
        <h3>相关文章</h3>
        <div class="related-list">
          <div v-for="relatedArticle in relatedArticles" :key="relatedArticle.id" class="related-item">
            <router-link :to="{ name: 'article', params: { id: relatedArticle.id } }">
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
          <div v-for="comment in article.comments" :key="comment.id" class="comment-item">
            <div class="comment-meta">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
        <div v-else class="no-comments">
          暂无评论
        </div>

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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useBlogStore } from '../stores/blogStore'
import MainLayout from '../layouts/Header.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 获取文章ID
const articleId = computed(() => Number(route.params.id))

// 获取文章详情
const article = computed(() => blogStore.getArticleById(articleId.value))

// 相关文章
const relatedArticles = computed(() => 
  article.value 
    ? blogStore.getRelatedArticles(articleId.value)
    : []
)

// Markdown渲染
const renderedContent = computed(() => {
  if (!article.value) return ''
  
  // 处理代码块，使用更美观的代码高亮样式
  let content = article.value.content
    .replace(/```([a-z]*)\n([\s\S]*?)\n```/gm, (match, language, code) => {
      return `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-language">${language || 'code'}</span>
          <button class="copy-button">复制</button>
        </div>
        <pre class="code-block"><code class="language-${language}">${escapeHtml(code)}</code></pre>
      </div>`
    })
    // 处理行内代码
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // 处理标题
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
    // 处理粗体和斜体
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // 处理链接和图片
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img alt="$1" src="$2" class="article-image">')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="article-link">$1</a>')
    // 处理段落
    .replace(/\n\n/g, '</p><p>')
  
  // 确保内容被包裹在段落中
  if (!content.startsWith('<h1>') && !content.startsWith('<h2>') && 
      !content.startsWith('<h3>') && !content.startsWith('<p>')) {
    content = '<p>' + content
  }
  if (!content.endsWith('</p>')) {
    content = content + '</p>'
  }
  
  return content
})

// 转义HTML特殊字符
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 上一篇和下一篇文章
const prevArticle = computed(() => {
  if (!article.value) return null
  const allArticles = blogStore.articles
  const currentIndex = allArticles.findIndex(a => a.id === articleId.value)
  return currentIndex > 0 ? allArticles[currentIndex - 1] : null
})

const nextArticle = computed(() => {
  if (!article.value) return null
  const allArticles = blogStore.articles
  const currentIndex = allArticles.findIndex(a => a.id === articleId.value)
  return currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
})

// 评论表单
const newComment = ref({
  author: '',
  content: ''
})

// 提交评论
const submitComment = () => {
  if (!newComment.value.content.trim()) return
  
  blogStore.addComment(
    articleId.value,
    newComment.value.author.trim(),
    newComment.value.content.trim()
  )
  
  // 重置表单
  newComment.value = {
    author: '',
    content: ''
  }
  
  alert('评论已提交，等待管理员审核')
}

// 格式化日期
const formatDate = (dateString) => {
  return format(new Date(dateString), 'MM/dd/yyyy')
}

// 格式化更新日期
const formatUpdatedDate = (dateString) => {
  return format(new Date(dateString), 'MM/dd/yyyy')
}

// 计算阅读时间
const calculateReadingTime = (content) => {
  const wordsPerMinute = 300;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// 增加文章阅读量
onMounted(() => {
  if (article.value) {
    blogStore.incrementArticleViews(articleId.value)
  }
})
</script>

<style scoped>
.article-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.article-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 40px;
  position: relative;
}

.article-header {
  margin-bottom: 30px;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.3;
  color: #333;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 25px;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-item::after {
  content: '·';
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
  background-color: #f7f7f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
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
  color: #3273dc;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0;
}

.arrow-icon {
  font-size: 0.6rem;
  margin-right: 4px;
}

.markdown-content {
  line-height: 1.8;
  color: #333;
  font-size: 1.05rem;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.8em;
  margin-bottom: 1em;
  font-weight: 600;
}

.markdown-content h2 {
  font-size: 1.6rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.markdown-content h3 {
  font-size: 1.4rem;
}

.markdown-content p {
  margin-bottom: 1.5em;
}

/* 代码块样式 */
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
  font-weight: 600;
  color: #555;
}

.copy-button {
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #3273dc;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
}

.copy-button:hover {
  background-color: rgba(50, 115, 220, 0.1);
}

.code-block {
  margin: 0;
  padding: 15px;
  overflow-x: auto;
  background-color: #f8f8f8;
  line-height: 1.5;
}

code.language-javascript, 
code.language-js {
  color: #333;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
  tab-size: 2;
}

.inline-code {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
  color: #e83e8c;
}

/* 文章图片样式 */
.article-image {
  max-width: 100%;
  height: auto;
  margin: 1.5em 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 文章链接样式 */
.article-link {
  color: #3273dc;
  text-decoration: none;
  border-bottom: 1px solid rgba(50, 115, 220, 0.2);
  transition: border-color 0.2s;
}

.article-link:hover {
  border-color: rgba(50, 115, 220, 0.8);
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
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
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
}

.related-articles h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.related-item {
  background-color: #f9f9f9;
  padding: 12px 15px;
  border-radius: 5px;
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
  margin-top: 50px;
}

.comments-section h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.comment-item {
  background-color: #f9f9f9;
  padding: 15px;
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
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.comment-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.comment-form h4 {
  margin-bottom: 15px;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.submit-btn {
  background-color: #3273dc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #2366d1;
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
  }
  
  .meta-item::after {
    display: none;
  }
  
  .article-sidebar {
    display: none;
  }
}
</style> 