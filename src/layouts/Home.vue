<template>
  <div class="blog-layout">
    <header class="header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">山茶</router-link>
          </div>

          <div class="right-section">
            <!-- 导航菜单 -->
            <nav class="main-nav" :class="{ 'active': isMenuActive }">
              <ul>
                <li><router-link to="/" @click="closeMenu">{{ $t('nav.home') }}</router-link></li>
                <li><router-link to="/gallery" @click="closeMenu">{{ $t('nav.gallery') }}</router-link></li>
                <li><router-link to="/blog" @click="closeMenu">{{ $t('nav.blog') }}</router-link></li>
                <li><router-link to="/archive" @click="closeMenu">{{ $t('nav.archive') }}</router-link></li>
            </ul>
          </nav>

          <div class="language-switcher">
              <button @click="switchLanguage(currentLocale === 'zh' ? 'en' : 'zh')" class="lang-button" :title="$t('header.langSwitch')">
                <img src="../assets/translate.svg" width="20" height="20" alt="Language" />
              </button>
            </div>

            <!-- 移动端菜单按钮 -->
            <button class="mobile-menu-btn" @click="toggleMenu" aria-label="菜单">
              <span class="menu-icon" :class="{ 'active': isMenuActive }">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <slot></slot>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const { locale } = useI18n();
const currentLocale = ref(locale.value);
const showAltLanguage = ref(false);

// 导航菜单的状态
const isMenuActive = ref(false);
const isScrolled = ref(false);

// 切换导航菜单
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

// 关闭菜单
const closeMenu = () => {
  isMenuActive.value = false;
};

// 切换语言
const switchLanguage = (lang) => {
  locale.value = lang;
  currentLocale.value = lang;
  localStorage.setItem('locale', lang);
};

// 处理滚动效果
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// 初始化语言
onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
    currentLocale.value = savedLocale;
  }
  // 添加全局键盘事件监听器
  window.addEventListener("scroll", handleScroll);
  
  // 点击页面其他地方关闭菜单
  document.addEventListener('click', (e) => {
    const header = document.querySelector('.header');
    if (header && !header.contains(e.target)) {
      isMenuActive.value = false;
    }
  });
});

// 在组件销毁前移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener('click', () => {});
});
</script>

<style>
/* 暗黑模式全局样式 */
.dark-theme {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --header-bg: #252525;
  --card-bg: #2d2d2d;
  --border-color: #444;
  --link-color: #58a6ff;
  --link-hover: #79c0ff;
  --button-bg: #2d2d2d;
  --button-hover: #444;
  --input-bg: #2d2d2d;
  --input-border: #444;
}

/* 默认亮色模式变量 */
:root {
  --bg-color: #f5f5f5;
  --text-color: #333;
  --header-bg: #ffffff;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --link-color: #3273dc;
  --link-hover: #2366d1;
  --button-bg: #f0f0f0;
  --button-hover: #e5e5e5;
  --input-bg: #f5f5f5;
  --input-border: #e0e0e0;
  --header-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --header-shadow-scrolled: 0 3px 10px rgba(0, 0, 0, 0.15);
  --transition-speed: 0.3s;
}
</style>

<style scoped>
.blog-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background-color: var(--header-bg);
  box-shadow: var(--header-shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all var(--transition-speed) ease;
}

.header.scrolled {
  box-shadow: var(--header-shadow-scrolled);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  position: relative;
}

.logo {
  margin-right: 30px;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin-left: 10px;
  z-index: 101;
  transition: transform 0.2s ease;
}

.mobile-menu-btn:hover {
  transform: scale(1.05);
}

.menu-icon {
  display: flex;
  flex-direction: column;
  width: 24px;
  height: 18px;
  justify-content: space-between;
  position: relative;
}

.menu-icon span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

.menu-icon.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
}

.menu-icon.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* 搜索图标 (移动端) */
.search-icon-mobile {
  display: none;
}

.right-section {
  display: flex;
  align-items: center;
  height: 100%;
}

.language-switcher {
  margin-left: 15px;
  display: flex;
  align-items: center;
  height: 100%;
}

.lang-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  color: var(--text-color);
  transition: color var(--transition-speed) ease, transform 0.2s ease;
  display: flex;
  align-items: center;
}

.main-nav {
  margin-left: 20px;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li {
  position: relative;
  display: flex;
  align-items: center;
}

.main-nav a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  transition: all var(--transition-speed);
  position: relative;
}

.main-nav a:hover {
  color: var(--link-color);
}

.main-nav a.router-link-active {
  color: var(--link-color);
  background-color: transparent;
  border-bottom: 2px solid var(--link-color);
}

.more-link {
  display: flex;
  align-items: center;
}

.main-content {
  flex: 1;
  padding: 40px 0;
}
</style>
