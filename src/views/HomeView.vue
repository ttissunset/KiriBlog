<template>
  <MainLayout>
    <!-- 整体GitHub风格的个人主页容器 -->
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

            <!-- 关注信息 -->
            <div class="follow-section">
              <div class="followers">
                <span class="count">3</span> followers
              </div>
              <div class="dot">·</div>
              <div class="following">
                <span class="count">0</span> following
              </div>
            </div>

            <!-- 关注按钮 -->
            <button class="follow-button">Follow</button>
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
                      class="bar-segment typescript"
                      style="width: 64.8%"
                    ></div>
                    <div class="bar-segment css" style="width: 13.99%"></div>
                    <div class="bar-segment html" style="width: 21.21%"></div>
                  </div>
                  <div class="language-labels">
                    <div class="language-label typescript">
                      <span class="label-dot"></span>
                      <span>TypeScript 64.80%</span>
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
                      <font-awesome-icon :icon="['fas', 'star']" class="stat-icon" />
                      <div class="stat-details">
                        <div class="stat-value">1024</div>
                        <div class="stat-label">Total Stars</div>
                      </div>
                    </div>
                    <div class="stat-item">
                      <font-awesome-icon :icon="['fas', 'code-branch']" class="stat-icon" />
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
                  <a href="#" class="author-link">ZaiHua</a>
                </p>
              </div>
            </div>
          </div>

          <!-- 底部热力图部分 - 与上方README同宽 -->
          <div class="contribution-heatmap-section">
            <div class="heatmap-header">
              <h3 class="heatmap-title">567 contributions in the last year</h3>
              <div class="heatmap-buttons">
                <button class="heatmap-button active">2024</button>
                <button class="heatmap-button">2023</button>
                <button class="heatmap-button">2022</button>
                <button class="heatmap-button">2021</button>
                <button class="heatmap-button">2020</button>
                <button class="heatmap-button">2019</button>
                <button class="heatmap-button">2018</button>
              </div>
            </div>

            <!-- 贡献热力图 -->
            <div class="heatmap-container">
              <div class="heatmap-months">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
              <div class="heatmap-days">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div class="heatmap-grid">
                <!-- 热力图格子将使用v-for动态生成 -->
                <div
                  v-for="(week, weekIndex) in 53"
                  :key="`week-${weekIndex}`"
                  class="heatmap-column"
                >
                  <div
                    v-for="(day, dayIndex) in 7"
                    :key="`day-${dayIndex}`"
                    class="heatmap-cell"
                    :class="getCellClass(weekIndex, dayIndex)"
                  ></div>
                </div>
              </div>
              <div class="heatmap-legend">
                <div class="legend-text">Less</div>
                <div class="legend-cells">
                  <div class="legend-cell level-0"></div>
                  <div class="legend-cell level-1"></div>
                  <div class="legend-cell level-2"></div>
                  <div class="legend-cell level-3"></div>
                  <div class="legend-cell level-4"></div>
                </div>
                <div class="legend-text">More</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { useBlogStore } from "../stores/blogStore";
import MainLayout from "../layouts/Header.vue";

const blogStore = useBlogStore();

/**
 * 获取热力图单元格的CSS类
 * @param {Number} week - 周索引
 * @param {Number} day - 天索引
 * @returns {Object} - CSS类对象
 */
function getCellClass(week, day) {
  // 使用伪随机分布确定贡献热力等级
  // 在真实应用中，这里应该根据实际贡献数据来确定
  const seed = (week * 7 + day) % 17; // 使用质数作为模数，增加随机感
  const chance = seed / 17;

  // 根据不同概率分配不同等级
  if (chance < 0.6) return { "level-0": true }; // 60%概率无贡献
  if (chance < 0.8) return { "level-1": true }; // 20%概率低贡献
  if (chance < 0.9) return { "level-2": true }; // 10%概率中贡献
  if (chance < 0.97) return { "level-3": true }; // 7%概率高贡献
  return { "level-4": true }; // 3%概率特高贡献
}
</script>

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

/* .file-path {
  padding: 8px 16px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  color: #57606a;
  font-size: 14px;
  font-weight: 500;
} */

.readme-content {
  padding: 24px;
  position: relative; /* 为绝对定位的图片提供定位上下文 */
}

.readme-title {
  font-size: 24px;
  margin: 0 0 10px;
  font-weight: 600;
  color: #24292f;
  display: flex;
  align-items: center;
  gap: 8px;
  /* 确保标题不会被图片覆盖 */
  width: 60%;
}

.wave-emoji {
  display: inline-block;
  color: #f1c40f;
}

/* 动漫图片容器样式 - 绝对定位在右侧 */
.anime-container {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 300px;
  z-index: 1;
}

.anime-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* 联系方式徽章样式 */
.contact-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  /* 确保不会被图片覆盖 */
  width: 60%;
  border-top: 1px solid #cecece;
  padding-top: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-decoration: none;
  color: #fff;
}

.email-badge {
  background-color: #b31217;
}

.qq-badge {
  background-color: #ea7e00;
}

.badge-icon {
  margin-right: 4px;
}

/* 介绍文本样式 */
.intro-text {
  font-size: 16px;
  margin: 16px 0;
  font-weight: 500;
  color: #24292f;
  /* 确保不会被图片覆盖 */
  width: 60%;
}

/* 信息列表样式 */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  /* 确保不会被图片覆盖 */
  width: 60%;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 8px;
  font-size: 14px;
  color: #24292f;
}

.bullet {
  display: inline-block;
  margin-right: 0;
}

.email-link {
  color: #0969da;
  text-decoration: none;
  margin-left: 4px;
}

.email-link:hover {
  text-decoration: underline;
}

/* 章节样式 */
.readme-section {
  margin-bottom: 24px;
  /* 确保不会被图片覆盖 - 技术栈和关于我部分需要在图片下方 */
  width: 100%;
}

.section-heading {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #24292f;
  display: flex;
  align-items: center;
  gap: 6px;
}

.heading-icon {
  font-size: 18px;
}

/* 技术列表样式 */
.tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-item {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #2d333b;
  color: #fff;
}

.badge-icon-small {
  margin-right: 4px;
  font-size: 10px;
}

/* 关于我列表样式 */
.about-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  gap: 8px;
}

.about-link {
  color: #0969da;
  text-decoration: none;
  font-size: 14px;
}

.about-link:hover {
  text-decoration: underline;
}

/* 语言统计样式 */
.language-section {
  padding: 16px;
  background-color: #1e1e2e;
  border-radius: 6px;
  color: #fff;
}

.language-section .section-heading {
  color: #e6edf3;
}

.language-stats {
  margin-top: 16px;
}

.language-bar {
  height: 8px;
  border-radius: 4px;
  background-color: #2d333b;
  overflow: hidden;
  display: flex;
}

.bar-segment {
  height: 100%;
}

.bar-segment.typescript {
  background-color: #3178c6;
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
  margin-top: 8px;
}

.language-label {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.label-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

.language-label.typescript .label-dot {
  background-color: #3178c6;
}

.language-label.css .label-dot {
  background-color: #563d7c;
}

.language-label.html .label-dot {
  background-color: #e34c26;
}

/* GitHub统计样式 */
.github-stats {
  padding: 16px;
  background-color: #1e1e2e;
  border-radius: 6px;
  color: #fff;
}

.github-stats .section-heading {
  color: #e6edf3;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.stats-data {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  font-size: 20px;
  color: #0366d6;
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

/* 贡献热力图部分样式 - 与README同宽 */
.contribution-heatmap-section {
  width: 100%;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #fff;
  padding: 16px;
}

/* 热力图标题区域 */
.heatmap-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
}

.heatmap-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #24292f;
}

.heatmap-buttons {
  display: flex;
}

.heatmap-button {
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 14px;
  color: #57606a;
  cursor: pointer;
}

.heatmap-button:hover {
  color: #24292f;
}

.heatmap-button.active {
  font-weight: 600;
  color: #24292f;
}

/* 热力图容器 */
.heatmap-container {
  position: relative;
  padding: 16px 0;
  overflow-x: auto; /* 允许横向滚动 */
  width: 100%;
}

/* 月份标签 */
.heatmap-months {
  display: flex;
  margin-left: 30px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #57606a;
  width: calc(100% - 30px); /* 减去左边距 */
}

.heatmap-months span {
  width: calc((100% - 4px) / 12); /* 平均分配宽度给12个月份 */
  text-align: center;
  flex: none; /* 不使用flex布局的自动分配 */
}

/* 星期标签 */
.heatmap-days {
  position: absolute;
  left: 0;
  top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  font-size: 12px;
  color: #57606a;
  z-index: 2; /* 确保在网格上方 */
}

/* 热力图网格 */
.heatmap-grid {
  display: flex;
  gap: 2px;
  margin-left: 30px;
  width: calc(100% - 30px); /* 减去左边距 */
}

.heatmap-column {
  width: calc((100% - 106px) / 53); /* 平均分配宽度给53周，考虑到2px的间隙 */
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: none; /* 不使用flex布局的自动分配 */
}

/* 热力图单元格 */
.heatmap-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: #ebedf0; /* 默认颜色 */
}

/* 不同等级的贡献显示不同深浅的绿色 */
.heatmap-cell.level-0 {
  background-color: #ebedf0;
}

.heatmap-cell.level-1 {
  background-color: #9be9a8;
}

.heatmap-cell.level-2 {
  background-color: #40c463;
}

.heatmap-cell.level-3 {
  background-color: #30a14e;
}

.heatmap-cell.level-4 {
  background-color: #216e39;
}

/* 热力图图例 */
.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 8px;
  font-size: 12px;
  color: #57606a;
}

.legend-text {
  margin: 0 4px;
}

.legend-cells {
  display: flex;
  gap: 2px;
}

.legend-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

/* 图例单元格颜色 */
.legend-cell.level-0 {
  background-color: #ebedf0;
}

.legend-cell.level-1 {
  background-color: #9be9a8;
}

.legend-cell.level-2 {
  background-color: #40c463;
}

.legend-cell.level-3 {
  background-color: #30a14e;
}

.legend-cell.level-4 {
  background-color: #216e39;
}

/* 活动概览部分 */
.activity-overview {
  margin-top: 32px;
  border-top: 1px solid #d0d7de;
  padding-top: 16px;
}

.activity-header {
  margin-bottom: 16px;
}

.activity-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #24292f;
}

/* 活动图表 */
.activity-chart {
  display: flex;
  height: 150px;
  margin-bottom: 24px;
  position: relative;
}

.chart-y-axis {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #57606a;
}

.y-center {
  display: flex;
  align-items: center;
  height: 40px;
}

.chart-graph {
  flex: 1;
  position: relative;
  border-left: 1px solid #d0d7de;
  border-bottom: 1px solid #d0d7de;
}

.chart-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #d0d7de;
}

.chart-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: #2da44e;
  border-radius: 50%;
}

.chart-x-axis {
  position: absolute;
  bottom: -20px;
  right: 10px;
  font-size: 12px;
  color: #57606a;
}

/* 贡献信息 */
.contributions-info {
  margin-top: 16px;
}

.contribution-text {
  font-size: 14px;
  color: #24292f;
  line-height: 1.5;
}

.contribution-icon {
  margin-right: 4px;
}

.contribution-link {
  color: #0969da;
  text-decoration: none;
}

.contribution-link:hover {
  text-decoration: underline;
}

/* 贡献活动部分 */
.contribution-activity {
  margin-top: 32px;
  border-top: 1px solid #d0d7de;
  padding-top: 16px;
}

.activity-month {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
  color: #24292f;
}

.activity-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: #24292f;
}

.activity-icon {
  margin-right: 8px;
}

.activity-count {
  flex: 1;
}

.activity-date {
  color: #57606a;
}

/* 显示更多按钮 */
.show-more-button {
  width: 100%;
  padding: 8px;
  text-align: center;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  color: #0969da;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.show-more-button:hover {
  background-color: #f3f4f6;
}

/* 响应式布局 */
@media (max-width: 960px) {
  /* 屏幕变窄时调整图片位置 */
  .anime-container {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
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

  /* 简化热力图显示 */
  .heatmap-grid {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .contribution-heatmap-section {
    margin-top: 20px;
  }
  
  .heatmap-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .heatmap-buttons {
    overflow-x: auto;
    width: 100%;
    padding-bottom: 5px;
    justify-content: flex-start;
    gap: 5px;
  }
  
  .heatmap-container {
    padding-bottom: 0;
  }
  
  .heatmap-legend {
    justify-content: flex-start;
    margin-left: 30px;
    padding-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .heatmap-months span {
    font-size: 10px;
  }
  
  .heatmap-days {
    font-size: 10px;
  }
  
  .heatmap-cell {
    width: 8px;
    height: 8px;
  }
  
  .legend-cell {
    width: 8px;
    height: 8px;
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
