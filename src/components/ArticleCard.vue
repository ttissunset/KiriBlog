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
          <router-link v-for="tag in article.tags" :key="tag" :to="{ name: 'blog', query: { tag } }" class="article-tag">
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
  background-color: var(--light-white);
  border-radius: var(--radius-8);
  box-shadow: var(--shadow-1);
  margin-bottom: 20px;
  transition: transform var(--transition-2) ease,
    box-shadow var(--transition-2) ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-3);
}

.article-card-content {
  padding: 20px;
}

.article-title {
  display: block;
  font-size: var(--fs-20);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 10px;
  text-decoration: none;
}

.article-title:hover {
  color: var(--blue-crayola);
}

.article-summary {
  color: var(--dark-variant);
  margin-bottom: 15px;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-14);
}

.article-date {
  color: var(--dark-variant);
}

.article-tags {
  display: flex;
  gap: 8px;
}

.article-tag {
  padding: 3px 8px;
  background-color: var(--youth-blue-3);
  color: var(--dark);
  border-radius: var(--radius-10);
  text-decoration: none;
  font-size: var(--fs-12);
  transition: background-color var(--transition-2);
}

.article-tag:hover {
  background-color: var(--youth-blue-2);
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