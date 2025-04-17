<template>
  <div class="heatmap-demo">
    <h1 class="demo-title">贡献热力图组件演示</h1>
    
    <div class="demo-section">
      <h2 class="section-title">1. 基本用法</h2>
      <div class="demo-container">
        <ContributionHeatmap title="基本热力图展示" />
      </div>
      <div class="code-example">
        <pre><code>&lt;ContributionHeatmap title="基本热力图展示" /&gt;</code></pre>
      </div>
    </div>
    
    <div class="demo-section">
      <h2 class="section-title">2. 自定义数据</h2>
      <div class="demo-container">
        <ContributionHeatmap 
          title="使用自定义贡献数据 (高活跃度)" 
          :contribution-data="customData.high" 
        />
      </div>
      <div class="code-example">
        <pre><code>&lt;ContributionHeatmap 
  title="使用自定义贡献数据" 
  :contribution-data="customData" 
/&gt;</code></pre>
      </div>
    </div>
    
    <div class="demo-section">
      <h2 class="section-title">3. 低活跃度示例</h2>
      <div class="demo-container">
        <ContributionHeatmap 
          title="低活跃度示例" 
          :contribution-data="customData.low" 
        />
      </div>
    </div>
    
    <div class="demo-section">
      <h2 class="section-title">4. 不同年份的数据</h2>
      <p class="section-desc">点击不同年份按钮查看各年数据</p>
      <div class="demo-container">
        <ContributionHeatmap 
          title="多年份贡献数据" 
          :contribution-data="yearlyData" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ContributionHeatmap from '../components/ContributionHeatmap.vue';

// 生成示例数据
function generateCustomData(activityFactor = 0.5) {
  const result = {};
  for (let week = 0; week < 53; week++) {
    result[week] = {};
    for (let day = 0; day < 7; day++) {
      const rand = Math.random();
      if (rand < 0.6 * (1 - activityFactor)) {
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

// 不同活跃度的数据演示
const customData = {
  high: { [new Date().getFullYear()]: generateCustomData(0.8) },
  low: { [new Date().getFullYear()]: generateCustomData(0.2) }
};

// 多年份数据演示
const yearlyData = {
  2024: generateCustomData(0.7),
  2023: generateCustomData(0.5),
  2022: generateCustomData(0.6),
  2021: generateCustomData(0.3),
  2020: generateCustomData(0.4),
  2019: generateCustomData(0.2),
  2018: generateCustomData(0.1)
};
</script>

<style scoped>
.heatmap-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.demo-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--text-color, #24292f);
  text-align: center;
}

.demo-section {
  margin-bottom: 48px;
  border: 1px solid var(--border-color, #d0d7de);
  border-radius: 8px;
  padding: 24px;
  background-color: var(--bg-color-card, #ffffff);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--text-color, #24292f);
}

.section-desc {
  margin-bottom: 16px;
  color: var(--text-color-light, #57606a);
}

.demo-container {
  margin-bottom: 24px;
}

.code-example {
  background-color: var(--bg-code, #f6f8fa);
  border-radius: 6px;
  padding: 16px;
  margin-top: 16px;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
}

.code-example code {
  font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  color: var(--text-color, #24292f);
}

/* 深色模式适配 */
.dark-mode .demo-section {
  background-color: var(--bg-secondary, #1e1e1e);
  border-color: var(--border-color, #383838);
}

.dark-mode .code-example {
  background-color: var(--bg-code, #2a2a2a);
}

.dark-mode .code-example code {
  color: var(--text-color, #e5e5e5);
}
</style> 