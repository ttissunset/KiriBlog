<script setup>
import { useBlogStore } from "../stores/blogStore";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { debounce } from "../utils";

const blogStore = useBlogStore();
const router = useRouter();
const route = useRoute();

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
  "https://kirii.online/20250521-211358.webp"
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
  backgroundImages.forEach(url => preloadImage(url));
};

// 随机切换背景图
const changeBackground = debounce(() => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * backgroundImages.length);
  } while (newIndex === currentBgIndex.value);
  
  currentBgIndex.value = newIndex;
  if (backgroundImageContainer.value) {
    const newImage = backgroundImages[newIndex];
    // 确保新图片已预加载
    if (!preloadedImages.value.has(newImage)) {
      preloadImage(newImage);
    }
    
    backgroundImageContainer.value.style.backgroundImage = `linear-gradient(
      to right,
      var(--light-white) 0%,
      rgba(255, 255, 255, 0.8) 5%,
      rgba(255, 255, 255, 0) 20%
    ),
    url('${newImage}')`;
  }
}, 300); // 300ms 的防抖延迟

onMounted(() => {
  // 预加载所有图片
  preloadAllImages();
});
</script>

<template>
  <div class="home-view">
    <!-- 第一页：个人信息 + 背景图 -->
    <section class="page page-one">
      <div class="page-content">
        <!-- 左侧1/4：个人信息 -->
        <div class="profile-info">
          <!-- 头像及基本个人信息区域 -->
          <div class="avatar-section">
            <img src="../assets/avatar.jpg" alt="头像" class="avatar-img" />
            <h1 class="profile-name">Kiri</h1>
            <p class="username">苯氨基丙酸</p>
            <div class="bio">“自由独立试新茶，沉醉半生”</div>
          </div>

          <!-- 向下滚动提示 -->
          <div class="scroll-hint">
            <span>向下滚动查看更多</span>
            <div class="scroll-arrow">
              <span class="material-icons-sharp">expand_more</span>
            </div>
          </div>
        </div>

        <!-- 右侧3/4：背景图 -->
        <div class="background-image-container" ref="backgroundImageContainer">
          <div class="refresh-button-container">
            <button class="refresh-button" @click="changeBackground">
              <span class="material-icons-sharp">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 第二页：README内容横向排布 -->
    <section class="page page-two">
      <div class="horizontal-content">
        <!-- 左侧：个人介绍和技术栈 -->
        <div class="left-content">
          <h2 class="readme-title">
            Hello
            <span class="wave-emoji">
              <span class="material-icons-sharp">waving_hand</span>
            </span>
          </h2>

          <p class="intro-text">我是 Kiri</p>

          <!-- 个人信息列表 -->
          <ul class="info-list">
            <li class="info-item">
              <span class="bullet">•</span>
              <span>一位前端开发者</span>
            </li>
            <li class="info-item">
              <span class="bullet">•</span>
              <span>
                <span class="material-icons-sharp">grass</span> 目前居住在广州
              </span>
            </li>
            <li class="info-item">
              <span class="bullet">•</span>
              <span>
                <span class="material-icons-sharp">chat</span>
                如果你有疑问，可以联系我
              </span>
              <span class="email-link">273390867@qq.com</span>
            </li>
          </ul>

          <!-- 技术栈部分 -->
          <div class="tech-stack">
            <h3>技术栈</h3>
            <div class="tech-tags">
              <div class="tech-row">
                <div class="tech-tag">
                  <span class="badge-icon-small js-icon">JS</span>
                  <span>JavaScript</span>
                </div>
                <div class="tech-tag">
                  <span class="badge-icon-small vue-icon">Vue</span>
                  <span>Vue</span>
                </div>
                <div class="tech-tag">
                  <span class="badge-icon-small node-icon">Node</span>
                  <span>Node.js</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 关于我部分 -->
          <div class="readme-section">
            <h3 class="section-heading">关于我</h3>
            <ul class="about-list">
              <li class="about-item">
                <span class="bullet">•</span>
                <a href="https://github.com/ttissunset" class="about-link"
                  >我的github</a
                >
              </li>
              <li class="about-item">
                <span class="bullet">•</span>
                <a href="#" class="about-link">简历</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 中间：技术统计和GitHub统计 -->
        <div class="middle-content">
          <!-- 语言统计部分 -->
          <div class="readme-section language-section">
            <h3 class="section-heading">Most Used Languages</h3>
            <div class="language-stats">
              <div class="language-bar">
                <div class="bar-segment javascript" style="width: 64.8%"></div>
                <div class="bar-segment css" style="width: 13.99%"></div>
                <div class="bar-segment html" style="width: 21.21%"></div>
              </div>
              <div class="language-labels">
                <div class="language-label javascript">
                  <span class="label-dot"></span>
                  <span>JavaScript 64.80%</span>
                </div>
                <div class="language-label css">
                  <span class="label-dot"></span>
                  <span>CSS 13.99%</span>
                </div>
                <div class="language-label html">
                  <span class="label-dot"></span>
                  <span>HTML 21.21%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- GitHub统计部分 -->
          <div class="github-stats">
            <h3>GitHub 统计</h3>
            <div class="stats-container">
              <div class="stats-data">
                <div class="stat-item">
                  <span class="material-icons-sharp">star</span>
                  <div class="stat-details">
                    <div class="stat-value">1024</div>
                    <div class="stat-label">Total Stars</div>
                  </div>
                </div>
                <div class="stat-item">
                  <span class="material-icons-sharp">fork_right</span>
                  <div class="stat-details">
                    <div class="stat-value">512</div>
                    <div class="stat-label">Commits (2023)</div>
                  </div>
                </div>
              </div>
              <div class="github-grade">
                <div class="grade-circle">C</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：动漫图片和友好信息 -->
        <div class="right-content">
          <!-- 动漫图片容器 -->
          <div class="anime-container">
            <img
              src="../assets/l2d.webp"
              alt="Anime character"
              class="anime-image"
            />
          </div>

          <!-- 友好信息 -->
          <div class="friendly-message">
            <p>
              I love to make friends, so if you want to say hi, I'll be happy to
              meet you more! 😊
            </p>
            <p class="from-text">
              <span class="wave-emoji">
                <span class="material-icons-sharp">waving_hand</span>
              </span>
              From
              <a href="#" class="author-link">Kiri</a>
            </p>
          </div>
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
}

.page-content {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* 左侧信息区域 - 占1/4宽度 */
.profile-info {
  width: 25%;
  height: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background-color: var(--light-white);
  z-index: 10;
  position: relative;
  border-right: none;
}

/* 右侧背景图 - 占3/4宽度 */
.background-image-container {
  width: 75%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      var(--light-white) 0%,
      rgba(255, 255, 255, 0.8) 5%,
      rgba(255, 255, 255, 0) 20%
    ),
    url("https://kirii.online/20250514-003324.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  margin-left: -1px;
  transition: background-image 0.5s ease;
}

/* 头像部分样式 */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-img {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-circle);
  border: 1px solid #d0d7de;
  margin-bottom: 16px;
  object-fit: cover;
}

.profile-name {
  font-size: var(--fs-24);
  line-height: 1.25;
  font-weight: var(--fw-600);
  color: #24292f;
  margin: 0 0 4px;
}

.username {
  font-size: var(--fs-20);
  font-weight: 300;
  line-height: 24px;
  color: #57606a;
  margin: 0 0 16px;
}

.bio {
  margin-bottom: 16px;
  color: #24292f;
  font-size: var(--fs-16);
  line-height: 1.5;
  font-style: italic;
  border-left: 3px solid #e0e0e0;
  padding-left: 16px;
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #57606a;
  font-size: var(--fs-14);
}

.scroll-arrow {
  margin-top: 10px;
  animation: fadeDown 1.8s infinite;
}

@keyframes fadeDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
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

/* 基础样式调整 */
.contact-badges {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #f6f8fa;
  border-radius: 20px;
  font-size: var(--fs-14);
  transition: 0.2s;
  text-decoration: none;
  color: #24292f;
}

.badge:hover {
  background-color: #eaeef2;
}

.badge-icon {
  margin-right: 5px;
  font-size: var(--fs-16);
}

/* README标题 */
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

/* 简介文本 */
.intro-text {
  margin-bottom: 20px;
  font-size: var(--fs-16);
  color: #24292f;
}

/* 信息列表 */
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

/* README分段样式 */
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

/* 关于列表样式 */
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

/* 语言统计样式 */
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

/* GitHub统计样式 */
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

/* 动漫图片容器 */
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

/* 友好信息样式 */
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

/* 技术栈样式调整 */
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

/* 技术栈图标样式 */
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

/* 响应式样式 */
@media (max-width: 1100px) {
  .horizontal-content {
    flex-direction: column;
    overflow-y: auto;
  }

  .left-content,
  .middle-content,
  .right-content {
    width: 100%;
    max-height: none;
    overflow: visible;
  }

  .page {
    height: auto;
    min-height: 100vh;
  }
}

@media (max-width: 768px) {
  .page-content {
    flex-direction: column;
  }

  .profile-info {
    width: 100%;
    height: auto;
    min-height: 50vh;
  }

  .background-image-container {
    width: 100%;
    height: 50vh;
  }
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
  cursor: pointer;
  color: var(--blue-crayola);
  transition-duration: 0.3s;
}

.refresh-text {
  position: absolute;
  bottom: -20px;
  color: var(--blue-crayola);
  font-size: 13px;
  opacity: 0;
  transition-duration: 0.3s;
}

.refresh-button:hover {
  width: 120px;
  border-radius: 50px;
  transition-duration: 0.3s;
  align-items: center;
  background-color: var(--youth-blue-2);
}

.refresh-button:hover .material-icons-sharp {
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.refresh-button::before {
  position: absolute;
  bottom: -20px;
  content: "“换个口味”";
  color: var(--blue-crayola);
  /* transition-duration: .3s; */
  font-size: 0px;
}

.refresh-button:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  transition-duration: 0.3s;
}
</style>
