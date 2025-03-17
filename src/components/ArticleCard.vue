<template>
  <div class="article-card">
    <div class="article-card-content">
      <router-link :to="{ name: 'article', params: { id: article.id } }" class="article-title">
        {{ article.title }}
      </router-link>
      <p class="article-summary">{{ article.summary }}</p>
      <div class="article-meta">
        <span class="article-date">{{ formatDate(article.createdAt) }}</span>
        <div class="article-tags">
          <router-link 
            v-for="tag in article.tags" 
            :key="tag"
            :to="{ name: 'blog', query: { tag } }"
            class="article-tag"
          >
            {{ tag }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { format } from 'date-fns';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

// 格式化日期
const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy-MM-dd');
};
</script>

<style scoped>
.article-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-card-content {
  padding: 20px;
}

.article-title {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 10px;
  text-decoration: none;
}

.article-title:hover {
  color: var(--link-color);
}

.article-summary {
  color: var(--text-color-light);
  margin-bottom: 15px;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.article-date {
  color: var(--text-color-light);
}

.article-tags {
  display: flex;
  gap: 8px;
}

.article-tag {
  padding: 3px 8px;
  background-color: var(--button-bg);
  color: var(--text-color);
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.75rem;
  transition: background-color 0.2s;
}

.article-tag:hover {
  background-color: var(--button-hover);
}

@media (max-width: 768px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .article-tags {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 5px;
  }
}
</style> 