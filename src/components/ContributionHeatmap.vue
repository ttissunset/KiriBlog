<template>
  <div class="contribution-heatmap-section">
    <div class="heatmap-header">
      <h3 class="heatmap-title">{{ calculatedTitle }}</h3>
      <div class="heatmap-buttons">
        <button 
          v-for="year in years" 
          :key="year" 
          class="heatmap-button" 
          :class="{ active: activeYear === year }"
          @click="activeYear = year"
        >
          {{ year }}
        </button>
      </div>
    </div>

    <!-- 贡献热力图 -->
    <div class="heatmap-container">
      <div class="heatmap-months">
        <span v-for="month in months" :key="month">{{ month }}</span>
      </div>
      <div class="heatmap-days">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
      </div>
      <div class="heatmap-grid">
        <div
          v-for="(week, weekIndex) in totalWeeks"
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
</template>

<script setup>
import { ref, computed } from 'vue';

// 组件接收的属性
const props = defineProps({
  title: {
    type: String,
    default: 'Contributions in the last year'
  },
  // 可选的自定义贡献数据
  contributionData: {
    type: Object,
    default: () => ({})
  }
});

// 反应性状态
const activeYear = ref(new Date().getFullYear());
const totalWeeks = ref(53);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 生成可选择的年份列表（当前年份及之前的6年）
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 7 }, (_, i) => currentYear - i);

// 计算当前年份的总贡献数
const totalContributions = computed(() => {
  let total = 0;
  
  // 如果有提供数据，则计算实际贡献数
  if (props.contributionData && props.contributionData[activeYear.value]) {
    const yearData = props.contributionData[activeYear.value];
    
    for (const week in yearData) {
      for (const day in yearData[week]) {
        // 只有level > 0的才算作贡献
        if (yearData[week][day] > 0) {
          total++;
        }
      }
    }
  } else {
    // 如果没有数据，生成一个随机的贡献数 (100-700)
    total = Math.floor(Math.random() * 600) + 100;
  }
  
  return total;
});

// 动态生成标题，包含贡献数量
const calculatedTitle = computed(() => {
  if (props.title.includes('contributions')) {
    return `${totalContributions.value} contributions in the last year`;
  }
  return props.title;
});

/**
 * 获取热力图单元格的CSS类
 * @param {Number} week - 周索引
 * @param {Number} day - 天索引
 * @returns {Object} - CSS类对象
 */
function getCellClass(week, day) {
  // 检查是否有传入的贡献数据
  if (props.contributionData && 
      props.contributionData[activeYear.value] && 
      props.contributionData[activeYear.value][week] && 
      props.contributionData[activeYear.value][week][day] !== undefined) {
    
    const level = props.contributionData[activeYear.value][week][day];
    return { [`level-${level}`]: true };
  }
  
  // 没有数据时使用伪随机分布确定贡献热力等级
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
/* 贡献热力图部分样式 */
.contribution-heatmap-section {
  width: 100%;
  border: 1px solid var(--border-color, #d0d7de);
  border-radius: 6px;
  background-color: var(--bg-primary, #fff);
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
  color: var(--text-color, #24292f);
}

.heatmap-buttons {
  display: flex;
}

.heatmap-button {
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 14px;
  color: var(--text-color-light, #57606a);
  cursor: pointer;
  transition: color var(--transition-speed, 0.3s);
}

.heatmap-button:hover {
  color: var(--text-color, #24292f);
}

.heatmap-button.active {
  font-weight: 600;
  color: var(--primary-color, #24292f);
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
  color: var(--text-color-light, #57606a);
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
  color: var(--text-color-light, #57606a);
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
  background-color: var(--contribution-level-0, #ebedf0); /* 默认颜色 */
  transition: background-color var(--transition-speed, 0.3s);
}

/* 不同等级的贡献显示不同深浅的绿色 */
.heatmap-cell.level-0 {
  background-color: var(--contribution-level-0, #ebedf0);
}

.heatmap-cell.level-1 {
  background-color: var(--contribution-level-1, #9be9a8);
}

.heatmap-cell.level-2 {
  background-color: var(--contribution-level-2, #40c463);
}

.heatmap-cell.level-3 {
  background-color: var(--contribution-level-3, #30a14e);
}

.heatmap-cell.level-4 {
  background-color: var(--contribution-level-4, #216e39);
}

/* 热力图图例 */
.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-color-light, #57606a);
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
  background-color: var(--contribution-level-0, #ebedf0);
}

.legend-cell.level-1 {
  background-color: var(--contribution-level-1, #9be9a8);
}

.legend-cell.level-2 {
  background-color: var(--contribution-level-2, #40c463);
}

.legend-cell.level-3 {
  background-color: var(--contribution-level-3, #30a14e);
}

.legend-cell.level-4 {
  background-color: var(--contribution-level-4, #216e39);
}

/* 深色模式适配 - 移除冗余覆盖，因为我们已经使用了 CSS 变量 */
.dark-mode .contribution-heatmap-section {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 响应式样式 */
@media (max-width: 768px) {
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
</style> 