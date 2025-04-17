import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// 颜色映射
const colorMap = {
  blue: {
    primary: '#2196f3',
    primaryDark: '#1976d2',
    primaryLight: '#bbdefb'
  },
  green: {
    primary: '#4caf50',
    primaryDark: '#388e3c',
    primaryLight: '#c8e6c9'
  },
  orange: {
    primary: '#ff9800',
    primaryDark: '#f57c00',
    primaryLight: '#ffe0b2'
  },
  purple: {
    primary: '#9c27b0',
    primaryDark: '#7b1fa2',
    primaryLight: '#e1bee7'
  },
  red: {
    primary: '#f44336',
    primaryDark: '#d32f2f',
    primaryLight: '#ffcdd2'
  }
};

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const themeMode = ref('system');
  const themeColor = ref('blue');

  // 设置主题模式
  const setThemeMode = (mode) => {
    themeMode.value = mode;
    localStorage.setItem('theme-mode', mode);
    applyThemeMode();
  };

  // 设置主题颜色
  const setThemeColor = (color) => {
    themeColor.value = color;
    localStorage.setItem('theme-color', color);
    applyThemeColor();
  };

  // 应用主题模式
  const applyThemeMode = () => {
    const html = document.documentElement;
    
    if (themeMode.value === 'system') {
      // 检测系统偏好
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.toggle('dark-mode', prefersDarkMode);
    } else {
      html.classList.toggle('dark-mode', themeMode.value === 'dark');
    }
  };

  // 应用主题颜色
  const applyThemeColor = () => {
    const html = document.documentElement;
    
    // 清除所有主题颜色
    html.removeAttribute('data-theme');
    
    // 蓝色是默认主题，不需要添加data-theme属性
    if (themeColor.value !== 'blue') {
      html.setAttribute('data-theme', themeColor.value);
    }
  };

  // 监听系统主题变化
  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themeMode.value === 'system') {
        applyThemeMode();
      }
    };
    
    // 初始应用
    handleChange();
    
    // 监听变化
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 旧版浏览器支持
      mediaQuery.addListener(handleChange);
    }
  };

  // 初始化主题
  const initTheme = () => {
    loadSavedSettings();
    setupSystemThemeListener();
  };

  // 加载保存的设置
  const loadSavedSettings = () => {
    const savedMode = localStorage.getItem('theme-mode');
    const savedColor = localStorage.getItem('theme-color');
    
    if (savedMode) {
      themeMode.value = savedMode;
    }
    
    if (savedColor) {
      themeColor.value = savedColor;
    }
    
    applyThemeMode();
    applyThemeColor();
  };

  // 监听主题变化
  watch([themeMode, themeColor], () => {
    applyThemeMode();
    applyThemeColor();
  });

  return {
    themeMode,
    themeColor,
    setThemeMode,
    setThemeColor,
    initTheme
  };
}); 