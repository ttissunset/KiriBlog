<template>
  <div class="blog-container">
    <!-- 左侧进度滑轨 -->
    <div class="blog-progress">
      <div class="progress-bar">
        <div class="progress-indicator" :style="{ height: scrollProgress + '%' }"></div>
      </div>
      <div class="progress-text">{{ Math.round(scrollProgress) }}%</div>
    </div>

    <div class="blog-content">
      <div class="blog-header">
        <h1 class="blog-title">我的博客</h1>
        <p class="blog-subtitle">分享技术与生活的点点滴滴</p>
      </div>

      <!-- 主要内容区 -->
      <div class="blog-container-wrapper">
        <!-- 时间线浏览模式 -->
        <template v-if="filteredArticles.length > 0 && !activeCategory && !activeTag">
          <div class="timeline-view">
            <!-- 文章年份归档区域 -->
            <template v-if="archivedArticles">
              <div v-for="year in Object.keys(archivedArticles).sort((a, b) => b - a)" :key="year" class="blog-date-group">
                <div class="date-label">
                  <span>{{ year }}</span>
                </div>

                <!-- 文章月份归档区域 -->
                <div v-for="month in Object.keys(archivedArticles[year] || {}).sort((a, b) => b - a)" :key="`${year}-${month}`" class="month-block">
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
                            <MaterialIcon icon="visibility" />
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
              <button class="reset-filter" @click="clearFilters">
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
    </div>
  </div>
</template>

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

// 滚动进度百分比
const scrollProgress = ref(0);

// 更新滚动进度，计算页面滚动的百分比
const updateScrollProgress = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  scrollProgress.value = (scrollTop / scrollHeight) * 100;
};

// 监听滚动事件，更新进度
onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress);
});

// 移除滚动事件监听，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>


<style scoped>
.blog-container {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.blog-progress {
  position: sticky;
  top: 90px;
  left: 0;
  height: calc(100vh - 180px);
  width: 40px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.progress-bar {
  flex: 1;
  width: 2px;
  background-color: var(--raisin-black);
  position: relative;
  margin: 10px 0;
}

.progress-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--youth-blue);
  transition: height 0.1s ease;
}

.progress-text {
  font-size: var(--fs-12);
  color: var(--dark);
  opacity: 0.7;
}

.blog-content {
  flex: 1;
  margin: 0;
  padding: 20px 0;
  width: 100%;
  max-width: 100%;
}

.blog-container-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.blog-header {
  margin-bottom: 40px;
}

.blog-title {
  font-size: var(--fs-24);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 8px;
}

.blog-subtitle {
  font-size: var(--fs-16);
  color: var(--dark);
  opacity: 0.7;
}

.blog-date-group {
  margin-bottom: 40px;
}

.date-label {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: var(--fs-16);
  color: var(--dark);
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
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  margin-bottom: 20px;
  color: var(--dark);
}

.article-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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

.filtered-view {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.filter-header {
  margin-bottom: 10px;
}

.filter-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

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

.blog-sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
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
</style>
