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
            <div class="footer-logo">
              <h3>Kiri Blog</h3>
              <p>探索思想，分享创意</p>
            </div>
            <div class="footer-description">
              <p>Kiri Blog 是一个专注于技术分享、生活随笔和创意想法的个人博客平台，希望能为您带来启发和思考。</p>
            </div>
          </div>
          <div class="footer-navigation">
            <h4>快速导航</h4>
            <ul>
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/blog">博客</router-link></li>
              <li><router-link to="/journal">日志</router-link></li>
              <li><router-link to="/gallery">相册</router-link></li>
              <li><router-link to="/about">关于</router-link></li>
            </ul>
          </div>
          <div class="footer-contact">
            <h4>联系我们</h4>
            <ul>
              <li><span>邮箱:</span> contact@kiriblog.com</li>
              <li><span>微信:</span> KiriBlog2024</li>
              <li><span>QQ:</span> 123456789</li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>友情链接</h4>
            <ul>
              <li><a href="https://github.com" target="_blank">GitHub</a></li>
              <li><a href="https://vuejs.org" target="_blank">Vue.js</a></li>
              <li><a href="https://developer.mozilla.org" target="_blank">MDN Web 文档</a></li>
              <li><a href="https://www.w3.org" target="_blank">W3C</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="copyright">
            <p>© 2024 Kiri Blog - 保留所有权利</p>
            <p class="beian">备案号: 粤ICP备12345678号</p>
          </div>
          <div class="social-links">
            <a href="https://github.com" target="_blank" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
            </a>
            <a href="https://weibo.com" target="_blank" aria-label="微博">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M851.4 590.193c-22.196-66.233-90.385-90.422-105.912-91.863-15.523-1.442-29.593-9.94-19.295-27.505 10.302-17.566 29.304-68.684-7.248-104.681-36.564-36.14-116.512-22.462-173.094 0.866-56.434 23.327-53.39 7.055-51.65-8.925 1.89-16.848 32.355-111.02-60.791-122.395C311.395 220.86 154.85 370.754 99.572 457.15 16 587.607 29.208 675.873 29.208 675.873h0.58c10.009 121.819 190.787 218.869 412.328 218.869 190.5 0 350.961-71.853 398.402-169.478 0 0 0.143-0.433 0.575-1.156 4.938-10.506 8.71-21.168 11.035-32.254 6.668-26.205 11.755-64.215-0.728-101.66z m-436.7 251.27c-157.71 0-285.674-84.095-285.674-187.768 0-103.671 127.82-187.76 285.674-187.76 157.705 0 285.673 84.089 285.673 187.76 0 103.815-127.968 187.768-285.673 187.768z m0-341.787c-116.58 0-211.096 62.294-211.096 139.12 0 76.68 94.516 139.118 211.096 139.118 116.584 0 211.096-62.294 211.096-139.118 0-76.825-94.512-139.12-211.096-139.12z m0 199.885c-36.738 0-66.56-25.336-66.56-56.55 0-31.22 29.823-56.56 66.56-56.56 36.735 0 66.565 25.34 66.565 56.56 0 31.213-29.83 56.55-66.565 56.55z m0-89.425c-18.223 0-33.278 14.668-33.278 33.035 0 18.365 15.055 33.035 33.278 33.035 18.22 0 33.278-14.67 33.278-33.035 0.143-18.367-15.058-33.035-33.278-33.035z m-66.56-111.58c-18.647 0-33.742 15.093-33.742 33.743 0 18.65 15.095 33.738 33.742 33.738 18.65 0 33.746-15.088 33.746-33.738 0-18.795-15.096-33.743-33.746-33.743z m99.838 0c-18.65 0-33.746 15.093-33.746 33.743 0 18.65 15.096 33.738 33.746 33.738 18.647 0 33.742-15.088 33.742-33.738 0-18.795-15.095-33.743-33.742-33.743z m290.12-10.897c17.92 1.442 37.075 2.884 53.917 10.752 16.847 7.87 29.02 19.295 35.293 31.272 6.27 11.977 8.307 24.527 8.307 36.432 0 11.91-4.584 22.016-11.45 28.289-6.866 6.432-15.096 10.609-23.618 11.903-8.52 1.29-17.352 1-24.958-2.735-7.607-3.73-15.096-11.45-17.92-28.437-2.14-13.71-12.59-37.07-36.575-42.1-24.958-5.035-79.562-7.295-96.835 9.872-41.172 40.743 8.714 64.27 58.282 66.566 75.976 3.438 119.146 9.185 158.496 57.53 39.206 48.195 17.06 125.885-45.97 154.456-41.742 18.938-92.37 18.938-138.632 8.52-46.257-10.28-84.172-34.226-103.75-59.185-19.58-24.96-20.44-51.897-10.59-73.47 9.889-21.437 33.738-39.496 70.6-35.763 36.867 3.73 45.683 22.023 36.432 47.96-9.113 25.952-16.99 51.906 39.348 53.77 56.484 1.864 73.902-24.958 81.196-36.864 7.6-11.904 9.897-30.33-3.73-32.458-13.626-2.143-62.728-17.498-48.892-57.38 13.54-40.602 54.864-78.69 144.542-80.845 89.679-2.143 173.868 45.97 187.45 91.363 13.626 45.392-10.897 84.601-34.383 110.909-23.618 26.27-110.752 49.46-178.455 49.887-67.703 0.438-58.72-22.166-26.264-41.173 32.458-19.007 133.054-22.603 160.927-79.995 5.476-11.485 7.592-23.191 5.307-34.948-8.196-38.928-11.037-44.536-26.725-44.536-15.825 0-36.14-2.735-46.69-10.463-10.548-7.729-20.17-19.58-30.758-38.343-10.607-18.647-40.307-10.897-48.596-5.887-8.307 5.026-22.896 8.764-36.564-0.427-13.636-9.175-22.33-24.958-20.167-41.75 0.752-14.736 8.714-28.437 20.58-32.17 11.908-3.732 25.404-2.143 36.432 6.13 10.895 8.307 26.695 18.08 40.45 18.08 13.74 0 26.265-11.917 32.598-20.154 6.29-8.27 19.15-32.72 41.03-26.565 13.61 3.878 25.97 16.276 25.97 35.045 0 18.65-4.87 39.355-14.595 63.84-6.58 16.706-6.58 16.706 25.689 20.735h0.295z" />
              </svg>
            </a>
            <a href="https://zhihu.com" target="_blank" aria-label="知乎">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M564.7 230.1V803h60l25.2 71.4L756.3 803h131.5V230.1H564.7z m247.7 497h-59.9l-75.1 50.4-17.8-50.4h-18V308.3h170.7v418.8zM526.1 486.9H393.3c2.1-44.9 4.3-104.3 6.6-172.9h130.9l-0.1-8.1c0-0.6-0.2-14.7-2.3-29.1-2.1-15-6.6-34.9-21-34.9H287.8c4.4-20.6 15.7-69.7 29.4-93.5l6.4-11.1-12.9-0.7c-0.8 0-19.6-0.9-41.4 10.6-35.7 19-51.7 56.4-58.7 84.4-18.4 73.1-44.6 123.9-55.7 145.6-3.3 6.4-5.3 10.2-6.2 12.8-1.8 4.9-0.8 9.8 2.8 13 10.5 9.5 38.2-2.9 38.5-3 0.6-0.3 1.3-0.6 2-0.9 5.6-2.6 12.2-5.7 19.6-9.6 40.7-20.5 89.9-30.9 89.9-30.9 4.8-1.3 9.4-2.5 13.8-3.7 52.2-14.1 88.2-52.1 88.2-52.1l-0.2-0.2c-5.4 5.4-17.3 12.1-36.7 17.6-19.2 5.4-39.1 8.4-39.1 8.4-42.7 10.8-75.3 21.5-75.3 21.5l-8.2 5.5 7.6 6.4c0.8 0.7 19.8 16.5 36.1 33.9 16.8 17.9 32.1 39.2 32.1 39.2l4.7 6.8 8-2.3c0.2-0.1 21.5-5.9 40.1-9.7 42.6-8.9 76.3-33.4 76.3-33.4 84.5-57.7 140.8-185 162.7-254.7 39.2 17.1 171.3 81.5 180.2 86.3 9.3 5.1 17.3 10.8 17.3 10.8L716 273l64.3 40.4c0.1 0 159.2 99.9 174.3 116.1l4.6 5 5.1-4.5c10.2-9.1 21.9-21.2 27.6-31.8 9-16.8 8.1-31.9 6.4-41.1-5.5-28.1-43.6-45.6-97.2-53.8l8.4-24.9c45.9 3.5 61.9 9.1 61.9 9.1 44.7 13.2 67.6 36.6 67.6 36.6 27.3 26.6 25.6 52.5 25.6 52.5-1.1 20.8-12.6 37.2-22.8 48.6-16.1 18-38.1 36.7-38.1 36.7l-4 3.3 4.9 1.8c0.8 0.3 19.5 7.2 41.6 11.3 20.4 3.7 42 4.7 54.6 4.7 22.6 0 30-5.3 30-5.3 7.5-4.1 0-13.3 0-13.3-30.7-26.7-109.8-147.7-109.8-147.7-61.3-85.4-130.7-153.7-130.7-153.7-5.8-5.6-12.3-11.9-18.8-18-42.8-40.7-62.2-73.2-62.2-73.2-32.1-57.8-10.1-92.8-10.1-92.8 28.3-44.9 155.2-32.7 155.2-32.7l146.4 22.5-35.3 103.7-22.2-9.2c-43.1-16.4-65.7-25.8-83.7-33-13.2-5.3-40.7-13.9-40.7-13.9-0.6-0.2-1.2-0.4-1.7-0.5 3.2-10.2 5.9-20 8.2-29.9 53.4 22.1 143.8 65.5 199.9 96.7 55.5 30.9 72.5 56.4 72.5 56.4 32.2 48.9-16.1 100.7-16.1 100.7-57.6 59.2-253.3 153.7-253.3 153.7h-37.8l206.9-126.7-41.4-62.2-23.3 15.4c-0.1 0.1-126.4 83.5-233.3 144.7V518l26.9-33.3c0.7-0.9 65.2-80.4 109.9-118.8 5.2-4.5 9.5-8.2 13.3-11.7 33.4-30.2 39.5-51.9 39.5-51.9 9.5-41.8-23.4-74.9-23.4-74.9C812.4 200.2 713 230 713 230c-10.3 3-20.9 6.2-31.7 9.5L607.5 135l34.3-95.3-600.7 3.3c-13.9 0-19.4 14.3-19.4 14.3 16.5 55.2 36.9 114.6 36.9 114.6 2.5 6.7 5.5 14.7 5.5 14.7 219 42.5 291.2 179.5 291.5 180.1 0.9 1.7 12.5 23.7 24 50.7-25.2 70.3-73 186.1-73 186.1-0.5 1.4-3.9 10.5-7.3 20.6-12.9-0.9-34.9-1.5-59.8 5.9-43.4 12.8-71.5 36.9-71.5 36.9-40.3 33.9-34.5 75.1-34.5 75.1 3.3 40.9 40.7 49.6 40.7 49.6 53.9 12.1 107.7-26.1 107.7-26.1 42.1-34.9 63.2-77.8 63.2-77.8 9.2-17.7 20.1-55.3 26.8-83.5 48 46.2 81.6 101.1 81.6 101.1 46.5 73.7 9.1 97.4 9.1 97.4-76.8 48-376.1 48.9-376.1 48.9-68.3 2.9-87-28.7-87-28.7 136.2-7.3 242.9-20.7 242.9-20.7 95.7-13.7 109.1-55.5 109.1-55.5-37.3-61.7-208.7-53.2-208.7-53.2-132.9 15.6-181.6 8.6-181.6 8.6 155.7-49.9 325.6-34.6 325.6-34.6 16.5 0.3 27.5 1.3 27.5 1.3 72 3.7 123.1 53 123.1 53H330l-41.8-43.5 86.8-20.1c69.8-22.2 108.7-81.8 108.7-81.8 55.7-91.2 11.7-115.9 11.7-115.9-43.5-12.5-214.5 34.7-214.5 34.7l-136.3 30.1 75.9-176.4 4-25.2c1.6-10.2 4.9-31.1 9-57.8h166l0.2 0.9c0 0.2 3.2 19.9 6.5 43.2z" />
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
  background-color: var(--bg-footer);
  padding: 40px 0 20px;
  margin-top: 50px;
  color: var(--text-color-light);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-logo h3 {
  font-size: 1.5rem;
  margin: 0 0 5px 0;
  color: var(--text-color);
}

.footer-logo p {
  font-size: 0.9rem;
  margin: 0;
  color: var(--text-color-light);
}

.footer-description p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  max-width: 300px;
}

.footer-navigation h4,
.footer-contact h4,
.footer-links h4 {
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  color: var(--text-color);
}

.footer-navigation ul,
.footer-contact ul,
.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-navigation li,
.footer-links li {
  margin-bottom: 10px;
}

.footer-navigation a,
.footer-links a {
  color: var(--text-color-light);
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.footer-navigation a:hover,
.footer-links a:hover {
  color: var(--link-hover);
}

.footer-contact li {
  margin-bottom: 10px;
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
}

.footer-contact li span {
  font-weight: 600;
  margin-right: 8px;
  min-width: 40px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-color-light);
}

.beian {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 5px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-color-light);
  transition: all 0.3s;
}

.social-links a:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .footer-description p {
    max-width: 100%;
  }
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
