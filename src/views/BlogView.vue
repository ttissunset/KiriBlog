<template>
  <MainLayout>
    <div class="blog-page">
      <!-- 博客页面头部 -->
      <div class="blog-header">
        <div class="header-content">
          <div class="blog-header-decoration"></div>
          <div class="header-main">
            <h1 class="blog-title">探索世界</h1>
            <p class="blog-description">记录思考，分享知识，连接灵感的桥梁</p>
            
            <!-- 当前激活的筛选器 -->
            <div class="active-filters" v-if="activeCategory || activeTag">
              <span class="filter-label">筛选:</span>
              <div v-if="activeCategory" class="active-filter">
                <span class="filter-icon">📂</span>
                <span>{{ activeCategory }}</span>
                <button @click="clearFilters('category')" class="clear-filter" title="清除筛选">×</button>
              </div>
              <div v-if="activeTag" class="active-filter">
                <span class="filter-icon">#</span>
                <span>{{ activeTag }}</span>
                <button @click="clearFilters('tag')" class="clear-filter" title="清除筛选">×</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区 -->
      <div class="blog-container">
        <!-- 左侧：文章列表 -->
        <div class="articles-section">
          <!-- 时间线浏览模式 -->
          <template v-if="filteredArticles.length > 0 && !activeCategory && !activeTag">
            <div class="timeline-view">
              <div v-for="(yearData, year) in archivedArticles" :key="year" class="year-block">
                <div class="year-marker">
                  <span class="year-number">{{ year }}</span>
                </div>
                
                <div v-for="(monthData, month) in yearData" :key="`${year}-${month}`" class="month-block">
                  <div class="month-marker">{{ month }}月</div>
                  
                  <div class="article-cards">
                    <div v-for="article in monthData" :key="article.id" class="article-card">
                      <div class="card-date">{{ formatDate(article.createdAt, 'MM-dd') }}</div>
                      <router-link :to="{ name: 'article', params: { id: article.id } }" class="card-title">
                        {{ article.title }}
                      </router-link>
                      
                      <div class="card-meta">
                        <div class="meta-left">
                          <span class="meta-category" @click.stop="filterByCategory(article.category)">
                            {{ article.category }}
                          </span>
                        </div>
                        <div class="meta-right">
                          <span class="meta-views">
                            <span class="view-icon">👁️</span>
                            {{ article.views }}
                          </span>
                        </div>
                      </div>
                      
                      <p class="card-summary">{{ article.summary }}</p>

                      <div class="card-tags">
                        <span 
                          v-for="tag in article.tags" 
                          :key="tag" 
                          class="card-tag"
                          @click.stop="filterByTag(tag)"
                        >
                          #{{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          
          <!-- 筛选模式下的文章列表 -->
          <template v-else-if="filteredArticles.length > 0">
            <div class="filtered-view">
              <div class="filter-header">
                <h2 v-if="activeCategory">分类: {{ activeCategory }}</h2>
                <h2 v-else-if="activeTag">标签: {{ activeTag }}</h2>
              </div>
              
              <div class="article-grid">
                <div 
                  v-for="article in filteredArticles" 
                  :key="article.id" 
                  class="article-card"
                >
                  <div class="card-header">
                    <span class="card-date">{{ formatDate(article.createdAt, 'yyyy-MM-dd') }}</span>
                    <span 
                      class="card-category"
                      @click="filterByCategory(article.category)"
                    >
                      {{ article.category }}
                    </span>
                  </div>
                  
                  <router-link :to="{ name: 'article', params: { id: article.id } }" class="card-title">
                    {{ article.title }}
                  </router-link>
                  
                  <p class="card-summary">{{ article.summary }}</p>
                  
                  <div class="card-footer">
                    <div class="card-tags">
                      <span 
                        v-for="tag in article.tags" 
                        :key="tag" 
                        class="card-tag"
                        @click="filterByTag(tag)"
                      >
                        #{{ tag }}
                      </span>
                    </div>
                    
                    <div class="card-stats">
                      <span class="view-count">
                        <span class="view-icon">👁️</span>
                        {{ article.views }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          
          <!-- 无文章时显示 -->
          <div v-else class="no-articles">
            <div class="empty-state">
              <div class="empty-icon">📝</div>
              <h3>没有找到符合条件的文章</h3>
              <p>请尝试使用不同的筛选条件</p>
              <button @click="clearFilters()" class="clear-all-btn">清除所有筛选</button>
            </div>
          </div>
        </div>

        <!-- 右侧：侧边栏 -->
        <div class="blog-sidebar">
          <!-- 搜索框 -->
          <div class="sidebar-search">
            <input 
              type="text" 
              placeholder="搜索文章..." 
              v-model="searchQuery"
              @keyup.enter="performSearch"
            />
            <button class="search-btn" @click="performSearch">
              <span class="search-icon">🔍</span>
            </button>
          </div>
          
          <!-- 分类部分 -->
          <div class="sidebar-section">
            <h3 class="section-title">
              <span class="section-icon">📂</span>
              分类
            </h3>
            <div class="categories-list">
              <div 
                v-for="category in categories" 
                :key="category.id"
                class="category-item"
                :class="{ active: activeCategory === category.name }"
                @click="filterByCategory(category.name)"
              >
                <div class="category-name">{{ category.name }}</div>
                <div class="category-count">{{ category.count }}</div>
              </div>
            </div>
          </div>
          
          <!-- 热门文章部分 -->
          <div class="sidebar-section">
            <h3 class="section-title">
              <span class="section-icon">🔥</span>
              热门文章
            </h3>
            <div class="popular-posts">
              <div 
                v-for="article in popularArticles" 
                :key="article.id"
                class="popular-post"
              >
                <router-link :to="{ name: 'article', params: { id: article.id } }" class="post-title">
                  {{ article.title }}
                </router-link>
                <div class="post-meta">
                  <span class="post-views">{{ article.views }} 次阅读</span>
                  <span class="post-date">{{ formatDate(article.createdAt, 'MM-dd') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useBlogStore } from '../stores/blogStore'
import MainLayout from '../layouts/Header.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 获取所有博客数据
const { articles, categories, tags, archivedArticles } = blogStore

// 筛选条件
const activeCategory = ref('')
const activeTag = ref('')
const searchQuery = ref('')

// 初始化筛选条件（从URL参数）
onMounted(() => {
  if (route.query.category) {
    activeCategory.value = route.query.category
  }
  
  if (route.query.tag) {
    activeTag.value = route.query.tag
  }
  
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})

// 筛选文章
const filteredArticles = computed(() => {
  if (activeCategory.value) {
    return blogStore.getArticlesByCategory(activeCategory.value)
  }
  
  if (activeTag.value) {
    return blogStore.getArticlesByTag(activeTag.value)
  }
  
  if (searchQuery.value.trim()) {
    return blogStore.searchArticles(searchQuery.value.trim())
  }
  
  return articles
})

// 热门文章（按阅读次数排序）
const popularArticles = computed(() => {
  return [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
})

// 执行搜索
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // 清空其他筛选条件
    activeCategory.value = ''
    activeTag.value = ''
    // 更新URL查询参数
    updateRouteQuery()
    console.log('执行搜索:', searchQuery.value.trim())
  }
}

// 按分类筛选
const filterByCategory = (category) => {
  activeCategory.value = category
  activeTag.value = ''
  searchQuery.value = ''
  updateRouteQuery()
}

// 按标签筛选
const filterByTag = (tag) => {
  activeTag.value = tag
  activeCategory.value = ''
  searchQuery.value = ''
  updateRouteQuery()
}

// 清除筛选条件
const clearFilters = (type) => {
  if (!type || type === 'category') {
    activeCategory.value = ''
  }
  
  if (!type || type === 'tag') {
    activeTag.value = ''
  }
  
  if (!type) {
    searchQuery.value = ''
  }
  
  updateRouteQuery()
}

// 更新路由查询参数
const updateRouteQuery = () => {
  const query = {}
  
  if (activeCategory.value) {
    query.category = activeCategory.value
  }
  
  if (activeTag.value) {
    query.tag = activeTag.value
  }
  
  if (searchQuery.value.trim()) {
    query.q = searchQuery.value.trim()
  }
  
  router.replace({ query })
}

// 格式化日期
const formatDate = (dateString, formatString) => {
  return format(new Date(dateString), formatString)
}

// 监听滚动效果
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 整体布局 */
.blog-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 页面标题部分 */
.blog-header {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--card-bg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.header-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  overflow: hidden;
}

.blog-header-decoration {
  position: absolute;
  top: -140px;
  left: -140px;
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, var(--link-color) 0%, rgba(50, 115, 220, 0.2) 100%);
  border-radius: 50%;
  opacity: 0.15;
}

.header-content::after {
  content: '';
  position: absolute;
  bottom: -100px;
  right: -100px;
  width: 200px;
  height: 200px;
  background: linear-gradient(225deg, var(--link-color) 0%, rgba(50, 115, 220, 0.2) 100%);
  border-radius: 50%;
  opacity: 0.1;
}

.header-main {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.blog-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: var(--text-color);
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, var(--text-color) 0%, var(--link-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blog-description {
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
  margin: 0 auto 5px;
  font-weight: 300;
}

/* 筛选器标签 */
.active-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.filter-label {
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.7;
  margin-right: 5px;
}

.active-filter {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  background-color: var(--button-bg);
  border-radius: 12px;
  color: var(--link-color);
  font-size: 0.75rem;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-icon {
  font-size: 0.8rem;
}

.clear-filter {
  background: none;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 2px;
  color: var(--text-color);
  opacity: 0.7;
  transition: all 0.2s;
}

.clear-filter:hover {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

/* 主要内容区布局 */
.blog-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

/* 文章部分 */
.articles-section {
  flex: 1;
}

/* 时间线视图 */
.timeline-view {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.year-block {
  position: relative;
}

.year-marker {
  margin-bottom: 20px;
  position: sticky;
  top: 80px;
  z-index: 10;
}

.year-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-color);
  opacity: 0.15;
  letter-spacing: -0.05em;
}

.month-block {
  margin-left: 15px;
  padding-left: 25px;
  position: relative;
  margin-bottom: 30px;
}

.month-block::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--border-color);
}

.month-marker {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-color);
}

.article-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 筛选视图 */
.filtered-view {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.filter-header {
  margin-bottom: 10px;
}

.filter-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

/* 文章卡片 */
.article-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 24px;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-date {
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.6;
}

.card-category {
  display: inline-block;
  padding: 2px 6px;
  background-color: var(--button-bg);
  color: var(--link-color);
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.card-category:hover {
  background-color: var(--link-color);
  color: white;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  text-decoration: none;
  line-height: 1.4;
  margin-bottom: 12px;
  display: block;
  transition: color 0.2s;
}

.card-title:hover {
  color: var(--link-color);
}

.card-summary {
  font-size: 0.95rem;
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.meta-left, .meta-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meta-category {
  display: inline-block;
  padding: 2px 6px;
  background-color: var(--button-bg);
  color: var(--link-color);
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.meta-category:hover {
  background-color: var(--link-color);
  color: white;
}

.meta-views, .view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.7;
}

.view-icon {
  font-size: 0.85rem;
}

.card-tags, .card-stats {
  display: flex;
  align-items: center;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-tag {
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 2px 8px;
  background-color: var(--button-bg);
  border-radius: 15px;
  margin-right: 6px;
  display: inline-block;
  border: 1px solid var(--border-color);
}

.card-tag:hover {
  opacity: 1;
  background-color: var(--button-hover);
  transform: translateY(-1px);
}

/* 无文章状态 */
.no-articles {
  padding: 50px 0;
}

.empty-state {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 50px 30px;
  text-align: center;
  color: var(--text-color);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.empty-state p {
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 20px;
}

.clear-all-btn {
  background-color: var(--button-bg);
  color: var(--link-color);
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-all-btn:hover {
  background-color: var(--link-color);
  color: white;
}

/* 侧边栏 */
.blog-sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar-search {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.sidebar-search input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.2s;
}

.sidebar-search input:focus {
  outline: none;
  border-color: var(--link-color);
  box-shadow: 0 0 0 2px rgba(var(--link-color-rgb, 50, 115, 220), 0.1);
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.search-btn:hover {
  opacity: 1;
}

.sidebar-section {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  overflow: hidden;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-icon {
  font-size: 1rem;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.category-item:hover {
  background-color: var(--button-bg);
}

.category-item.active {
  background-color: var(--link-color);
  color: white;
}

.category-name {
  font-weight: 500;
}

.category-count {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.category-item.active .category-count {
  background-color: rgba(255, 255, 255, 0.2);
}

.popular-posts {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.popular-post {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.popular-post:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.post-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-color);
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.2s;
}

.post-title:hover {
  color: var(--link-color);
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.7;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .blog-container {
    grid-template-columns: 1fr;
  }
  
  .blog-sidebar {
    order: -1;
  }
  
  .sidebar-section {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 30px 20px;
  }
  
  .blog-title {
    font-size: 2rem;
  }
  
  .article-grid {
    grid-template-columns: 1fr;
  }
  
  .month-block {
    margin-left: 0;
    padding-left: 15px;
  }
}

/* 当页面滚动时的效果 */
@media (min-width: 769px) {
  .blog-header {
    height: 180px;
    transition: height 0.3s ease;
  }
  
  .blog-page.scrolled .blog-header {
    height: 120px;
  }
  
  .blog-page.scrolled .blog-title {
    font-size: 2rem;
  }
  
  .blog-page.scrolled .blog-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }
  
  .blog-header-decoration {
    width: 200px;
    height: 200px;
  }
}

/* 搜索结果样式 */
.filtered-view .filter-header h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  font-size: 1.3rem;
  font-weight: 600;
}
</style> 