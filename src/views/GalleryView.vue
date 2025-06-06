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
        <h1 class="gallery-title">我的图库</h1>
        <p class="gallery-subtitle">记录生活中的美好瞬间</p>
      </div>

      <!-- 加载状态指示器 -->
      <Loading v-if="isInitialLoading && !hasItems" full />

      <!-- 相册内容，不使用虚拟滚动 -->
      <div class="gallery-container-wrapper">
        <div v-for="group in groupedImages" :key="group.date" class="gallery-date-group">
          <div class="date-label">
            <span>{{ group.date }}</span>
          </div>
          <div class="gallery-waterfall">
            <template v-for="(image, imageIndex) in group.images" :key="imageIndex">
              <div v-for="(imgSrc, idx) in image.url" :key="imageIndex + '-' + idx" class="gallery-item">
                <div class="gallery-image-wrapper" @click="viewImage(image, idx)" id="pointer">
                  <div v-if="!image.loaded" class="image-placeholder"></div>
                  <img :src="imgSrc" :alt="image.description" class="gallery-image" loading="lazy" @load="imageLoaded(image)" :class="{ 'is-loaded': image.loaded }" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 无限滚动加载触发器 -->
      <div v-if="hasMoreImages && hasItems && !isInitialLoading" class="load-more" ref="loadMoreTrigger">
        <Loading v-if="isLoadingMore" :width="40" :height="40" />
      </div>
    </div>

    <!-- 使用图片查看器组件 -->
    <image-viewer v-if="activeImage" :selected-image="activeImage" @close="closeViewer" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import ImageViewer from "../components/ImageViewer.vue";
import Loading from "../components/Loading.vue";

// 导入图片资源
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/00_01.jpg";
import img8 from "../assets/00_02.png";
import img9 from "../assets/00_03.png";
import img10 from "../assets/00_04.png";
import img11 from "../assets/00_05.png";
import img12 from "../assets/00_06.png";

// 图库图片数据
const allImages = [
  {
    id: 1,
    url: [img1, img2, img3, img1, img2, img3, img1],
    date: "2024-03-15",
  },
  {
    id: 2,
    url: [img4],
    date: "2024-02-20"
  },
  {
    id: 3,
    url: [img5],
    date: "2024-02-15"
  },
  {
    id: 4,
    url: [img6],
    date: "2024-02-10"
  },
  {
    id: 5,
    url: [img7],
    date: "2024-01-25"
  },
  {
    id: 6,
    url: [img8],
    date: "2024-01-20"
  },
  {
    id: 7,
    url: [img9],
    date: "2024-01-15"
  },
  {
    id: 8,
    url: [img10],
    date: "2024-01-10"
  },
  {
    id: 9,
    url: [img11],
    date: "2023-12-30"
  },
  {
    id: 10,
    url: [img12],
    date: "2023-12-25"
  },
];

// 加载状态
const isInitialLoading = ref(true); // 初始加载状态
const isLoadingMore = ref(false); // 加载更多状态
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

  galleryImages.value.forEach((image) => {
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
    if (!isInitialLoading.value) {
      isLoadingMore.value = true;
    }

    // 模拟网络请求延迟
    setTimeout(() => {
      for (let i = startIndex; i < endIndex; i++) {
        const newImage = { ...allImages[i], loaded: false };
        galleryImages.value.push(newImage);
      }

      currentPage.value++;

      if (isInitialLoading.value) {
        isInitialLoading.value = false;
      } else {
        isLoadingMore.value = false;
      }

      // 设置无限滚动观察器
      if (galleryImages.value.length < allImages.length) {
        nextTick(() => {
          setupIntersectionObserver();
          // 更新滚动进度
          updateScrollProgress();
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
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingMore.value && !isInitialLoading.value && hasMoreImages.value) {
          loadMoreImages();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreTrigger.value);
  }
};

// 更新滚动进度，计算页面滚动的百分比
const updateScrollProgress = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  scrollProgress.value = (scrollTop / scrollHeight) * 100;
};

// 查看大图，显示图片查看器
const viewImage = (image, currentIndex) => {
  // 使用当前点击的图片索引
  const previewImage = {
    ...image,
    url: Array.isArray(image.url) ? image.url[currentIndex] : image.url,
    description: image.description || "这是一张精美的照片，捕捉了瞬间的美好。"
  };
  activeImage.value = previewImage;
  document.body.style.overflow = "hidden"; // 防止背景滚动
};

// 关闭查看器
const closeViewer = () => {
  activeImage.value = null;
  document.body.style.overflow = ""; // 恢复滚动
};

// 监听滚动事件，更新进度
onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress);

  // 初始加载第一批图片
  loadMoreImages();
});

// 移除滚动事件监听，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);

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
  min-height: 100vh;
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
  flex-shrink: 0;
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

.gallery-content {
  flex: 1;
  margin: 0 auto 0 0;
  padding: 20px 0;
  width: 100%;
  position: relative;
}

.gallery-container-wrapper {
  width: 100%;
}

.gallery-header {
  margin-bottom: 40px;
}

.gallery-title {
  font-size: var(--fs-24);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 8px;
}

.gallery-subtitle {
  font-size: var(--fs-16);
  color: var(--dark);
  opacity: 0.7;
}

.gallery-date-group {
  margin-bottom: 40px;
}

.date-label {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: var(--fs-16);
  color: var(--dark);
}

.date-icon::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 3px;
  right: 3px;
  height: 2px;
  border-top: 1px solid var(--dark);
  border-left: 1px solid var(--dark);
  border-right: 1px solid var(--dark);
  border-radius: var(--radius-6) var(--radius-6) 0 0;
}

.date-icon::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 1px;
  background-color: var(--dark);
}

.gallery-waterfall {
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  gap: 20px;
  width: 100%;
  justify-content: start;
}

.gallery-item {
  width: 280px;
  height: 210px;
  max-width: 280px;
  max-height: 210px;
}

.gallery-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: var(--cultured);
  width: 100%;
  height: 100%;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image-wrapper:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px) scale(1.02);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s;
  display: block;
}

.gallery-image.is-loaded {
  opacity: 1;
}

/* 图片占位符 */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    110deg,
    var(--cultured) 8%,
    var(--light-white) 18%,
    var(--cultured) 33%
  );
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  border-radius: 10px;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

/* 加载状态 */
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  color: var(--dark);
  opacity: 0.7;
  width: 100%;
  z-index: 1;
}

.loading-spinner {
  width: 150px;
  height: 150px;
  background: url('@/assets/loading.gif') no-repeat center center;
  background-size: contain;
  margin-bottom: 10px;
  display: block;
}

/* 加载更多触发器 */
.load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  margin: 40px 0;
  color: var(--dark);
  opacity: 0.7;
  width: 100%;
  position: relative;
  min-height: 80px;
}
</style>
