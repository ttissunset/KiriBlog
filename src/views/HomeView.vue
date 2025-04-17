<script setup>
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Home.vue";
import ContributionHeatmap from "../components/ContributionHeatmap.vue";

const blogStore = useBlogStore();

// 生成示例贡献数据（在实际应用中，这些数据应该从API获取）
const demoContributionData = {
  2024: generateRandomContributionData(),
  2023: generateRandomContributionData(0.4), // 较少的贡献
  2022: generateRandomContributionData(0.6),
  2021: generateRandomContributionData(0.3),
  2020: generateRandomContributionData(0.7),
  2019: generateRandomContributionData(0.5),
  2018: generateRandomContributionData(0.2),
};

/**
 * 生成随机的贡献数据
 * @param {Number} activityFactor - 活跃因子 (0-1)，值越大表示活跃度越高
 * @returns {Object} - 年度贡献数据
 */
function generateRandomContributionData(activityFactor = 0.5) {
  const result = {};
  for (let week = 0; week < 53; week++) {
    result[week] = {};
    for (let day = 0; day < 7; day++) {
      const rand = Math.random();
      if (rand < 0.6 * (1 - activityFactor)) { // 无贡献概率随活跃度减小
        result[week][day] = 0;
      } else if (rand < 0.8) {
        result[week][day] = 1;
      } else if (rand < 0.9) {
        result[week][day] = 2;
      } else if (rand < 0.97) {
        result[week][day] = 3;
      } else {
        result[week][day] = 4;
      }
    }
  }
  return result;
}
</script>

<template>
  <MainLayout>
    <!-- 人主页容器 -->
    <div class="github-profile">
      <div class="profile-container">
        <!-- 左侧内容区域 - 头像和个人基本信息 -->
        <div class="profile-left">
          <!-- 头像及基本个人信息区域 -->
          <div class="avatar-section">
            <img src="../assets/avatar.jpg" alt="头像" class="avatar-img" />
            <h1 class="profile-name">Kiri</h1>
            <p class="username">苯氨基丙酸</p>
            <div class="bio">自由独立试新茶，沉醉半生</div>
          </div>
        </div>

        <!-- 右侧内容区域 - README和热力图 -->
        <div class="profile-right">
          <!-- README容器 - 与下方热力图同宽 -->
          <div class="readme-container">
            <!-- README主要内容区 -->
            <div class="readme-content">
              <!-- 右侧动漫图片容器 - 绝对定位在右侧 -->
              <div class="anime-container">
                <img
                  src="../assets/l2d.webp"
                  alt="Anime character"
                  class="anime-image"
                />
              </div>

              <h2 class="readme-title">
                Hello <span class="wave-emoji">👋</span>
              </h2>

              <!-- 联系方式 -->
              <div class="contact-badges">
                <a href="mailto:ZyZy1724@gmail.com" class="badge email-badge">
                  <span class="badge-icon">📧</span>
                  <span class="badge-text">kiricamellia@gmail.com</span>
                </a>
                <a href="#" class="badge qq-badge">
                  <span class="badge-icon">🐧</span>
                  <span class="badge-text">2733908676</span>
                </a>
              </div>

              <p class="intro-text">我是 Kiri</p>

              <!-- 个人信息列表 -->
              <ul class="info-list">
                <li class="info-item">
                  <span class="bullet">•</span>
                  <span>一位前端开发者</span>
                </li>
                <li class="info-item">
                  <span class="bullet">•</span>
                  <span>🌱 目前居住在广州</span>
                </li>
                <li class="info-item">
                  <span class="bullet">•</span>
                  <span>💬 如果你有疑问，可以联系我</span>
                  <span class="email-link">273390867@qq.com</span>
                </li>
              </ul>

              <!-- 技术栈部分 -->
              <div class="tech-stack">
                <h3>技术栈</h3>
                <div class="tech-tags">
                  <div class="tech-row">
                    <div class="tech-tag">
                      <span class="badge-icon-small">🔴</span>
                      <span>JavaScript</span>
                    </div>
                    <div class="tech-tag">
                      <span class="badge-icon-small">🔵</span>
                      <span>Vue</span>
                    </div>
                    <div class="tech-tag">
                      <span class="badge-icon-small">🟢</span>
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

              <!-- 语言统计部分 -->
              <div class="readme-section language-section">
                <h3 class="section-heading">Most Used Languages</h3>
                <div class="language-stats">
                  <div class="language-bar">
                    <div
                      class="bar-segment javascript"
                      style="width: 64.8%"
                    ></div>
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
                      <font-awesome-icon
                        :icon="['fas', 'star']"
                        class="stat-icon"
                      />
                      <div class="stat-details">
                        <div class="stat-value">1024</div>
                        <div class="stat-label">Total Stars</div>
                      </div>
                    </div>
                    <div class="stat-item">
                      <font-awesome-icon
                        :icon="['fas', 'code-branch']"
                        class="stat-icon"
                      />
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

              <!-- 友好信息 -->
              <div class="friendly-message">
                <p>
                  I love to make friends, so if you want to say hi, I'll be
                  happy to meet you more! 😊
                </p>
                <p class="from-text">
                  <span class="wave-emoji">👋</span> From
                  <a href="#" class="author-link">Kiri</a>
                </p>
              </div>
            </div>
          </div>

          <!-- 底部热力图部分 - 使用新的组件 -->
          <ContributionHeatmap 
            title="contributions in the last year" 
            :contribution-data="demoContributionData"
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* 整体页面布局样式 */
.github-profile {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 主要内容容器 */
.profile-container {
  display: flex;
  gap: 24px;
  padding-top: 16px;
}

/* 左侧样式 - 固定宽度 */
.profile-left {
  width: 296px;
  flex-shrink: 0;
}

/* 右侧样式 - 自适应宽度 */
.profile-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 头像部分样式 */
.avatar-section {
  margin-bottom: 16px;
  position: relative;
}

.avatar-img {
  width: 296px;
  height: 296px;
  border-radius: 50%;
  border: 1px solid #d0d7de;
  margin-bottom: 16px;
}

.profile-name {
  font-size: 24px;
  line-height: 1.25;
  font-weight: 600;
  color: #24292f;
  margin: 0 0 4px;
}

.username {
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
  color: #57606a;
  margin: 0 0 16px;
}

.bio {
  margin-bottom: 16px;
  color: #24292f;
  font-size: 16px;
  line-height: 1.5;
}

/* 关注者信息样式 */
.follow-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: #57606a;
}

.followers,
.following {
  display: flex;
  align-items: center;
}

.count {
  font-weight: 600;
  color: #24292f;
}

.dot {
  margin: 0 5px;
}

/* 关注按钮样式 */
.follow-button {
  width: 100%;
  text-align: center;
  background-color: #f6f8fa;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  color: #24292f;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 16px;
  cursor: pointer;
  transition: 0.2s;
}

.follow-button:hover {
  background-color: #f3f4f6;
  border-color: rgba(27, 31, 36, 0.15);
}

/* README容器样式 */
.readme-container {
  width: 100%; /* 保证与热力图等宽 */
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
}

/* README内容部分样式 */
.readme-content {
  padding: 16px;
  position: relative;
}

/* 动漫图片容器 */
.anime-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}

.anime-image {
  max-height: 80%;
  max-width: 100%;
  object-fit: contain;
}

/* README标题 */
.readme-title {
  font-size: 24px;
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

/* 联系方式徽章 */
.contact-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #f6f8fa;
  border-radius: 20px;
  font-size: 14px;
  transition: 0.2s;
  text-decoration: none;
  color: #24292f;
}

.badge:hover {
  background-color: #eaeef2;
}

.badge-icon {
  margin-right: 5px;
  font-size: 16px;
}

/* 简介文本 */
.intro-text {
  margin-bottom: 20px;
  font-size: 16px;
  color: #24292f;
  max-width: 60%;
}

/* 信息列表 */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  max-width: 60%;
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
  color: #0969da;
  margin-left: 4px;
}

/* README分段样式 */
.readme-section {
  margin-bottom: 24px;
  max-width: 60%;
}

.section-heading {
  font-size: 18px;
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
  color: #0969da;
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
  font-size: 12px;
  color: #57606a;
}

.label-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
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
  max-width: 60%;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.stats-data {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  font-size: 20px;
  color: #57606a;
}

.stat-details {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-weight: 600;
  font-size: 16px;
  color: #24292e;
}

.stat-label {
  font-size: 12px;
  color: #586069;
}

.github-grade {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grade-circle {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #2da44e;
  color: white;
  font-size: 28px;
  font-weight: 700;
}

/* 友好信息样式 */
.friendly-message {
  border-left: 4px solid #d0d7de;
  padding-left: 16px;
  color: #57606a;
  font-size: 14px;
  margin: 16px 0;
  font-style: italic;
}

.from-text {
  margin-top: 8px;
  font-weight: 500;
}

.author-link {
  color: #0969da;
  text-decoration: none;
  font-weight: 600;
}

.author-link:hover {
  text-decoration: underline;
}

/* 响应式样式 */
@media (max-width: 1100px) {
  .anime-container {
    position: static;
    width: auto;
    height: auto;
    margin-bottom: 16px;
  }

  .anime-image {
    max-width: 300px;
  }

  /* 恢复内容宽度 */
  .readme-title,
  .contact-badges,
  .intro-text,
  .info-list {
    width: 100%;
  }
}

@media (max-width: 768px) {
  /* 更小的屏幕尺寸时调整整体布局 */
  .profile-container {
    flex-direction: column;
  }

  .profile-left {
    width: 100%;
  }

  .avatar-img {
    width: 100%;
    height: auto;
    max-width: 296px;
    margin: 0 auto 16px;
    display: block;
  }
}

/* 技术栈样式调整 */
.tech-stack {
  margin-bottom: 24px;
  /* 限制宽度，确保不超过动漫图片左边缘 */
  width: 60%;
  max-width: 500px;
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
  background-color: var(--button-bg, #f1f8ff);
  border-radius: 12px;
  color: var(--link-color, #0366d6);
  font-size: 12px;
  font-weight: 500;
  flex: 1;
  justify-content: center;
  white-space: nowrap;
}

.badge-icon-small {
  margin-right: 2px;
  font-size: 10px;
}
</style>
