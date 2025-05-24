<template>
  <div class="gallery-container">
    <!-- 左侧进度滑轨 -->
    <div class="gallery-progress">
      <div class="progress-bar">
        <div
          class="progress-indicator"
          :style="{ height: scrollProgress + '%' }"
        ></div>
      </div>
      <div class="progress-text">{{ Math.round(scrollProgress) }}%</div>
    </div>

    <div class="gallery-content">
      <div class="gallery-header">
        <h1 class="gallery-title">我的图库</h1>
        <p class="gallery-subtitle">记录生活中的美好瞬间</p>
      </div>

      <!-- 加载状态指示器 -->
      <div v-if="isLoading && !hasItems" class="loading-container">
        <div class="loading-spinner"></div>
        <p>正在加载图片...</p>
      </div>

      <!-- 相册内容，不使用虚拟滚动 -->
      <div class="gallery-container-wrapper">
        <div
          v-for="group in groupedImages"
          :key="group.date"
          class="gallery-date-group"
        >
          <div class="date-label">
            <span>{{ group.date }}</span>
          </div>
          <div class="gallery-waterfall" id="pointer">
            <template
              v-for="(image, imageIndex) in group.images"
              :key="imageIndex"
            >
              <template v-if="Array.isArray(image.url)">
                <div
                  v-for="(imgSrc, idx) in image.url"
                  :key="imageIndex + '-' + idx"
                  class="gallery-item"
                >
                  <div class="gallery-image-wrapper" @click="viewImage(image)">
                    <div v-if="!image.loaded" class="image-placeholder"></div>
                    <img
                      :src="imgSrc"
                      :alt="image.description"
                      class="gallery-image"
                      loading="lazy"
                      @load="imageLoaded(image)"
                      :class="{ 'is-loaded': image.loaded }"
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="gallery-item">
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
              </template>
            </template>
          </div>
        </div>
      </div>

      <!-- 无限滚动加载触发器 -->
      <div
        v-if="hasMoreImages && hasItems"
        class="load-more"
        ref="loadMoreTrigger"
      >
        <div class="loading-spinner"></div>
        <p>加载更多</p>
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
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import ImageViewer from "../components/ImageViewer.vue";

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
    url: [img1, img2, img3],
    date: "2024-03-15",
  },
  { id: 2, url: img4, date: "2024-02-20" },
  { id: 3, url: img5, date: "2024-02-15" },
  { id: 4, url: img6, date: "2024-02-10" },
  { id: 5, url: img7, date: "2024-01-25" },
  { id: 6, url: img8, date: "2024-01-20" },
  { id: 7, url: img9, date: "2024-01-15" },
  { id: 8, url: img10, date: "2024-01-10" },
  { id: 9, url: img11, date: "2023-12-30" },
  { id: 10, url: img12, date: "2023-12-25" },
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
    // 模拟网络请求延迟
    setTimeout(() => {
      for (let i = startIndex; i < endIndex; i++) {
        const newImage = { ...allImages[i], loaded: false };
        galleryImages.value.push(newImage);
      }

      currentPage.value++;
      isLoading.value = false;

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
        if (entry.isIntersecting && !isLoading.value && hasMoreImages.value) {
          isLoading.value = true;
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
const viewImage = (image) => {
  activeImage.value = image;
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
  content: "";
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
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 1px;
  background-color: var(--dark);
}

.gallery-waterfall {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.gallery-item {
  width: calc((100% - 24px) / 3); /* 三列，间隔2*12px */
  margin-bottom: 12px;
  box-sizing: border-box;
}

.gallery-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-8);
  box-shadow: var(--shadow-1);
  transform: translateZ(0);
  transition: all var(--transition-1);
  background-color: var(--cultured);
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.gallery-image-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2);
}

.gallery-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all var(--transition-2);
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
  background: linear-gradient(
    110deg,
    var(--cultured) 8%,
    var(--light-white) 18%,
    var(--cultured) 33%
  );
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
  color: var(--dark);
  opacity: 0.7;
}

.loading-spinner {
  width: 150px;
  height: 150px;
  background: url("@/assets/loading.gif") no-repeat center center;
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
  margin-bottom: 40px;
  color: var(--dark);
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
    background-color: var(--light-white);
    padding: 5px 10px;
    border-radius: var(--radius-20);
    box-shadow: var(--shadow-3);
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
    padding-bottom: 70%;
  }

  .gallery-header {
    margin-bottom: 25px;
    padding-left: 10px;
  }

  .gallery-title {
    font-size: var(--fs-20);
  }

  .date-label {
    padding-left: 10px;
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
    padding-bottom: 80%;
  }

  .gallery-header {
    padding-left: 10px;
  }

  .date-label {
    padding-left: 10px;
  }
}

/* 优化小屏幕样式 */
@media (max-width: 480px) {
  .gallery-content {
    padding: 10px;
  }

  .gallery-title {
    font-size: var(--fs-18);
  }

  .gallery-subtitle {
    font-size: var(--fs-14);
  }

  .date-label {
    font-size: var(--fs-14);
  }

  .gallery-date-group {
    margin-bottom: 25px;
  }

  .gallery-image-wrapper {
    padding-bottom: 65%;
  }
}
</style>
