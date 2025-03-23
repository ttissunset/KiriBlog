<template>
  <div class="gallery-container">
    <!-- 左侧进度滑轨 -->
    <div class="gallery-progress">
      <div class="progress-bar">
        <div class="progress-indicator" :style="{ height: scrollProgress + '%' }"></div>
      </div>
      <div class="progress-text">{{ Math.round(scrollProgress) }}%</div>
    </div>
    
    <div class="gallery-content">
      <div class="gallery-header">
        <h1 class="gallery-title">{{ $t('gallery.title') }}</h1>
        <p class="gallery-subtitle">{{ $t('gallery.subtitle') }}</p>
      </div>
      
      <!-- 加载状态指示器 -->
      <div v-if="isLoading && !hasItems" class="loading-container">
        <div class="loading-spinner"></div>
        <p>{{ $t('gallery.loadingImages') }}</p>
      </div>
      
      <!-- 相册内容，不使用虚拟滚动 -->
      <div class="gallery-container-wrapper">
        <div 
          v-for="group in groupedImages" 
          :key="group.date" 
          class="gallery-date-group"
        >
          <div class="date-label">
            <div class="date-icon"></div>
            <span>{{ group.date }}</span>
          </div>
          <div class="gallery-waterfall">
            <div v-for="(image, imageIndex) in group.images" :key="imageIndex" class="gallery-item">
              <div class="gallery-image-wrapper" @click="viewImage(image)">
                <div v-if="!image.loaded" class="image-placeholder"></div>
                <img 
                  :src="image.url" 
                  :alt="image.description" 
                  class="gallery-image" 
                  loading="lazy" 
                  @load="imageLoaded(image)"
                  :class="{ 'is-loaded': image.loaded }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 无限滚动加载触发器 -->
      <div v-if="hasMoreImages && hasItems" class="load-more" ref="loadMoreTrigger">
        <div class="loading-spinner"></div>
        <p>{{ $t('gallery.loadMore') }}</p>
      </div>
    </div>
    
    <!-- 使用图片查看器组件 -->
    <image-viewer 
      v-if="activeImage" 
      :selected-image="activeImage" 
      @close="closeViewer" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import ImageViewer from './ImageViewer.vue';

// 导入图片资源
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/00_01.jpg';
import img8 from '../assets/00_02.png';
import img9 from '../assets/00_03.png';
import img10 from '../assets/00_04.png';
import img11 from '../assets/00_05.png';
import img12 from '../assets/00_06.png';

// 图库图片数据
const allImages = [
  { id: 1, url: img1, date: '2024-03-15', title: '樱花盛开的季节' },
  { id: 2, url: img2, date: '2024-03-10', title: '城市的夜景' },
  { id: 3, url: img3, date: '2024-02-28', title: '海边的日落' },
  { id: 4, url: img4, date: '2024-02-20', title: '雪山风光' },
  { id: 5, url: img5, date: '2024-02-15', title: '古镇的小巷' },
  { id: 6, url: img6, date: '2024-02-10', title: '森林中的小径' },
  { id: 7, url: img7, date: '2024-01-25', title: '繁星点点的夜空' },
  { id: 8, url: img8, date: '2024-01-20', title: '雾气缭绕的山谷' },
  { id: 9, url: img9, date: '2024-01-15', title: '湖边的木屋' },
  { id: 10, url: img10, date: '2024-01-10', title: '秋天的公园' },
  { id: 11, url: img11, date: '2023-12-30', title: '冬日里的温暖阳光' },
  { id: 12, url: img12, date: '2023-12-25', title: '圣诞节的装饰' },
];

// 加载状态
const isLoading = ref(true);
const imagesPerPage = 3; // 每次加载的图片数量
const currentPage = ref(1);
const hasMoreImages = computed(() => {
  return galleryImages.value.length < allImages.length;
});
const hasItems = computed(() => galleryImages.value.length > 0);

// 分页加载的图片
const galleryImages = ref([]);

// 按日期分组图片，将相同日期的图片合并到一个组中
const groupedImages = computed(() => {
  const groups = {};
  
  galleryImages.value.forEach(image => {
    if (!groups[image.date]) {
      groups[image.date] = { date: image.date, images: [] };
    }
    groups[image.date].images.push(image);
  });
  
  // 按日期从新到旧排序
  return Object.values(groups).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
});

// 图片查看器相关状态
const activeImage = ref(null);

// 滚动进度百分比
const scrollProgress = ref(0);

// 标记图片为已加载
const imageLoaded = (image) => {
  image.loaded = true;
};

// 加载更多图片
const loadMoreImages = () => {
  const startIndex = (currentPage.value - 1) * imagesPerPage;
  const endIndex = Math.min(startIndex + imagesPerPage, allImages.length);
  
  if (startIndex < allImages.length) {
    // 模拟网络请求延迟
    setTimeout(() => {
      for (let i = startIndex; i < endIndex; i++) {
        const newImage = {...allImages[i], loaded: false};
        galleryImages.value.push(newImage);
      }
      
      currentPage.value++;
      isLoading.value = false;
      
      // 设置无限滚动观察器
      if (galleryImages.value.length < allImages.length) {
        nextTick(() => {
          setupIntersectionObserver();
        });
      }
    }, 800);
  }
};

// 设置加载更多的交叉观察器
let observer = null;
const loadMoreTrigger = ref(null);

const setupIntersectionObserver = () => {
  if (observer) {
    observer.disconnect();
  }
  
  if (loadMoreTrigger.value) {
    observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading.value && hasMoreImages.value) {
        isLoading.value = true;
        loadMoreImages();
      }
    }, { rootMargin: '100px' });
    
    observer.observe(loadMoreTrigger.value);
  }
};

// 更新滚动进度，计算页面滚动的百分比
const updateScrollProgress = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.value = (scrollTop / scrollHeight) * 100;
};

// 查看大图，显示图片查看器
const viewImage = (image) => {
  activeImage.value = image;
  document.body.style.overflow = 'hidden'; // 防止背景滚动
};

// 关闭查看器
const closeViewer = () => {
  activeImage.value = null;
  document.body.style.overflow = ''; // 恢复滚动
};

// 监听窗口大小变化，更新布局
const handleResize = () => {
  // 只响应窗口大小变化，不做虚拟滚动的相关处理
};

// 监听滚动事件，更新进度
onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('resize', handleResize);
  
  // 初始加载第一批图片
  loadMoreImages();
});

// 移除滚动事件监听，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
  window.removeEventListener('resize', handleResize);
  
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
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
  max-width: 900px;
  margin: 0 auto 0 0;
  padding: 20px 0;
  width: 100%;
}

.gallery-container-wrapper {
  width: 100%;
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
  padding-bottom: 75%; /* 长方形比例 */
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
  transition: all 0.5s ease;
  opacity: 0;
  transform: scale(1.05);
}

.gallery-image.is-loaded {
  opacity: 1;
  transform: scale(1);
}

/* 图片占位符 */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  color: var(--text-color);
  opacity: 0.7;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--link-color);
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 加载更多触发器 */
.load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 40px;
  color: var(--text-color);
  opacity: 0.7;
}

/* 响应式布局调整 */
@media (max-width: 768px) {
  .gallery-container {
    flex-direction: column;
  }
  
  .gallery-progress {
    position: fixed;
    top: auto;
    bottom: 20px;
    right: 20px;
    left: auto;
    height: auto;
    width: auto;
    margin-right: 0;
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }
  
  .progress-bar {
    width: 50px;
    height: 4px;
    margin: 0 10px 0 0;
  }
  
  .progress-indicator {
    height: 100%;
    width: var(--progress-width);
  }
  
  .gallery-content {
    max-width: 100%;
    padding: 10px 10px 10px 10px;
    margin: 0 0 0 0;
  }
  
  .gallery-waterfall {
    column-count: 2;
  }
  
  .gallery-image-wrapper {
    padding-bottom: 70%; /* 缩小图片高度比例 */
  }
  
  .gallery-header {
    margin-bottom: 25px;
    padding-left: 10px; /* 为标题添加左侧内边距 */
  }
  
  .gallery-title {
    font-size: 1.8rem;
  }
  
  .date-label {
    padding-left: 10px; /* 为日期标签添加左侧内边距 */
  }
}

/* 平板布局优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .gallery-content {
    max-width: 90%;
    padding: 15px 15px 15px 10px;
    margin: 0;
  }
  
  .gallery-waterfall {
    column-count: 2;
    column-gap: 15px;
  }
  
  .gallery-item {
    margin-bottom: 15px;
  }
  
  .gallery-image-wrapper {
    padding-bottom: 80%; /* 放大图片高度比例 */
  }
  
  .gallery-header {
    padding-left: 10px; /* 为标题添加左侧内边距 */
  }
  
  .date-label {
    padding-left: 10px; /* 为日期标签添加左侧内边距 */
  }
}

/* 优化小屏幕样式 */
@media (max-width: 480px) {
  .gallery-content {
    padding: 10px;
  }
  
  .gallery-title {
    font-size: 1.6rem;
  }
  
  .gallery-subtitle {
    font-size: 0.9rem;
  }
  
  .date-label {
    font-size: 0.9rem;
  }
  
  .gallery-date-group {
    margin-bottom: 25px;
  }
  
  .gallery-image-wrapper {
    padding-bottom: 65%; /* 更小屏幕上进一步缩小图片 */
  }
}
</style> 