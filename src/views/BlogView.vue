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
        <template v-if="archivedArticles">
          <div class="timeline-view">
            <!-- 文章年份归档区域 -->
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
                        <span class="material-icons-sharp tag-icon">style</span>
                        <router-link v-for="tag in article.tags" :key="tag" :to="{ name: 'blog', query: { tag } }" class="card-tag" :style="{ color: getRandomColor() }">
                          {{ tag }}
                        </router-link>
                      </div>
                    </div>
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
              <span class="material-icons-sharp" style="font-size: 48px; color: currentColor;">
                article
              </span>
            </div>
            <h3>暂无文章</h3>
            <p>暂无文章内容</p>
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

// 生成随机颜色
const getRandomColor = () => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B59B6',
    '#3498DB',
    '#E67E22',
    '#2ECC71'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 获取所有博客数据
const { articles, archivedArticles } = blogStore;

// 精确到秒的日期格式化函数
const formatDateTime = (dateString) => {
  return format(new Date(dateString), "yyyy/MM/dd HH:mm:ss");
};

// 滚动进度百分比
const scrollProgress = ref(0);

// 更新滚动进度，计算页面滚动的百分比
const updateScrollProgress = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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
  margin-bottom: 60px;
}

.date-label {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: var(--fs-20);
  color: var(--dark);
  position: relative;
  z-index: 2;
}

.month-block {
  margin-left: 15px;
  padding-left: 25px;
  position: relative;
  margin-bottom: 60px;
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
  font-size: var(--fs-18);
  font-weight: var(--fw-600);
  margin-bottom: 25px;
  color: var(--dark);
  position: relative;
  z-index: 2;
}

.article-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 25px;
  position: relative;
  z-index: 1;
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
  height: 100%;
  margin-bottom: 0;
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
  border-top: 1px solid var(--border-color);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tag-icon {
  font-size: 16px;
  margin-right: 2px;
  color: var(--text-color);
  opacity: 0.7;
}

.card-tag {
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s;
  padding: 2px 6px;
  border-radius: 4px;
}

.view-count .material-icon,
.section-title .material-icon {
  font-size: 1em;
  vertical-align: middle;
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
  display: flex;
  align-items: center;
}

.section-icon .material-icon {
  font-size: 1rem;
  vertical-align: middle;
  margin-right: 8px;
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

.filter-title span .material-icon {
  font-size: 1em;
  vertical-align: middle;
  margin-right: 8px;
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

@media (max-width: 1200px) {
  .article-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px 25px;
  }
}

@media (max-width: 768px) {
  .article-cards {
    grid-template-columns: 1fr;
    gap: 50px 0;
  }
}
</style>
