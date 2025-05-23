<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "../utils";

const visitor = "https://api.likepoems.com/counter/get/@kiriBlog";
const visitorImg = new Image();
visitorImg.src = visitor;

// 背景图数组
const backgroundImages = [
  "https://kirii.online/20250514-003324.jpeg",
  "https://kirii.online/20250520-232650.webp",
  "https://kirii.online/20250514-214947.webp",
  "https://kirii.online/20250514-210152.jpg",
  "https://kirii.online/20250514-205217.png",
  "https://kirii.online/20250514-205211.png",
  "https://kirii.online/20250514-205124.png",
  "https://kirii.online/20250514-205120.png",
  "https://kirii.online/20250514-205017.png",
  "https://kirii.online/20250514-205111.png",
  "https://kirii.online/20250514-003320.jpeg",
  "https://kirii.online/20250514-003317.jpeg",
  "https://kirii.online/20250514-003315.jpeg",
  "https://kirii.online/20250514-003311.jpeg",
  "https://kirii.online/20250514-001113.jpg",
  "https://kirii.online/20250514-001112.jpg",
  "https://kirii.online/20250521-210953.webp",
  "https://kirii.online/20250521-211301.webp",
  "https://kirii.online/20250521-211146.webp",
  "https://kirii.online/20250521-211142.webp",
  "https://kirii.online/20250521-211134.webp",
  "https://kirii.online/20250521-211128.webp",
  "https://kirii.online/20250521-211113.webp",
  "https://kirii.online/20250521-211610.webp",
  "https://kirii.online/20250521-211603.webp",
  "https://kirii.online/20250521-211541.webp",
  "https://kirii.online/20250521-211536.webp",
  "https://kirii.online/20250521-211528.webp",
  "https://kirii.online/20250521-211358.webp",
  "https://kirii.online/20250522-102546.webp",
  "https://kirii.online/20250522-102533.webp",
  "https://kirii.online/20250522-102527.webp",
  "https://kirii.online/20250522-102522.webp",
  "https://kirii.online/20250522-102514.webp",
  "https://kirii.online/20250522-102505.webp",
  "https://kirii.online/20250521-225616.webp",
  "https://kirii.online/20250521-211610.webp",
  "https://kirii.online/20250522-105253.webp",
  "https://kirii.online/20250522-105237.webp",
  "https://kirii.online/20250522-105233.webp",
  "https://kirii.online/20250522-105228.webp",
  "https://kirii.online/20250522-105222.webp",
  "https://kirii.online/20250522-105733.webp",
  "https://kirii.online/20250522-105758.webp",
  "https://kirii.online/bLDm3.webp",
  "https://kirii.online/65f927e1b1b63.jpg",
];

const currentBgIndex = ref(0);
const backgroundImageContainer = ref(null);
const preloadedImages = ref(new Set());

// 预加载图片
const preloadImage = (url) => {
  if (preloadedImages.value.has(url)) return;

  const img = new Image();
  img.src = url;
  img.onload = () => {
    preloadedImages.value.add(url);
  };
};

// 预加载所有图片
const preloadAllImages = () => {
  backgroundImages.forEach((url) => preloadImage(url));
};

// 随机切换背景图
const changeBackground = debounce(() => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * backgroundImages.length);
  } while (newIndex === currentBgIndex.value);

  if (backgroundImageContainer.value) {
    const newImage = backgroundImages[newIndex];
    // 确保新图片已预加载
    if (!preloadedImages.value.has(newImage)) {
      preloadImage(newImage);
    }

    // 添加切换动画类
    backgroundImageContainer.value.classList.add("changing");

    // 等待动画完成后再切换图片
    setTimeout(() => {
      backgroundImageContainer.value.style.backgroundImage = `linear-gradient(
        to right,
        var(--light-white) 0%,
        rgba(255, 255, 255, 0.8) 5%,
        rgba(255, 255, 255, 0) 20%
      ),
      url('${newImage}')`;

      // 移除旧动画类并添加新动画类
      backgroundImageContainer.value.classList.remove("changing");
      currentBgIndex.value = newIndex;
    }, 400);
  }
}, 300);

onMounted(() => {
  // 预加载所有图片
  preloadAllImages();
});
</script>

<template>
  <div class="home-view">
    <!-- 第一页 -->
    <section class="page page-one">
      <div class="gradient-overlay"></div>
      <div class="background-image-container" ref="backgroundImageContainer">
        <div class="refresh-button-container">
          <button class="refresh-button" @click="changeBackground">
            <span class="material-icons-sharp">refresh</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 第二页 -->
    <section class="page page-two" id="page-two">
      <div class="horizontal-content">
        <div class="left-content">
          <!-- 个人简介卡片 -->
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">
                <img src="../assets/avatar.jpg" alt="Kiri" />
              </div>
              <div class="profile-info">
                <h2 class="profile-name">Kiri</h2>
                <p class="profile-title">前端开发工程师</p>
              </div>
            </div>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">3+</span>
                <span class="stat-label">年工作经验</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">50+</span>
                <span class="stat-label">项目经验</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">100+</span>
                <span class="stat-label">技术文章</span>
              </div>
            </div>
          </div>

          <!-- 访问量 -->
          <div class="visitor-counter">
            <img :src="visitorImg.src" alt="name" />
          </div>

          <!-- 社交媒体 -->
          <div class="social-section">
            <h3 class="section-heading">社交媒体</h3>
            <div class="social-grid">
              <a href="#" class="social-item">
                <span class="material-icons-sharp">code</span>
                <span>GitHub</span>
              </a>
              <a href="#" class="social-item">
                <span class="material-icons-sharp">chat</span>
                <span>微信</span>
              </a>
            </div>
          </div>

          <!-- 技术栈展示 -->
          <div class="readme-section tech-showcase">
            <h3 class="section-heading">技术栈</h3>
            <div class="tech-grid">
              <div class="tech-item">
                <div class="tech-icon">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                    alt="Vue.js"
                  />
                </div>
                <div class="tech-info">
                  <h4>Vue.js</h4>
                  <p>前端框架</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                    alt="Node.js"
                  />
                </div>
                <div class="tech-info">
                  <h4>Node.js</h4>
                  <p>后端开发</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="middle-content"></div>

        <div class="right-content">
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  color: var(--dark);
  overflow: hidden;
}

/* 页面通用样式 */
.page {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
}

/* 第一页样式 */
.page-one {
  background-color: var(--light-white);
  position: relative;
}

/* 渐变覆盖层 */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    var(--light-white) 0%,
    rgba(255, 255, 255, 0.98) 2%,
    rgba(255, 255, 255, 0.95) 5%,
    rgba(255, 255, 255, 0.9) 8%,
    rgba(255, 255, 255, 0.85) 12%,
    rgba(255, 255, 255, 0.75) 18%,
    rgba(255, 255, 255, 0.6) 25%,
    rgba(255, 255, 255, 0.4) 35%,
    rgba(255, 255, 255, 0.2) 45%,
    rgba(255, 255, 255, 0) 55%
  );
  z-index: 2;
  pointer-events: none;
}

/* 背景图容器 */
.background-image-container {
  width: 100%;
  height: 100%;
  background-image: url("https://kirii.online/20250514-003324.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  animation: initialZoom 1.5s ease-out;
  z-index: 1;
}

@keyframes initialZoom {
  0% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.background-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 100% 版
  );
  opacity: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
}

.background-image-container:hover::before {
  opacity: 1;
}

/* 添加图片切换动画 */
@keyframes slideIn {
  0% {
    transform: translateX(100%) scale(1.2);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%) scale(0.8);
    opacity: 0;
  }
}

.background-image-container.changing {
  animation: slideOut 0.4s ease-out forwards;
}

/* 第二页样式 */
.page-two {
  background-color: var(--cultured);
  padding: 0;
}

.horizontal-content {
  display: flex;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
}

.left-content,
.middle-content,
.right-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  max-height: 100%;
}

/* 刷新按钮样式 */
.refresh-button-container {
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
}

.refresh-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--light-white);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
}

.refresh-button .material-icons-sharp {
  font-size: 24px;
  color: var(--blue-crayola);
  transition-duration: 0.3s;
}

.refresh-button:hover {
  width: 120px;
  border-radius: 50px;
  transition-duration: 0.3s;
  align-items: center;
}

.refresh-button:hover .material-icons-sharp {
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.refresh-button::before {
  position: absolute;
  bottom: -20px;
  font-family: var(--ff-llt);
  content: '"换个口味吧~"';
  color: var(--blue-crayola);
  font-size: 0px;
}

.refresh-button:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  transition-duration: 0.3s;
}

/* 其他样式保持不变 */
.readme-title {
  font-size: var(--fs-24);
  color: #24292f;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.wave-emoji {
  animation: wave 1.5s infinite;
  display: inline-block;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.intro-text {
  margin-bottom: 20px;
  font-size: var(--fs-16);
  color: #24292f;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}

.info-item {
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  color: #24292f;
}

.bullet {
  margin-right: 8px;
  color: #57606a;
}

.email-link {
  color: var(--blue-crayola);
  margin-left: 4px;
}

.readme-section {
  margin-bottom: 24px;
}

.section-heading {
  font-size: var(--fs-18);
  color: #24292f;
  margin-bottom: 16px;
  border-bottom: 1px solid #d0d7de;
  padding-bottom: 8px;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.about-link {
  color: var(--blue-crayola);
  text-decoration: none;
}

.about-link:hover {
  text-decoration: underline;
}

.language-section {
  margin-bottom: 32px;
}

.language-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.language-bar {
  height: 8px;
  background-color: #eaeef2;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
}

.bar-segment {
  height: 100%;
}

.bar-segment.javascript {
  background-color: #f7df1e;
}

.bar-segment.css {
  background-color: #563d7c;
}

.bar-segment.html {
  background-color: #e34c26;
}

.language-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.language-label {
  display: flex;
  align-items: center;
  font-size: var(--fs-12);
  color: #57606a;
}

.label-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-circle);
  margin-right: 4px;
}

.language-label.javascript .label-dot {
  background-color: #f7df1e;
}

.language-label.css .label-dot {
  background-color: #563d7c;
}

.language-label.html .label-dot {
  background-color: #e34c26;
}

.github-stats {
  margin-bottom: 24px;
}

.stats-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 12px;
}

.stats-data {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  font-size: var(--fs-20);
  color: #57606a;
}

.stat-details {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-weight: var(--fw-600);
  font-size: var(--fs-16);
  color: #24292e;
}

.stat-label {
  font-size: var(--fs-12);
  color: #586069;
}

.github-grade {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.grade-circle {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-circle);
  background-color: #2da44e;
  color: var(--light-white);
  font-size: 28px;
  font-weight: var(--fw-700);
}

.anime-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.anime-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.friendly-message {
  border-left: 4px solid #d0d7de;
  padding-left: 16px;
  color: #57606a;
  font-size: var(--fs-14);
  margin: 16px 0;
  font-style: italic;
}

.from-text {
  margin-top: 8px;
  font-weight: var(--fw-500);
}

.author-link {
  color: var(--blue-crayola);
  text-decoration: none;
  font-weight: var(--fw-600);
}

.author-link:hover {
  text-decoration: underline;
}

.tech-stack {
  margin-bottom: 24px;
}

.tech-tags {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tech-row {
  display: flex;
  gap: 8px;
}

.tech-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--youth-blue-3);
  border-radius: var(--radius-10);
  color: var(--blue-crayola);
  font-size: var(--fs-12);
  font-weight: var(--fw-500);
  flex: 1;
  justify-content: center;
  white-space: nowrap;
}

.badge-icon-small {
  margin-right: 2px;
  font-size: 10px;
}

.js-icon {
  background-color: #f7df1e;
  color: #000;
  padding: 2px 4px;
  border-radius: 4px;
}

.vue-icon {
  background-color: #42b883;
  color: #fff;
  padding: 2px 4px;
  border-radius: 4px;
}

.node-icon {
  background-color: #68a063;
  color: #fff;
  padding: 2px 4px;
  border-radius: 4px;
}

/* 技能进度条样式 */
.skills-section {
  margin-bottom: 32px;
}

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: var(--fs-14);
  color: var(--dark);
}

.skill-percentage {
  font-size: var(--fs-12);
  color: var(--blue-crayola);
}

.skill-bar {
  height: 6px;
  background-color: var(--cultured);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: var(--blue-crayola);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 项目展示样式 */
.projects-section {
  margin-bottom: 32px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.project-card {
  background-color: var(--light-white);
  border-radius: var(--radius-8);
  padding: 16px;
  box-shadow: var(--shadow-1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-icon {
  width: 40px;
  height: 40px;
  background-color: var(--youth-blue-3);
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.project-icon .material-icons-sharp {
  color: var(--blue-crayola);
  font-size: 20px;
}

.project-title {
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 8px;
}

.project-desc {
  font-size: var(--fs-12);
  color: var(--dark);
  opacity: 0.7;
  margin-bottom: 12px;
}

.project-tags {
  display: flex;
  gap: 8px;
}

.project-tag {
  font-size: var(--fs-10);
  color: var(--blue-crayola);
  background-color: var(--youth-blue-3);
  padding: 2px 8px;
  border-radius: var(--radius-4);
}

/* 社交媒体样式 */
.social-section {
  margin-bottom: 32px;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: var(--light-white);
  border-radius: var(--radius-8);
  text-decoration: none;
  color: var(--dark);
  transition: all 0.3s ease;
}

.social-item:hover {
  background-color: var(--youth-blue-3);
  color: var(--blue-crayola);
  transform: translateY(-2px);
}

.social-item .material-icons-sharp {
  font-size: 20px;
}

/* 时间线样式 */
.timeline-section {
  margin-bottom: 32px;
}

.timeline {
  position: relative;
  padding-left: 24px;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--youth-blue-3);
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-dot {
  position: absolute;
  left: -29px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--blue-crayola);
  border: 2px solid var(--light-white);
}

.timeline-content {
  background-color: var(--light-white);
  padding: 16px;
  border-radius: var(--radius-8);
  box-shadow: var(--shadow-1);
}

.timeline-date {
  font-size: var(--fs-12);
  color: var(--blue-crayola);
  margin-bottom: 8px;
}

.timeline-title {
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 4px;
}

.timeline-company {
  font-size: var(--fs-14);
  color: var(--dark);
  opacity: 0.7;
  margin-bottom: 8px;
}

.timeline-desc {
  font-size: var(--fs-12);
  color: var(--dark);
  opacity: 0.8;
  line-height: 1.5;
}

/* 技术栈展示样式 */
.tech-showcase {
  margin-bottom: 32px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--light-white);
  border-radius: var(--radius-8);
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-4px);
}

.tech-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.tech-info h4 {
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 4px;
}

.tech-info p {
  font-size: var(--fs-12);
  color: var(--dark);
  opacity: 0.7;
}

/* 成就展示样式 */
.achievements {
  margin-bottom: 32px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.achievement-card {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: var(--light-white);
  border-radius: var(--radius-8);
  transition: transform 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-4px);
}

.achievement-icon {
  width: 40px;
  height: 40px;
  background-color: var(--youth-blue-3);
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-icon .material-icons-sharp {
  color: var(--blue-crayola);
  font-size: 20px;
}

.achievement-content h4 {
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 4px;
}

.achievement-content p {
  font-size: var(--fs-12);
  color: var(--dark);
  opacity: 0.7;
  line-height: 1.5;
}

/* 个人简介卡片样式 */
.profile-card {
  background-color: var(--light-white);
  border-radius: var(--radius-12);
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-circle);
  overflow: hidden;
  border: 3px solid var(--blue-crayola);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: var(--fs-24);
  font-weight: var(--fw-600);
  color: var(--dark);
  margin-bottom: 4px;
}

.profile-title {
  font-size: var(--fs-14);
  color: var(--dark);
  opacity: 0.7;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--cultured);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: var(--fs-20);
  font-weight: var(--fw-600);
  color: var(--blue-crayola);
  margin-bottom: 4px;
}

.stat-label {
  font-size: var(--fs-12);
  color: var(--dark);
  opacity: 0.7;
}

.visitor-counter img {
  width: 100%;
  margin-bottom: 32px;
}
</style>
