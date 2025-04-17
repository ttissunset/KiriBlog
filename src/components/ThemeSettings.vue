<template>
  <div class="theme-settings">
    <!-- 设置按钮 -->
    <button class="theme-settings-button" @click="toggleSettings">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" height="18" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>

    <!-- 设置面板 -->
    <div class="theme-settings-panel" v-if="isOpen">
      <div class="panel-header">
        <h3>主题设置</h3>
        <button class="close-button" @click="toggleSettings">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="panel-section">
        <h4>主题模式</h4>
        <div class="theme-mode-options">
          <button 
            class="mode-option" 
            :class="{ active: themeStore.themeMode === 'light' }" 
            @click="themeStore.setThemeMode('light')"
          >
            <span class="mode-icon light-icon">☀️</span>
            <span>浅色</span>
          </button>
          <button 
            class="mode-option" 
            :class="{ active: themeStore.themeMode === 'dark' }" 
            @click="themeStore.setThemeMode('dark')"
          >
            <span class="mode-icon dark-icon">🌙</span>
            <span>深色</span>
          </button>
          <button 
            class="mode-option" 
            :class="{ active: themeStore.themeMode === 'system' }" 
            @click="themeStore.setThemeMode('system')"
          >
            <span class="mode-icon system-icon">💻</span>
            <span>跟随系统</span>
          </button>
        </div>
      </div>

      <div class="panel-section">
        <h4>主题颜色</h4>
        <div class="color-options">
          <button 
            class="color-option" 
            :class="{ active: themeStore.themeColor === 'blue' }" 
            @click="themeStore.setThemeColor('blue')"
            style="background-color: #2196f3;"
          ></button>
          <button 
            class="color-option" 
            :class="{ active: themeStore.themeColor === 'green' }" 
            @click="themeStore.setThemeColor('green')"
            style="background-color: #4caf50;"
          ></button>
          <button 
            class="color-option" 
            :class="{ active: themeStore.themeColor === 'orange' }" 
            @click="themeStore.setThemeColor('orange')"
            style="background-color: #ff9800;"
          ></button>
          <button 
            class="color-option" 
            :class="{ active: themeStore.themeColor === 'purple' }" 
            @click="themeStore.setThemeColor('purple')"
            style="background-color: #9c27b0;"
          ></button>
          <button 
            class="color-option" 
            :class="{ active: themeStore.themeColor === 'red' }" 
            @click="themeStore.setThemeColor('red')"
            style="background-color: #f44336;"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useThemeStore } from '../stores/themeStore';

// 获取主题状态
const themeStore = useThemeStore();

// 面板开关状态
const isOpen = ref(false);

// 切换设置面板
const toggleSettings = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style>
.theme-settings {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-settings-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color, #2196f3);
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.theme-settings-button:hover {
  background-color: var(--primary-color-dark, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

.theme-settings-panel {
  position: absolute;
  bottom: 50px;
  right: 0;
  width: 280px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.close-button:hover {
  color: #333;
}

.panel-section {
  margin-bottom: 20px;
}

.panel-section h4 {
  font-size: 14px;
  margin: 0 0 10px 0;
  color: #666;
}

.theme-mode-options {
  display: flex;
  gap: 8px;
}

.mode-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 8px;
  border-radius: 6px;
  background-color: #f5f5f5;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-option.active {
  border-color: var(--primary-color, #2196f3);
  background-color: rgba(33, 150, 243, 0.1);
}

.mode-option:hover {
  background-color: #e0e0e0;
}

.mode-icon {
  font-size: 16px;
}

.color-options {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.color-option {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-option.active {
  border-color: #333;
  transform: scale(1.1);
}

.color-option:hover {
  transform: scale(1.15);
}

/* 深色模式样式 */
.dark-mode .theme-settings-panel {
  background-color: #2a2a2a;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.dark-mode .panel-header h3 {
  color: #fff;
}

.dark-mode .panel-section h4 {
  color: #bbb;
}

.dark-mode .close-button {
  color: #aaa;
}

.dark-mode .close-button:hover {
  color: #fff;
}

.dark-mode .mode-option {
  background-color: #3a3a3a;
  color: #ddd;
}

.dark-mode .mode-option.active {
  background-color: rgba(33, 150, 243, 0.2);
}

.dark-mode .mode-option:hover {
  background-color: #444;
}

.dark-mode .color-option.active {
  border-color: #fff;
}

/* 在移动端，为了防止与目录按钮冲突 */
@media (max-width: 768px) {
  .theme-settings {
    bottom: 75px;
  }
}
</style> 