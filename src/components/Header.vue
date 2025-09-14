<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isHeaderVisible = ref(false);

const showHeader = () => {
  isHeaderVisible.value = true;
};

const hideHeader = () => {
  isHeaderVisible.value = false;
};

const handleScroll = () => {
  if (window.scrollY > 40) {
    hideHeader();
  } else {
    showHeader();
  }
};

onMounted(() => {
  setTimeout(() => {
    showHeader();
  }, 200);
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <!-- 顶部点击区域 -->
    <div v-if="!isHeaderVisible" class="header-trigger" id="pointer" @click="showHeader"></div>
    <header class="side-header" :class="{ visible: isHeaderVisible, hidden: !isHeaderVisible }">
      <div class="header-content">
        <div class="logo">
          <router-link to="/" id="pointer">山茶</router-link>
        </div>
        <nav class="main-nav">
          <ul>
            <li><router-link to="/" id="pointer">首页</router-link></li>
            <li><router-link to="/blog" id="pointer">文章</router-link></li>
            <li><router-link to="/archive" id="pointer">归档</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header-trigger {
  position: fixed;
  top: 0;
  left: 25px;
  width: 20vw;
  height: 20px;
  z-index: 201;
}

.side-header {
  position: fixed;
  top: 20px;
  left: 25px;
  width: 20vw;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  z-index: 200;
  transform: translateY(-100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 20px;
}
.side-header.visible {
  transform: translateY(0);
}
.side-header.hidden {
  transform: translateY(-100%);
}
.header-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  gap: 32px;
}
.logo a {
  font-size: 2rem;
  font-weight: bold;
  color: #7a6a5f;
  text-decoration: none;
  letter-spacing: 2px;
  margin-bottom: 0;
  display: block;
}
.main-nav ul {
  display: flex;
  flex-direction: row;
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.main-nav a {
  color: #7a6a5f;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.main-nav a.router-link-active,
.main-nav a:hover {
  color: #6d41d1;
}
</style>
