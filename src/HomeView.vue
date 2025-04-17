<template>
  <MainLayout>
    <!-- Background animation -->
    <div class="background-animation">
      <div v-for="i in 30" :key="i" class="particle" :style="particleStyles[i-1]"></div>
      <div class="gradient-overlay"></div>
    </div>
    
    <!-- 人主页容器 -->
    // ... existing code ...
    
    <!-- Blog section with ref -->
    <div class="blog-section" ref="blogSection">
      // ... existing blog content ...
    </div>
    
    <!-- Scroll indicator -->
    <div class="scroll-indicator" v-if="showScrollIndicator" @click="scrollToBlog"></div>
  </MainLayout>
</template>

<style scoped>
/* Background animation */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(var(--background-rgb), 0.7) 70%, rgba(var(--background-rgb), 1) 100%);
  z-index: 1;
  animation: pulse-subtle 10s infinite alternate;
}

@keyframes pulse-subtle {
  0% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  animation: float 20s infinite ease-in-out;
  z-index: 0;
  box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.3);
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    filter: hue-rotate(0deg);
  }
  20% {
    transform: translate(20px, -30px) rotate(50deg) scale(1.1);
    filter: hue-rotate(20deg);
  }
  40% {
    transform: translate(-30px, 40px) rotate(120deg) scale(0.9);
    filter: hue-rotate(40deg);
  }
  60% {
    transform: translate(40px, 30px) rotate(200deg) scale(1.05);
    filter: hue-rotate(60deg);
  }
  80% {
    transform: translate(-20px, -40px) rotate(280deg) scale(0.95);
    filter: hue-rotate(30deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
    filter: hue-rotate(0deg);
  }
}

/* 个人信息区域样式 */
.profile-container {
  margin-bottom: 20px;
  animation: fadeIn 0.8s ease-out;
  position: relative;
  overflow: hidden;
}

.profile-container::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: shine 6s infinite linear;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-container:hover::after {
  opacity: 1;
}

@keyframes shine {
  0% {
    transform: rotate(30deg) translateX(-200%);
  }
  100% {
    transform: rotate(30deg) translateX(200%);
  }
}

.avatar-container {
  margin-bottom: 10px;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.avatar-container:hover {
  transform: scale(1.08) rotate(3deg);
}

.avatar-container::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  z-index: -1;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s ease;
}

.avatar-container:hover::before {
  opacity: 1;
  transform: scale(1.05);
  animation: spin 10s linear infinite;
}

@keyframes spin {
  from {
    transform: scale(1.05) rotate(0deg);
  }
  to {
    transform: scale(1.05) rotate(360deg);
  }
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avatar:hover {
  border-color: var(--accent-color);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15), 0 0 20px rgba(var(--primary-rgb), 0.5);
  filter: brightness(1.05);
}

.username {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  animation: slideUp 0.5s ease-out 0.2s both;
  position: relative;
  display: inline-block;
}

.username::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  transition: width 0.4s ease;
}

.username:hover::after {
  width: 100%;
}

.bio {
  color: var(--text-color-secondary);
  margin-bottom: 15px;
  line-height: 1.5;
  animation: slideUp 0.5s ease-out 0.4s both;
  transition: all 0.3s ease;
}

.bio:hover {
  color: var(--text-color);
  transform: translateX(5px);
}

/* README 内容区域样式 */
.readme-container {
  background-color: var(--card-background);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.readme-container:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 0 15px rgba(var(--primary-rgb), 0.2);
}

.readme-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--primary-color) 0%, 
    var(--accent-color) 50%, 
    var(--secondary-color) 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s ease;
}

.readme-container:hover::before {
  transform: scaleX(1);
  animation: shimmer 2s infinite linear;
  background-size: 200% 100%;
  background-image: linear-gradient(
    to right,
    var(--primary-color) 0%,
    var(--accent-color) 25%,
    var(--secondary-color) 50%,
    var(--accent-color) 75%,
    var(--primary-color) 100%
  );
}

.blog-section {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.6s;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  perspective: 1000px; /* Add perspective for 3D effects */
}

.blog-item {
  background-color: var(--card-background);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transform-style: preserve-3d; /* Enable 3D transformations */
  backface-visibility: hidden; /* Prevent element flipping */
  animation: cardEntrance 0.8s ease-out backwards;
  animation-delay: calc(0.1s * var(--i, 0));
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.8) rotateY(10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotateY(0);
  }
}

.blog-item:hover {
  transform: translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.03);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(var(--primary-rgb), 0.3);
}

.blog-item::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(215deg, var(--primary-color), var(--accent-color), transparent);
  border-radius: 16px;
  z-index: -2;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.6s ease;
}

.blog-item:hover::before {
  opacity: 0.4;
  transform: scale(1);
}

.blog-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, 
    rgba(var(--primary-rgb), 0) 60%, 
    rgba(var(--primary-rgb), 0.08) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.blog-item:hover::after {
  opacity: 1;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--primary-text);
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.blog-item:hover .blog-title {
  color: var(--accent-color);
  transform: translateZ(10px); /* 3D effect on hover */
}

.blog-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

.blog-item:hover .blog-title::after {
  transform: scaleX(1);
  transform-origin: left;
}

.blog-date {
  font-size: 0.85rem;
  color: var(--secondary-text);
  margin-bottom: 12px;
  display: block;
  transition: transform 0.3s ease;
}

.blog-item:hover .blog-date {
  transform: translateZ(5px); /* Subtle 3D effect */
}

.blog-excerpt {
  color: var(--secondary-text);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  position: relative;
}

.blog-item:hover .blog-excerpt {
  color: var(--text-color);
}

.read-more {
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6px 10px;
  border-radius: 20px;
  transition: all 0.3s ease;
  background-color: rgba(var(--accent-rgb), 0.1);
}

.read-more::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--accent-rgb), 0.15);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  z-index: -1;
  border-radius: 20px;
}

.read-more:hover {
  box-shadow: 0 5px 15px rgba(var(--accent-rgb), 0.2);
  transform: translateY(-3px);
}

.read-more:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.read-more span {
  display: inline-block;
  transition: all 0.3s ease;
  position: relative;
}

.read-more:hover span {
  transform: translateX(3px);
  color: var(--accent-color);
}

/* 贡献热图样式 */
.heatmap-container {
  margin-bottom: 20px;
  animation: fadeIn 0.8s ease-out 0.8s both;
}

/* 添加动画关键帧 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    filter: blur(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* 新增：滚动指示器动画 */
.scroll-indicator {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  opacity: 0.7;
  transition: all 0.3s ease;
  z-index: 100;
  animation: fadeInUp 1s ease-out 2s forwards, bounce 2s infinite;
  cursor: pointer;
}

.scroll-indicator:hover {
  opacity: 1;
  transform: translateX(-50%) scale(1.1);
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.5);
}

.scroll-indicator::before {
  content: '';
  width: 6px;
  height: 12px;
  background-color: var(--primary-color);
  border-radius: 3px;
  position: absolute;
  top: 8px;
  animation: scrollDown 2s infinite;
  transition: background-color 0.3s ease;
}

.scroll-indicator:hover::before {
  background-color: var(--accent-color);
}

@keyframes scrollDown {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(20px);
    opacity: 0.2;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 0.7;
    transform: translate(-50%, 0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, -10px);
  }
  60% {
    transform: translate(-50%, -5px);
  }
}

/* 整体页面布局样式 */
// ... existing code ...
</style>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Home.vue";
import ContributionHeatmap from "../components/ContributionHeatmap.vue";

const blogStore = useBlogStore();

// 粒子样式数组
const particleStyles = ref([]);
const showScrollIndicator = ref(true);
const blogSection = ref(null);

// 在组件挂载后初始化粒子样式
onMounted(() => {
  // 生成随机粒子样式
  for (let i = 0; i < 30; i++) {
    const size = Math.random() * 40 + 10; // 10px 到 50px
    const x = Math.random() * 100; // 0% 到 100%
    const y = Math.random() * 100; // 0% 到 100%
    const delay = Math.random() * 5; // 0s 到 5s
    const duration = Math.random() * 10 + 15; // 15s 到 25s
    const blur = Math.random() * 5 + 1; // 1px 到 6px
    const opacity = Math.random() * 0.3 + 0.1; // 0.1 到 0.4
    
    // 随机选择颜色
    const colors = [
      'rgba(var(--primary-rgb), ' + opacity + ')',
      'rgba(var(--accent-rgb), ' + opacity + ')',
      'rgba(var(--secondary-rgb), ' + opacity + ')'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particleStyles.value.push({
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      filter: `blur(${blur}px)`,
      opacity: opacity,
      backgroundColor: color,
      borderRadius: Math.random() > 0.7 ? '50%' : `${Math.random() * 40 + 10}%`
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  // Remove scroll event listener
  window.removeEventListener('scroll', handleScroll);
});

// Handle scroll events
const handleScroll = () => {
  if (window.scrollY > 200) {
    showScrollIndicator.value = false;
  } else {
    showScrollIndicator.value = true;
  }
};

// Scroll to blog section
const scrollToBlog = () => {
  if (blogSection.value) {
    blogSection.value.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// 生成示例贡献数据（在实际应用中，这些数据应该从API获取）
// ... existing code ...
</script> 