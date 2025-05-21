<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 导航菜单的状态
const isMenuActive = ref(false);
const isScrolled = ref(false);

// 切换导航菜单
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

// 处理滚动效果
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// 初始化组件
onMounted(() => {
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
  document.removeEventListener('click', () => { });
});
</script>

<template>
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
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/gallery">相册</router-link></li>
              <li><router-link to="/blog">文章</router-link></li>
              <li><router-link to="/archive">归档</router-link></li>
            </ul>
          </nav>

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
</template>

<style scoped>
.container {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background-color: var(--light-white);
  box-shadow: var(--shadow-1);
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 100;
  transition: all var(--transition-3) ease;
  width: 62.5%; /* 5/8的宽度 */
  left: calc(25% + (75% - 62.5%) / 2); /* 右侧3/4宽度上居中 */
  border-radius: 8px;
}

.header.scrolled {
  box-shadow: var(--shadow-2);
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
  font-weight: var(--fw-700);
  color: var(--dark);
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
  background-color: var(--dark);
  transition: all var(--transition-3) ease;
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

.right-section {
  display: flex;
  align-items: center;
  height: 100%;
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
  color: var(--dark);
  text-decoration: none;
  font-weight: var(--fw-500);
  padding: 5px 10px;
  transition: all var(--transition-3);
  position: relative;
}

.main-nav a:hover {
  color: var(--blue-crayola);
}

.main-nav a.router-link-active {
  color: var(--blue-crayola);
  background-color: transparent;
  border-bottom: 2px solid var(--blue-crayola);
}

/* 响应式样式 */
@media (max-width: 768px) {
  /* 移动端导航调整 */
  .mobile-menu-btn {
    display: block;
  }

  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: var(--light-white);
    box-shadow: var(--shadow-1);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-3) ease;
    margin-left: 0;
  }

  .main-nav.active {
    max-height: 300px;
  }

  .main-nav ul {
    flex-direction: column;
    padding: 10px 0;
  }

  .main-nav li {
    width: 100%;
  }

  .main-nav a {
    display: block;
    padding: 10px 20px;
    width: 100%;
  }
}
</style> 