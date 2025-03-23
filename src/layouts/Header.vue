<template>
  <div class="blog-layout">
    <header class="header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">山茶</router-link>
          </div>

          <!-- 搜索图标 (移动端) -->
          <div class="search-icon-mobile" @click="toggleSearchBox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <!-- 搜索框 -->
          <div class="search-box" :class="{ 'is-active': isSearchActive }">
            <div class="search-input-wrapper">
              <input
                type="text"
                v-model="searchQuery"
                class="search-input"
                :placeholder="$t('header.searchPlaceholder')"
                @keyup.enter="handleSearch"
                ref="searchInput"
              />
              <button class="search-button" @click="handleSearch">
                <i class="ri-search-line"></i>
              </button>
            </div>
            <div class="search-toggle" @click="toggleSearch">
              <i class="ri-search-line"></i>
            </div>
          </div>

          <!-- 移动端菜单按钮 -->
          <button class="mobile-menu-btn" @click="toggleMenu" aria-label="菜单">
            <span class="menu-icon" :class="{ 'active': isMenuActive }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

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
            <button @click="switchLanguage(currentLocale === 'zh' ? 'en' : 'zh')" class="lang-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
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
            <a href="#" title="GitHub"><i>GitHub</i></a>
            <a href="#" title="Twitter"><i>Twitter</i></a>
            <a href="#" title="微博"><i>微博</i></a>
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
const toggleSearchBox = () => {
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
  margin-left: auto;
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
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  margin-right: 10px;
  color: var(--text-color);
  transition: transform 0.2s ease, color 0.2s ease;
}

.search-icon-mobile:hover {
  transform: scale(1.05);
  color: var(--link-color);
}

.search-box {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 15px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--bg-color-secondary);
  border-radius: 20px;
  padding: 0 5px 0 15px;
  max-width: 0;
  overflow: hidden;
  transition: max-width 0.3s ease, padding 0.3s ease;
  visibility: hidden;
}

.is-active .search-input-wrapper {
  max-width: 200px;
  visibility: visible;
  padding: 0 5px 0 15px;
}

.search-input {
  border: none;
  background: transparent;
  height: 35px;
  width: 150px;
  color: var(--text-color);
  outline: none;
  font-size: 0.9rem;
}

.search-button {
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
  font-size: 1.1rem;
}

.search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
  color: var(--text-color);
  font-size: 1.2rem;
}

.main-nav {
  margin-left: auto;
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
  padding-bottom: 12px;
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

.language-switcher {
  margin-left: 20px;
}

.lang-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  color: var(--text-color);
  transition: color var(--transition-speed) ease, transform 0.2s ease;
}

.lang-button:hover {
  color: var(--link-color);
  transform: scale(1.05);
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
  
  .search-box {
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

  /* 显示搜索图标 */
  .search-icon-mobile {
    display: block;
  }

  /* 搜索框样式修改 */
  .search-box {
    margin-left: 5px;
    order: -1; /* 确保搜索框在右侧图标左边 */
  }
  
  .search-toggle {
    display: flex;
  }
  
  .is-active .search-input-wrapper {
    position: absolute;
    top: 10px;
    right: 85px; /* 给更多空间确保不会超出屏幕 */
    width: calc(100vw - 150px); /* 更精确的宽度计算 */
    max-width: 250px;
    background-color: var(--bg-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    height: 40px;
    border-radius: 20px;
    padding: 0 10px;
  }
  
  .search-input {
    width: calc(100% - 40px); /* 给按钮留出空间 */
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

  .language-switcher {
    margin-left: 0;
    margin-right: 10px;
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
</style>
