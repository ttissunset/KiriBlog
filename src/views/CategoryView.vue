<template>
  <MainLayout>
    <div class="category-page">
      <!-- 文章列表（非图库类别） -->
      <div v-if="category !== '图库'" class="category-header">
        <h1>{{ category }}</h1>
        <p>该分类下的所有文章</p>
      </div>

      <!-- 图库瀑布流布局 - 删除了头部区域 -->
      <div v-if="category === '图库'" class="gallery-container">
        <div class="gallery-header">
          <h1 class="gallery-title">相册</h1>
          <p class="gallery-subtitle">每一个精彩的瞬间，都值得被记录</p>
        </div>
        
        <div class="gallery-date-group">
          <div class="date-label">
            <div class="date-icon">📅</div>
            <span>2025/3/2</span>
          </div>
          <div class="gallery-waterfall">
            <div v-for="(image, index) in galleryImages.slice(0, 2)" :key="index" class="gallery-item">
              <div class="gallery-image-wrapper" @click="viewImage(image)">
                <img :src="image.url" :alt="image.description" class="gallery-image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-date-group">
          <div class="date-label">
            <div class="date-icon">📅</div>
            <span>2025/2/26</span>
          </div>
          <div class="gallery-waterfall">
            <div v-for="(image, index) in galleryImages.slice(2, 3)" :key="index + 2" class="gallery-item">
              <div class="gallery-image-wrapper" @click="viewImage(image)">
                <img :src="image.url" :alt="image.description" class="gallery-image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-date-group">
          <div class="date-label">
            <div class="date-icon">📅</div>
            <span>2025/2/15</span>
          </div>
          <div class="gallery-waterfall">
            <div v-for="(image, index) in galleryImages.slice(3, 6)" :key="index + 3" class="gallery-item">
              <div class="gallery-image-wrapper" @click="viewImage(image)">
                <img :src="image.url" :alt="image.description" class="gallery-image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-date-group">
          <div class="date-label">
            <div class="date-icon">📅</div>
            <span>2025/2/14</span>
          </div>
          <div class="gallery-waterfall">
            <div v-for="(image, index) in galleryImages.slice(6, 9)" :key="index + 6" class="gallery-item">
              <div class="gallery-image-wrapper" @click="viewImage(image)">
                <img :src="image.url" :alt="image.description" class="gallery-image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 优化的图片查看器 -->
        <div v-if="activeImage" class="image-viewer" @click="closeViewer">
          <div class="image-viewer-content" @click.stop>
            <img :src="activeImage.url" :alt="activeImage.description" class="viewer-image" />
            <button class="close-viewer" @click="closeViewer">×</button>
            <button class="like-button" @click="toggleLike">
              <span v-if="isLiked">❤️</span>
              <span v-else>🤍</span>
              <span class="like-count">{{ likeCount }}</span>
            </button>
            <div class="viewer-details">
              <h3>{{ activeImage.description }}</h3>
              <p v-if="activeImage.source">来源: {{ activeImage.source }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 文章列表（非图库类别） -->
      <div v-else-if="categoryArticles.length > 0" class="articles-container">
        <div class="article-card" v-for="article in categoryArticles" :key="article.id">
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
      </div>
      
      <div v-else class="no-articles">
        <p>暂无{{ category }}相关内容</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { useBlogStore } from '../stores/blogStore'
import MainLayout from '../layouts/Header.vue'

// 通过props接收分类名称
const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

const blogStore = useBlogStore()

// 获取该分类下的文章
const categoryArticles = computed(() => 
  blogStore.getArticlesByCategory(props.category)
)

// 格式化日期
const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy-MM-dd')
}

// 图库图片数据
const galleryImages = ref([
  {
    url: 'https://images.unsplash.com/photo-1610278764398-42e5729659a4?ixlib=rb-4.0.3',
    description: '樱花树',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3',
    description: '日本城市风光',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3',
    description: '春日庭院',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3',
    description: '夏日海滩',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.0.3',
    description: '秋日公园',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3',
    description: '冬日雪景',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3',
    description: '古城一角',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-4.0.3',
    description: '星空夜景',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3',
    description: '郁金香花田',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1547070494-49cd55162512?ixlib=rb-4.0.3',
    description: '冬日雾凇',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1565118531796-763e5082d113?ixlib=rb-4.0.3',
    description: '都市夜景',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-4.0.3',
    description: '花园小路',
    source: 'Unsplash'
  }
])

// 图片查看器相关
const activeImage = ref(null)
const likeCount = ref(0)
const isLiked = ref(false)

// 查看大图
const viewImage = (image) => {
  activeImage.value = image
  document.body.style.overflow = 'hidden' // 防止背景滚动
  // 重置点赞状态
  isLiked.value = localStorage.getItem(`liked_${image.url}`) === 'true'
  likeCount.value = parseInt(localStorage.getItem(`likes_${image.url}`) || '0')
}

// 关闭查看器
const closeViewer = () => {
  activeImage.value = null
  document.body.style.overflow = '' // 恢复滚动
}

// 点赞功能
const toggleLike = (event) => {
  event.stopPropagation()
  if (activeImage.value) {
    if (isLiked.value) {
      likeCount.value--
    } else {
      likeCount.value++
    }
    isLiked.value = !isLiked.value
    
    // 将点赞状态保存到localStorage
    localStorage.setItem(`liked_${activeImage.value.url}`, isLiked.value)
    localStorage.setItem(`likes_${activeImage.value.url}`, likeCount.value)
  }
}
</script>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 优化图库瀑布流样式 */
.gallery-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.gallery-header {
  margin-bottom: 40px;
}

.gallery-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.gallery-subtitle {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.7;
}

.gallery-date-group {
  margin-bottom: 40px;
}

.date-label {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1rem;
  color: var(--text-color);
}

.date-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.gallery-waterfall {
  column-count: 2;
  column-gap: 15px;
  width: 100%;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: 15px;
}

.gallery-image-wrapper {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transform: translateZ(0);
  transition: all 0.3s ease;
  background-color: #f5f5f5;
}

.gallery-image-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-overlay {
  display: none;
}

/* 优化图片查看器 */
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  backdrop-filter: blur(5px);
}

.image-viewer-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.viewer-image {
  max-width: 100%;
  max-height: 85vh;
  display: block;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.viewer-details {
  margin-top: 15px;
  color: white;
  text-align: center;
}

.viewer-details h3 {
  margin: 0 0 5px;
  font-size: 1.2rem;
  font-weight: 500;
}

.viewer-details p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.close-viewer {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.close-viewer:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

/* 点赞按钮样式 */
.like-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.like-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.like-count {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 响应式布局调整 */
@media (max-width: 768px) {
  .gallery-waterfall {
    column-count: 1;
  }
  
  .gallery-container {
    padding: 20px 15px;
  }
  
  .gallery-title {
    font-size: 1.8rem;
  }
}
</style> 