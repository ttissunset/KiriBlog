<template>
  <MainLayout>
    <div class="category-page">
      <!-- 文章列表（非图库类别） -->
      <div v-if="category !== '图库'" class="category-header">
        <h1>{{ category }}</h1>
        <p>该分类下的所有文章</p>
      </div>

      <!-- 图库瀑布流布局 -->
      <div v-if="category === '图库'" class="gallery-container">
        <!-- 左侧进度滑轨 -->
        <div class="gallery-progress">
          <div class="progress-bar">
            <div class="progress-indicator" :style="{ height: scrollProgress + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.round(scrollProgress) }}%</div>
        </div>
        
        <div class="gallery-content">
          <div class="gallery-header">
            <h1 class="gallery-title">相册</h1>
            <p class="gallery-subtitle">每一个精彩的瞬间，都值得被记录</p>
          </div>
          
          <div class="gallery-date-group">
            <div class="date-label">
              <div class="date-icon"></div>
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
              <div class="date-icon"></div>
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
              <div class="date-icon"></div>
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
              <div class="date-icon"></div>
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
        </div>
        
        <!-- 优化的图片查看器 -->
        <div v-if="activeImage" class="image-viewer" @click="closeViewer">
          <div class="image-viewer-content" @click.stop>
            <div class="viewer-main-image">
              <img :src="activeImage.url" :alt="activeImage.description" class="viewer-image" />
              <div class="camera-info">
                <div class="camera-brand">REDMI K60</div>
                <div class="camera-data">
                  <span>25mm f/1.79 1/940s ISO50</span>
                  <span>28°94'0"N 112°65'35"E</span>
                </div>
                <div class="camera-time">{{ formatCameraTime(activeImage) }}</div>
              </div>
            </div>
            <div class="viewer-info-panel">
              <div class="info-header">
                <h3>信息</h3>
                <button class="close-viewer" @click="closeViewer">×</button>
              </div>
              <div class="info-content">
                <div class="info-item">
                  <div class="info-icon">📅</div>
                  <div class="info-text">拍摄时间: 2025/3/2 16:14:49</div>
                </div>
                <div class="info-item">
                  <div class="info-icon">📍</div>
                  <div class="info-text">拍摄地点: 湖南省长沙市</div>
                </div>
                <div class="info-item">
                  <div class="info-icon">📷</div>
                  <div class="info-text">拍摄设备: Xiaomi 23013RK75C</div>
                </div>
                <div class="info-description">
                  校园里的花开了，可在自然的东西天晓得南方，终究是葱茏一现的美好
                </div>
              </div>
            </div>
            <div class="navigation-buttons">
              <button class="nav-button prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button class="nav-button next">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
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
import { computed, ref, onMounted, onUnmounted } from 'vue'
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

// 滚动进度
const scrollProgress = ref(0)

// 更新滚动进度
const updateScrollProgress = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (scrollTop / scrollHeight) * 100
}

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

// 在script setup部分，添加新的formatCameraTime函数
const formatCameraTime = (image) => {
  // 这里实际项目中应根据图片数据生成时间
  // 示例中使用固定格式
  return '2025.03.02  16:14:49'
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress() // 初始化进度
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
}

/* 优化图库瀑布流样式 */
.gallery-container {
  position: relative;
  display: flex;
}

.gallery-progress {
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
  background-color: var(--border-color);
  position: relative;
  margin: 10px 0;
}

.progress-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--link-color);
  transition: height 0.1s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.7;
}

.gallery-content {
  flex: 1;
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
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  border: 1px solid var(--text-color);
  border-radius: 2px;
}

.date-icon::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 3px;
  right: 3px;
  height: 2px;
  border-top: 1px solid var(--text-color);
  border-left: 1px solid var(--text-color);
  border-right: 1px solid var(--text-color);
  border-radius: 1px 1px 0 0;
}

.date-icon::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 1px;
  background-color: var(--text-color);
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
  width: 100%;
  height: 0;
  padding-bottom: 65%; /* 更宽的比例 */
}

.gallery-image-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay {
  display: none;
}

/* 重新设计图片查看器 */
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(65, 65, 65, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.image-viewer-content {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  position: relative;
}

.viewer-main-image {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.viewer-image {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  object-fit: contain;
}

.camera-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.camera-brand {
  font-weight: 500;
}

.camera-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 0.75rem;
  opacity: 0.8;
}

.viewer-info-panel {
  width: 350px;
  height: 100%;
  background-color: #1a1a1a;
  color: white;
  overflow: auto;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.info-content {
  padding: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.info-icon {
  width: 24px;
  margin-right: 10px;
  opacity: 0.7;
}

.info-text {
  flex: 1;
  font-size: 0.9rem;
}

.info-description {
  margin-top: 30px;
  line-height: 1.6;
  opacity: 0.9;
}

.close-viewer {
  background-color: transparent;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.close-viewer:hover {
  opacity: 1;
}

.navigation-buttons {
  position: absolute;
  top: 50%;
  left: 0;
  right: 350px; /* 右侧信息面板宽度 */
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  pointer-events: auto;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 响应式布局调整 */
@media (max-width: 768px) {
  .image-viewer-content {
    flex-direction: column;
  }
  
  .viewer-info-panel {
    width: 100%;
    height: auto;
    max-height: 30vh;
  }
  
  .navigation-buttons {
    right: 0;
  }
}
</style> 