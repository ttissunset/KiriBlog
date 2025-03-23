<template>
  <Teleport to="body">
    <transition
      name="toast-slide"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div 
        v-if="visible" 
        class="toast-container" 
        :class="type"
        ref="toastRef"
      >
        <div class="toast-content">
          <div class="toast-icon" v-if="showIcon">
            <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div class="toast-body">
            <div class="toast-title" v-if="title">{{ title }}</div>
            <div class="toast-message">{{ message }}</div>
          </div>
          <div class="toast-close" @click="close" v-if="showClose">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div class="toast-progress-container" v-if="showProgress && duration > 0">
          <div 
            class="toast-progress-bar" 
            :style="{ width: `${progressWidth}%` }"
          ></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000 // 默认3秒，设为0则不自动关闭
  },
  visible: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showProgress: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);
const toastRef = ref(null);
const progressWidth = ref(100);
let startTime = null;
let animationFrameId = null;

// 动画函数
const animate = (timestamp) => {
  if (!startTime) startTime = timestamp;
  const progress = timestamp - startTime;
  const percent = Math.max(0, 100 - (progress / props.duration) * 100);
  
  progressWidth.value = percent;
  console.log(`Progress: ${progress}ms, Width: ${progressWidth.value}%`); // 调试信息
  
  if (progress < props.duration) {
    animationFrameId = requestAnimationFrame(animate);
  } else {
    close();
  }
};

// 关闭通知
const close = () => {
  emit('close');
};

// 过渡钩子
const onBeforeLeave = (el) => {
  // 记录原始高度用于平滑过渡
  el.style.height = `${el.offsetHeight}px`;
};

const onAfterLeave = () => {
  // 过渡结束后的清理工作
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

// 监听visible变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    startTime = null;
    progressWidth.value = 100;
    if (props.duration > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }
  } else {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
}, { immediate: true });

// 组件卸载时清除计时器
onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// 演示Toast
onMounted(() => {
  // 为了测试目的，在控制台输出组件挂载信息
  console.log('Toast组件已挂载，配置:', props);
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 16px;
  right: 16px;
  min-width: 400px;
  max-width: 550px;
  background-color: white;
  color: #606266;
  font-size: 14px;
  padding: 0;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}

.toast-content {
  display: flex;
  padding: 14px 14px;
  align-items: flex-start;
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-body {
  flex: 1;
  overflow: hidden;
}

.toast-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.4;
  word-break: break-word;
}

.toast-message {
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.toast-close {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-left: 12px;
  cursor: pointer;
  opacity: 0.6;
  color: #909399;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.toast-close:hover {
  opacity: 1;
}

.toast-progress-container {
  height: 5px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.toast-progress-bar {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  transition: width 0.05s linear;
  will-change: width;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  animation: progress-bar-stripes 2s linear infinite;
}

@keyframes progress-bar-stripes {
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}

/* 主题样式 */
.success {
  background-color: #f0f9eb;
  border-left: 4px solid #67c23a;
}

.success .toast-icon {
  color: #67c23a;
}

.success .toast-progress-bar {
  background-color: #42d392; /* 鲜艳的绿色 */
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); /* 条纹效果 */
  background-size: 40px 40px; /* 条纹大小 */
}

.error {
  background-color: #fef0f0;
  border-left: 4px solid #f56c6c;
}

.error .toast-icon {
  color: #f56c6c;
}

.error .toast-progress-bar {
  background-color: #ff5555; /* 鲜艳的红色 */
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}

.warning {
  background-color: #fdf6ec;
  border-left: 4px solid #e6a23c;
}

.warning .toast-icon {
  color: #e6a23c;
}

.warning .toast-progress-bar {
  background-color: #ffbb00; /* 鲜艳的黄色 */
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}

.info {
  background-color: #f4f4f5;
  border-left: 4px solid #909399;
}

.info .toast-icon {
  color: #909399;
}

.info .toast-progress-bar {
  background-color: #44a4ff; /* 鲜艳的蓝色 */
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}

/* 过渡动画 */
.toast-slide-enter-active {
  animation: toast-in-right 0.3s;
}

.toast-slide-leave-active {
  animation: toast-out 0.3s;
  animation-fill-mode: forwards;
}

@keyframes toast-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-out {
  0% {
    transform: translateX(0);
    opacity: 1;
    max-height: 300px;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
    max-height: 0;
    margin: 0;
  }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .toast-container {
    background-color: #1d1e1f;
    color: #e0e0e0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  }
  
  .success {
    background-color: rgba(103, 194, 58, 0.1);
  }
  
  .error {
    background-color: rgba(245, 108, 108, 0.1);
  }
  
  .warning {
    background-color: rgba(230, 162, 60, 0.1);
  }
  
  .info {
    background-color: rgba(144, 147, 153, 0.1);
  }
  
  .toast-close {
    color: #a0a0a0;
  }
}
</style>
  