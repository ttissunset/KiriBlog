<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { format } from "date-fns";
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Home.vue";

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();

// 搜索状态
const searchQuery = ref("");
const searchResults = ref([]);
const searchPerformed = ref(false);

// 分页
const currentPage = ref(1);
const itemsPerPage = 5;

// 初始化搜索查询（从URL参数）
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q;
    performSearch();
  }
});

// 监听查询参数变化
watch(
  () => route.query.q,
  (newValue) => {
    if (newValue && newValue !== searchQuery.value) {
      searchQuery.value = newValue;
      performSearch();
    }
  }
);

// 执行搜索
const performSearch = () => {
  if (!searchQuery.value.trim()) return;

  searchResults.value = blogStore.searchArticles(searchQuery.value);
  searchPerformed.value = true;
  currentPage.value = 1;

  // 更新URL参数
  if (route.query.q !== searchQuery.value) {
    router.replace({
      query: { q: searchQuery.value },
    });
  }
};

// 计算分页结果
const totalPages = computed(() =>
  Math.ceil(searchResults.value.length / itemsPerPage)
);

const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return searchResults.value.slice(startIndex, endIndex);
});

// 格式化日期
const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy-MM-dd");
};
</script>

<template>
  <MainLayout>
    <div class="search-page">
      <div class="search-header">
        <h1>搜索结果</h1>
        <div class="search-form">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="输入关键词搜索文章..."
            class="search-input"
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="search-button">搜索</button>
        </div>
      </div>

      <div v-if="searchResults.length > 0" class="search-results">
        <div class="results-meta">
          共找到 <strong>{{ searchResults.length }}</strong> 条结果
        </div>

        <div class="results-list">
          <div
            v-for="result in paginatedResults"
            :key="result.id"
            class="result-item"
          >
            <router-link
              :to="{ name: 'article', params: { id: result.id } }"
              class="result-title"
            >
              {{ result.title }}
            </router-link>
            <div class="result-summary">{{ result.summary }}</div>
            <div class="result-meta">
              <span class="result-date">{{
                formatDate(result.createdAt)
              }}</span>
              <span class="result-category">
                分类:
                <router-link
                  :to="{ name: 'blog', query: { category: result.category } }"
                >
                  {{ result.category }}
                </router-link>
              </span>
              <span class="result-views"> {{ result.views }} 次阅读 </span>
            </div>
            <div class="result-tags">
              <router-link
                v-for="tag in result.tags"
                :key="tag"
                :to="{ name: 'blog', query: { tag } }"
                class="result-tag"
              >
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- 分页控件 -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="page-button"
          >
            上一页
          </button>

          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="page-button"
          >
            下一页
          </button>
        </div>
      </div>
      <div v-else-if="searchPerformed" class="no-results">
        <p>没有找到与 "{{ searchQuery }}" 相关的文章</p>
        <p>建议：</p>
        <ul>
          <li>检查搜索关键词是否有拼写错误</li>
          <li>尝试使用更少或更一般的关键词</li>
          <li>尝试使用相关的类别或标签进行浏览</li>
        </ul>
        <router-link to="/archive" class="browse-all">浏览所有文章</router-link>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.search-header {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.search-header h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-button {
  background-color: #3273dc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #2366d1;
}

.search-results {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.results-meta {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  color: #666;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.result-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.result-title {
  font-size: 1.3rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;
  display: block;
}

.result-title:hover {
  color: #3273dc;
}

.result-summary {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.result-meta a {
  color: #3273dc;
  text-decoration: none;
}

.result-meta a:hover {
  text-decoration: underline;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.result-tag {
  background-color: #f0f7ff;
  color: #3273dc;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  text-decoration: none;
}

.result-tag:hover {
  background-color: #3273dc;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.page-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666;
}

.no-results {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 30px;
  text-align: center;
}

.no-results p {
  margin-bottom: 15px;
  color: #555;
}

.no-results ul {
  text-align: left;
  max-width: 500px;
  margin: 0 auto 20px;
  color: #666;
}

.no-results li {
  margin-bottom: 8px;
}

.browse-all {
  display: inline-block;
  background-color: #3273dc;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 10px;
}
</style>
