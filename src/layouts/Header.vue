<template>
  <div class="blog-layout">
    <header class="header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">山茶</router-link>
          </div>

          <div class="right-section">
            <!-- 搜索框 -->
            <div class="search-container" :class="{ 'search-active': isSearchActive }">
              <div class="search-toggle" @click="toggleSearch" v-show="!isSearchActive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div class="search-input-wrapper" :class="{ 'show': isSearchActive, 'desktop-search': true }">
                <input 
                  type="text" 
                  class="search-input" 
                  :placeholder="$t('header.searchPlaceholder')" 
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  ref="searchInput"
                />
                <button class="search-button" @click="handleSearch">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
                <button v-if="isSearchActive" class="close-search-button" @click="toggleSearch">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 导航菜单 -->
            <nav class="main-nav" :class="{ 'active': isMenuActive }">
              <ul>
                <li><router-link to="/" @click="closeMenu">{{ $t('nav.home') }}</router-link></li>
                <li><router-link to="/gallery" @click="closeMenu">{{ $t('nav.gallery') }}</router-link></li>
                <li><router-link to="/blog" @click="closeMenu">{{ $t('nav.blog') }}</router-link></li>
                <li>
                  <router-link to="/journal" @click="closeMenu">{{ $t('nav.journal') }}</router-link>
                </li>
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

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <p>© 2024 Kiri - 个人主页</p>
          </div>
          <div class="social-links">
            <a href="#" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="#" title="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" title="微博">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.9 14.5c0-4.7-4.8-8.5-9.5-8.5S2 9.8 2 14.5s4.7 8.5 9.5 8.5 9.4-3.8 9.4-8.5z"></path>
                <path d="M15.7 15.5c-.5-.9-1.7-1.2-2.6-.8-.9.4-1.2 1.6-.8 2.5s1.7 1.2 2.6.8c.9-.5 1.2-1.6.8-2.5z"></path>
                <path d="M18 8.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"></path>
                <path d="M13.5 14.5c.7 0 1.2.6 1.2 1.2 0 .7-.6 1.2-1.2 1.2-.7 0-1.2-.6-1.2-1.2-.1-.7.5-1.2 1.2-1.2z"></path>
                <path d="M10.5 13c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z"></path>
                <path d="M18 1.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const searchInput = ref(null);
const { locale } = useI18n();
const currentLocale = ref(locale.value);
const showAltLanguage = ref(false);

// 导航菜单的状态
const isMenuActive = ref(false);
const isSearchActive = ref(false);
const isScrolled = ref(false);

// 切换导航菜单
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  // 如果打开菜单，关闭搜索框
  if (isMenuActive.value) {
    isSearchActive.value = false;
  }
};

// 关闭菜单
const closeMenu = () => {
  isMenuActive.value = false;
};

// 切换搜索框
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
  // 如果打开搜索框，关闭菜单
  if (isSearchActive.value) {
    isMenuActive.value = false;
    // 聚焦搜索框
    setTimeout(() => {
      searchInput.value.focus();
    }, 100);
  }
};

// 检查当前是否在随笔页面
const isJournalPage = computed(() => {
  return route.path === "/journal";
});

// 跳转到写随笔页面
const newJournal = () => {
  router.push("/journal/edit");
};

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search",
      query: { q: searchQuery.value },
    });
    isSearchActive.value = false;
  }
};

// 聚焦搜索框
const focusSearch = (e) => {
  // 检查Ctrl+K组合键
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault(); // 阻止浏览器默认行为
    isSearchActive.value = true;
    setTimeout(() => {
      searchInput.value.focus();
    }, 100);
  }
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
  window.addEventListener("keydown", focusSearch);
  window.addEventListener("scroll", handleScroll);
  
  // 点击页面其他地方关闭菜单和搜索框
  document.addEventListener('click', (e) => {
    const header = document.querySelector('.header');
    if (header && !header.contains(e.target)) {
      isMenuActive.value = false;
      isSearchActive.value = false;
    }
  });
});

// 在组件销毁前移除事件监听器
onUnmounted(() => {
  window.removeEventListener("keydown", focusSearch);
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

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.search-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.search-toggle svg {
  transition: transform 0.2s, color 0.2s;
}

.search-input-wrapper {
  position: relative;
  width: 260px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  padding: 0 5px 0 15px;
  overflow: hidden;
}

.search-input {
  border: none;
  background: transparent;
  height: 35px;
  width: calc(100% - 40px);
  color: var(--text-color);
  outline: none;
  font-size: 0.9rem;
}

.search-button {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  height: 35px;
  width: 35px;
  padding: 0;
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

.footer {
  background-color: var(--header-bg);
  padding: 30px 0;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-info {
  color: var(--text-color);
}

.social-links a {
  margin-left: 15px;
  color: var(--text-color);
  text-decoration: none;
  transition: color var(--transition-speed) ease;
}

.social-links a:hover {
  color: var(--link-hover);
}

/* 平板断点 */
@media (max-width: 1024px) {
  .header-content {
    height: 60px;
  }
  
  .main-nav a {
    font-size: 0.9rem;
    padding: 5px 8px;
  }
  
  .search-container {
    max-width: 200px;
  }
  
  .logo a {
    font-size: 1.3rem;
  }
}

/* 响应式设计 - 平板和移动设备 */
@media (max-width: 768px) {
  .header-content {
    height: 60px;
  }

  .logo {
    margin-right: 0;
  }

  /* 显示移动端菜单按钮 */
  .mobile-menu-btn {
    display: block;
  }

  /* 搜索框样式修改 */
  .search-container {
    margin-right: 10px;
    position: relative;
  }
  
  .search-input-wrapper {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 0;
    max-width: none;
    background-color: var(--bg-color);
    box-shadow: none;
    z-index: 100;
    border: 1px solid var(--border-color);
    height: 35px;
    border-radius: 20px;
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }
  
  .search-input-wrapper.desktop-search:not(.show) {
    display: none;
    opacity: 0;
    width: 0;
  }
  
  .search-input-wrapper.show {
    display: flex;
    width: 200px;
    padding: 0 15px 0 35px;
    opacity: 1;
    right: -15px;
  }
  
  .search-toggle {
    display: flex;
    z-index: 101;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: -5px;
  }
  
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
  
  .search-input {
    width: calc(100% - 35px);
  }
  
  .search-button {
    position: absolute;
    left: 8px;
  }
  
  .close-search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    height: 35px;
    width: 35px;
    padding: 0;
    position: absolute;
    right: 5px;
  }
  
  .language-switcher {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
    height: 40px;
  }
  
  .lang-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    padding: 0;
  }
  
  .lang-button img {
    width: 20px;
    height: 20px;
  }

  /* 导航菜单样式调整 */
  .main-nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--header-bg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 99;
    overflow-y: auto;
    margin-left: 0;
  }

  .main-nav.active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }

  .main-nav ul {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }

  .main-nav li {
    width: 100%;
    margin-bottom: 10px;
  }

  .main-nav a {
    padding: 12px 20px;
    width: 100%;
    display: block;
    font-size: 1.1rem;
    border-bottom: none;
    border-left: 3px solid transparent;
  }

  .main-nav a.router-link-active {
    border-bottom: none;
    border-left: 3px solid var(--link-color);
    background-color: rgba(50, 115, 220, 0.05);
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    margin-top: 15px;
  }
  
  .social-links a {
    margin: 0 8px;
  }
}

/* 修复平板端的搜索框 - 针对768-960px尺寸 */
@media (min-width: 769px) and (max-width: 1060px) {
  .container {
    padding: 0 10px;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  
  .header-content, .footer-content {
    width: 100%;
    box-sizing: border-box;
  }
  
  .search-input-wrapper {
    width: 180px;
  }
  
  .main-nav {
    margin-left: 8px;
  }
  
  .main-nav a {
    padding: 5px 4px;
    font-size: 0.8rem;
  }
  
  .language-switcher {
    margin-left: 5px;
  }
  
  .logo a {
    font-size: 1.2rem;
  }
  
  .logo {
    margin-right: 10px;
  }
}

/* 小屏幕移动设备 */
@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .logo a {
    font-size: 1.2rem;
  }
  
  .main-nav a {
    padding: 10px 15px;
  }
}

/* 在这里添加大屏幕搜索框样式 */
@media (min-width: 769px) {
  .search-toggle {
    display: none !important;
  }
  
  .search-input-wrapper.desktop-search {
    display: flex;
    opacity: 1;
    width: 260px;
  }
}
</style>
