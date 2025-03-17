<template>
  <div class="blog-layout">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">山茶</router-link>
          </div>

          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索文章... (Ctrl+K)"
              @keyup.enter="handleSearch"
              ref="searchInput"
            />
            <button @click="handleSearch" class="search-button">
              <span class="search-icon">🔍</span>
            </button>
          </div>

          <nav class="main-nav">
            <ul>
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/gallery">相册</router-link></li>
              <li><router-link to="/blog">文章</router-link></li>
              <li>
                <router-link to="/journal">随记</router-link>
              </li>
              <li><router-link to="/comments">留言</router-link></li>
              <li><router-link to="/archive">归档</router-link></li>
            </ul>
          </nav>
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

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const searchInput = ref(null);

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
  }
};

// 聚焦搜索框
const focusSearch = (e) => {
  // 检查Ctrl+K组合键
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault(); // 阻止浏览器默认行为
    searchInput.value.focus();
  }
};

onMounted(() => {
  // 添加全局键盘事件监听器
  window.addEventListener("keydown", focusSearch);
});

// 在组件销毁前移除事件监听器
onUnmounted(() => {
  window.removeEventListener("keydown", focusSearch);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  height: 70px;
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

.search-box {
  position: relative;
  flex: 1;
  max-width: 300px;
  margin-right: auto;
}

.search-box input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid var(--input-border);
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s;
  background-color: var(--input-bg);
  color: var(--text-color);
}

.search-box input:focus {
  outline: none;
  border-color: var(--link-color);
  background-color: var(--card-bg);
  box-shadow: 0 0 0 3px rgba(50, 115, 220, 0.1);
}

.search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.search-icon {
  font-size: 1.1rem;
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
  transition: all 0.3s;
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
}

.social-links a:hover {
  color: var(--link-hover);
}

@media (max-width: 920px) {
  .header-content {
    flex-wrap: wrap;
    height: auto;
    padding: 15px 0;
  }

  .logo {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-box {
    order: 3;
    max-width: 100%;
    margin: 15px 0 0;
  }

  .main-nav {
    order: 2;
    margin-left: 0;
    width: 100%;
    overflow-x: auto;
  }

  .main-nav ul {
    flex-wrap: nowrap;
    padding-bottom: 5px;
  }
}

/* 添加新随笔按钮样式 */
.new-entry-btn {
  background-color: var(--link-color);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.2s ease;
  vertical-align: middle;
  display: inline-block;
}

.new-entry-btn:hover {
  background-color: var(--link-hover);
  transform: translateY(-1px);
}
</style>
