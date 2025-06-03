<template>
  <div :class="['loading-container', { 'loading-full': full }]">
    <img src="@/assets/loading.gif" alt="正在赶来的路上..." class="loading-gif" :style="full ? { width: 'min(128px, 30vw)', height: 'min(128px, 30vw)' } : { width: typeof width === 'number' ? width + 'px' : width, height: typeof height === 'number' ? height + 'px' : height }" />
    <div class="loading-text">
      <span v-for="(char, i) in textArr" :key="i" class="jump-char" :style="{ animationDelay: (i * 0.08) + 's' }">{{ char }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  width: {
    type: [String, Number],
    default: 64
  },
  height: {
    type: [String, Number],
    default: 64
  },
  full: {
    type: Boolean,
    default: false
  }
});

const text = '正在赶来的路上...';
const textArr = computed(() => text.split(''));
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 120px;
}
.loading-gif {
  margin-bottom: 12px;
}
.loading-text {
  color: #888;
  font-size: 1.1rem;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.jump-char {
  display: inline-block;
  animation: jump 1.2s infinite;
}
@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-8px);
  }
  40% {
    transform: translateY(0);
  }
}
.loading-full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: unset;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
}
</style> 