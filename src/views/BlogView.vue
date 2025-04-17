<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { format } from "date-fns";
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Home.vue";

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
  <MainLayout>
    <div class="blog-page">
      <!-- 主要内容区 -->
      <div class="blog-container">
        <!-- 左侧：文章列表 -->
        <div class="articles-section">
          <!-- 时间线浏览模式 -->
          <template
            v-if="filteredArticles.length > 0 && !activeCategory && !activeTag"
          >
            <div class="timeline-view">
              <!-- 文章年份归档区域 -->
              <template v-if="archivedArticles">
                <div
                  v-for="year in Object.keys(archivedArticles).sort(
                    (a, b) => b - a
                  )"
                  :key="year"
                  class="year-block"
                >
                  <div class="year-marker">
                    <span class="year-number">{{ year }}</span>
                  </div>

                  <!-- 文章月份归档区域 -->
                  <div
                    v-for="month in Object.keys(
                      archivedArticles[year] || {}
                    ).sort((a, b) => b - a)"
                    :key="`${year}-${month}`"
                    class="month-block"
                  >
                    <div class="month-marker">
                      {{ month }}{{ $t("blog.month") }}
                    </div>

                    <div class="article-cards">
                      <div
                        v-for="article in archivedArticles[year][month]"
                        :key="article.id"
                        class="article-card"
                      >
                        <div class="card-date">
                          {{ formatDateTime(article.createdAt) }}
                        </div>
                        <router-link
                          :to="{ name: 'article', params: { id: article.id } }"
                          class="card-title"
                        >
                          {{ article.title }}
                        </router-link>

                        <p class="card-summary">{{ article.summary }}</p>

                        <div class="card-footer">
                          <div class="card-tags">
                            <router-link
                              v-for="tag in article.tags"
                              :key="tag"
                              :to="{ name: 'blog', query: { tag } }"
                              class="card-tag"
                            >
                              #{{ tag }}
                            </router-link>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                      ></path>
                    </svg>
                    {{ $t("blog.category") }}: {{ activeCategory }}
                  </span>
                  <span v-else-if="activeTag">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                      ></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    {{ $t("common.tags") }}: {{ activeTag }}
                  </span>
                </h2>
                <button class="reset-filter" @click="resetFilter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  {{ $t("blog.resetFilter") }}
                </button>
              </div>

              <div class="article-grid">
                <div
                  v-for="article in filteredArticles"
                  :key="article.id"
                  class="article-card"
                >
                  <div class="card-date">
                    {{ formatDateTime(article.createdAt) }}
                  </div>
                  <router-link
                    :to="{ name: 'article', params: { id: article.id } }"
                    class="card-title"
                  >
                    {{ article.title }}
                  </router-link>

                  <p class="card-summary">{{ article.summary }}</p>

                  <div class="card-footer">
                    <div class="card-tags">
                      <router-link
                        v-for="tag in article.tags"
                        :key="tag"
                        :to="{ name: 'blog', query: { tag } }"
                        class="card-tag"
                      >
                        #{{ tag }}
                      </router-link>
                    </div>
                    <div class="card-stats">
                      <span class="view-count">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          ></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {{ article.views }} {{ $t("common.viewCount") }}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path
                    d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"
                  ></path>
                  <line x1="9" y1="9" x2="10" y2="9"></line>
                  <line x1="9" y1="13" x2="15" y2="13"></line>
                  <line x1="9" y1="17" x2="15" y2="17"></line>
                </svg>
              </div>
              <h3>{{ $t("blog.noArticles") }}</h3>
              <p>{{ $t("blog.tryDifferent") }}</p>
              <button @click="clearFilters()" class="clear-all-btn">
                {{ $t("blog.clearFilters") }}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                  ></path>
                </svg>
              </span>
              {{ $t("blog.category") }}
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
              <span class="section-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2c1.1 0 2 1.7 2 3.8 0 .5 0 1.1-.2 1.7l-.7 1.8c.3 0 .7-.1 1.1-.1 1.2 0 2.4.5 3.3 1.4.6.5 1 1.2 1.3 2 .7-.3 1.3-.4 1.8-.4 2.3 0 3.4 2.7 3.4 5.1 0 2.2-1.3 4.1-2.5 5.4-1.2 1.2-2.8 2.2-4.3 2.3H9.7c-1.5-.2-3-1.1-4.2-2.3C4.3 21.7 3 19.8 3 17.6c0-2.4 1.1-5.1 3.4-5.1.6 0 1.2.2 1.9.5.3-.9.8-1.6 1.4-2.2.9-.9 2.1-1.4 3.3-1.4.5 0 .9 0 1.2.1L13.4 8c.5-.7.6-1.4.6-2 0-2.3-.9-4-2-4z"
                  ></path>
                </svg>
              </span>
              {{ $t("blog.popularPosts") }}
            </h3>
            <div class="popular-posts">
              <div
                v-for="article in popularArticles"
                :key="article.id"
                class="popular-post"
              >
                <router-link
                  :to="{ name: 'article', params: { id: article.id } }"
                  class="post-title"
                >
                  {{ article.title }}
                </router-link>
                <div class="post-meta">
                  <span class="post-views"
                    >{{ article.views }} {{ $t("common.viewCount") }}</span
                  >
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
  </MainLayout>
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
  content: "";
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
