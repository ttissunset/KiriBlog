<script setup>
import { computed } from 'vue'
import { useBlogStore } from '../stores/blogStore'
import ArticleCard from '../components/ArticleCard.vue'

// 通过props接收路由传递的分类名称
const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

const blogStore = useBlogStore()

// 获取该分类下的文章列表
const categoryArticles = computed(() => 
  blogStore.getArticlesByCategory(props.category)
)
</script>

<template>
    <div class="category-page">
    <!-- 文章列表 -->
    <div class="category-header">
        <h1>{{ category }}</h1>
        <p>该分类下的所有文章</p>
      </div>

    <!-- 文章列表 -->
    <div v-if="categoryArticles.length > 0" class="articles-container">
      <article-card v-for="article in categoryArticles" :key="article.id" :article="article" />
      </div>
      
      <div v-else class="no-articles">
        <p>暂无{{ category }}相关内容</p>
      </div>
    </div>
</template>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.category-header {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.category-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--dark);
}

.category-header p {
  color: var(--dark-variant);
}

.articles-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-articles {
  text-align: center;
  padding: 50px 0;
  background-color: var(--cultured);
  border-radius: var(--radius-8);
  color: var(--dark-variant);
}
</style> 