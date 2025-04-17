<script setup>
import { computed } from 'vue'
import { useBlogStore } from '../stores/blogStore'
import MainLayout from '../layouts/Home.vue'
import ArticleCard from '../components/ArticleCard.vue'
import GalleryView from '../components/GalleryView.vue'

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
  <MainLayout>
    <div class="category-page">
      <!-- 文章列表（非图库类别） -->
      <div v-if="category !== '图库'" class="category-header">
        <h1>{{ category }}</h1>
        <p>该分类下的所有文章</p>
      </div>

      <!-- 图库 -->
      <gallery-view v-if="category === '图库'" />

      <!-- 文章列表（非图库类别） -->
      <div v-else-if="categoryArticles.length > 0" class="articles-container">
        <article-card 
          v-for="article in categoryArticles" 
          :key="article.id" 
          :article="article" 
        />
      </div>
      
      <div v-else class="no-articles">
        <p>暂无{{ category }}相关内容</p>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
}

.category-header {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.category-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.category-header p {
  color: var(--text-color-light);
}

.articles-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-articles {
  text-align: center;
  padding: 50px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: var(--text-color-light);
}
</style> 