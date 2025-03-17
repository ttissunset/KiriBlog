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
        <h1 class="gallery-title">相册</h1>
        <p class="gallery-subtitle">每一个精彩的瞬间，都值得被记录</p>
      </div>
      
      <div v-for="(group, index) in groupedImages" :key="index" class="gallery-date-group">
        <div class="date-label">
          <div class="date-icon"></div>
          <span>{{ group.date }}</span>
        </div>
        <div class="gallery-waterfall">
          <div v-for="(image, imageIndex) in group.images" :key="imageIndex" class="gallery-item">
            <div class="gallery-image-wrapper" @click="viewImage(image)">
              <img :src="image.url" :alt="image.description" class="gallery-image" loading="lazy" />
            </div>
          </div>
        </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ImageViewer from './ImageViewer.vue';

// 图库图片数据 - 在实际应用中应从API获取
const galleryImages = ref([
  {
    url: 'https://images.unsplash.com/photo-1610278764398-42e5729659a4?ixlib=rb-4.0.3',
    description: '樱花树',
    source: 'Unsplash',
    date: '2025/3/2'
  },
  {
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3',
    description: '日本城市风光',
    source: 'Unsplash',
    date: '2025/3/2'
  },
  {
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3',
    description: '春日庭院',
    source: 'Unsplash',
    date: '2025/2/26'
  },
  {
    url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3',
    description: '夏日海滩',
    source: 'Unsplash',
    date: '2025/2/15'
  },
  {
    url: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.0.3',
    description: '秋日公园',
    source: 'Unsplash',
    date: '2025/2/15'
  },
  {
    url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3',
    description: '冬日雪景',
    source: 'Unsplash',
    date: '2025/2/15'
  },
  {
    url: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3',
    description: '古城一角',
    source: 'Unsplash',
    date: '2025/2/14'
  },
  {
    url: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-4.0.3',
    description: '星空夜景',
    source: 'Unsplash',
    date: '2025/2/14'
  },
  {
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3',
    description: '郁金香花田',
    source: 'Unsplash',
    date: '2025/2/14'
  }
]);

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

// 监听滚动事件，更新进度
onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // 初始化进度
});

// 移除滚动事件监听，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
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
  
  .gallery-waterfall {
    column-count: 1;
  }
}
</style> 