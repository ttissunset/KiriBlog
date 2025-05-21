<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { format } from "date-fns";
import { useBlogStore } from "../stores/blogStore";

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();

// 获取所有博客数据
const { articles, categories, tags, archivedArticles } = blogStore;

// 筛选条件
const activeCategory = ref("");
const activeTag = ref("");
const searchQuery = ref("");

// 初始化筛选条件（从URL参数）
onMounted(() => {
  if (route.query.category) {
    activeCategory.value = route.query.category;
  }

  if (route.query.tag) {
    activeTag.value = route.query.tag;
  }

  if (route.query.q) {
    searchQuery.value = route.query.q;
  }
});

// 筛选文章
const filteredArticles = computed(() => {
  // 始终按最新时间排序，确保最新的文章在最前面
  return blogStore
    .getFilteredArticles(
      activeCategory.value,
      activeTag.value,
      searchQuery.value
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

// 热门文章
const popularArticles = computed(() => {
  return blogStore.getPopularArticles().slice(0, 5);
});

// 执行搜索
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // 清空其他筛选条件
    activeCategory.value = "";
    activeTag.value = "";
    // 更新URL查询参数
    updateRouteQuery();
    // 强制重新计算过滤后的文章
    return filteredArticles.value;
  }
};

// 按分类筛选
const filterByCategory = (category) => {
  activeCategory.value = category;
  activeTag.value = "";
  searchQuery.value = "";
  updateRouteQuery();
};

// 按标签筛选
const filterByTag = (tag) => {
  activeTag.value = tag;
  activeCategory.value = "";
  searchQuery.value = "";
  updateRouteQuery();
};

// 清除筛选条件
const clearFilters = (type) => {
  if (!type || type === "category") {
    activeCategory.value = "";
  }

  if (!type || type === "tag") {
    activeTag.value = "";
  }

  if (!type) {
    searchQuery.value = "";
  }

  updateRouteQuery();
};

// 更新路由查询参数
const updateRouteQuery = () => {
  const query = {};

  if (activeCategory.value) {
    query.category = activeCategory.value;
  }

  if (activeTag.value) {
    query.tag = activeTag.value;
  }

  if (searchQuery.value.trim()) {
    query.q = searchQuery.value.trim();
  }

  router.replace({ query });
};

// 格式化日期
const formatDate = (dateString, formatString) => {
  return format(new Date(dateString), formatString);
};

// 精确到秒的日期格式化函数
const formatDateTime = (dateString) => {
  return format(new Date(dateString), "yyyy/MM/dd HH:mm:ss");
};

// 监听滚动效果
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="blog-page">
    <!-- 主要内容区 -->
    <div class="blog-container">
      <!-- 左侧：文章列表 -->
      <div class="articles-section">
        <!-- 时间线浏览模式 -->
        <template v-if="filteredArticles.length > 0 && !activeCategory && !activeTag">
          <div class="timeline-view">
            <!-- 文章年份归档区域 -->
            <template v-if="archivedArticles">
              <div v-for="year in Object.keys(archivedArticles).sort(
                    (a, b) => b - a
                  )" :key="year" class="year-block">
                <div class="year-marker">
                  <span class="year-number">{{ year }}</span>
                </div>

                <!-- 文章月份归档区域 -->
                <div v-for="month in Object.keys(
                      archivedArticles[year] || {}
                    ).sort((a, b) => b - a)" :key="`${year}-${month}`" class="month-block">
                  <div class="month-marker">
                    {{ month }}月
                  </div>

                  <div class="article-cards">
                    <div v-for="article in archivedArticles[year][month]" :key="article.id" class="article-card">
                      <div class="card-date">
                        {{ formatDateTime(article.createdAt) }}
                      </div>
                      <router-link :to="{ name: 'article', params: { id: article.id } }" class="card-title">
                        {{ article.title }}
                      </router-link>

                      <p class="card-summary">{{ article.summary }}</p>

                      <div class="card-footer">
                        <div class="card-tags">
                          <router-link v-for="tag in article.tags" :key="tag" :to="{ name: 'blog', query: { tag } }" class="card-tag">
                            #{{ tag }}
                          </router-link>
                        </div>
                        <div class="card-stats">
                          <span class="view-count">
                            <span class="view-icon">
                              <MaterialIcon icon="visibility" />
                            </span>
                            {{ article.views }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>

        <!-- 筛选模式下的文章列表 -->
        <template v-else-if="filteredArticles.length > 0">
          <div class="filtered-view">
            <div class="filter-header" v-if="activeCategory || activeTag">
              <h2 class="filter-title">
                <span v-if="activeCategory">
                  <MaterialIcon icon="folder" />
                  分类: {{ activeCategory }}
                </span>
                <span v-else-if="activeTag">
                  <MaterialIcon icon="tag" />
                  标签: {{ activeTag }}
                </span>
              </h2>
              <button class="reset-filter" @click="resetFilter">
                <MaterialIcon icon="close" />
                重置筛选
              </button>
            </div>

            <div class="article-grid">
              <div v-for="article in filteredArticles" :key="article.id" class="article-card">
                <div class="card-date">
                  {{ formatDateTime(article.createdAt) }}
                </div>
                <router-link :to="{ name: 'article', params: { id: article.id } }" class="card-title">
                  {{ article.title }}
                </router-link>

                <p class="card-summary">{{ article.summary }}</p>

                <div class="card-footer">
                  <div class="card-tags">
                    <router-link v-for="tag in article.tags" :key="tag" :to="{ name: 'blog', query: { tag } }" class="card-tag">
                      #{{ tag }}
                    </router-link>
                  </div>
                  <div class="card-stats">
                    <span class="view-count">
                      <MaterialIcon icon="visibility" />
                      {{ article.views }} 次浏览
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
            <div class="empty-icon">
              <MaterialIcon icon="article" style="font-size: 48px; color: currentColor;" />
            </div>
            <h3>暂无文章</h3>
            <p>尝试不同的筛选条件</p>
            <button @click="clearFilters()" class="clear-all-btn">
              清除所有筛选
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧：侧边栏 -->
      <div class="blog-sidebar">
        <!-- 分类部分 -->
        <div class="sidebar-section">
          <h3 class="section-title">
            <span class="section-icon">
              <MaterialIcon icon="folder" />
            </span>
            分类
          </h3>
          <div class="categories-list">
            <div v-for="category in categories" :key="category.id" class="category-item" :class="{ active: activeCategory === category.name }" @click="filterByCategory(category.name)">
              <div class="category-name">{{ category.name }}</div>
              <div class="category-count">{{ category.count }}</div>
            </div>
          </div>
        </div>

        <!-- 热门文章部分 -->
        <div class="sidebar-section">
          <h3 class="section-title">
            <span class="section-icon">
              <MaterialIcon icon="local_fire_department" />
            </span>
            热门文章
          </h3>
          <div class="popular-posts">
            <div v-for="article in popularArticles" :key="article.id" class="popular-post">
              <router-link :to="{ name: 'article', params: { id: article.id } }" class="post-title">
                {{ article.title }}
              </router-link>
              <div class="post-meta">
                <span class="post-views">{{ article.views }} 次浏览</span>
                <span class="post-date">{{
                    formatDateTime(article.createdAt)
                  }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 整体布局 */
.blog-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
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

.card-date {
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.6;
  margin-bottom: 12px;
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
  color: var(--text-color-light);
  margin-bottom: 15px;
  line-height: 1.5;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-tag {
  font-size: 0.8rem;
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s;
}

.card-tag:hover {
  color: var(--link-hover);
  text-decoration: underline;
}

.card-stats {
  display: flex;
  align-items: center;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: var(--text-color-light);
}

.view-icon {
  font-size: 0.9rem;
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
