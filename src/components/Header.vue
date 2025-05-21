<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const isMenuActive = ref(false);
const isHeaderVisible = ref(false); // header是否可见
const isRopeVisible = ref(false);   // 抽绳是否可见
const isRopePulling = ref(false);   // 抽绳拉动动画
const isRopeAppear = ref(false);    // 抽绳出现动画

const showHeader = () => {
  isHeaderVisible.value = true;
  isRopeVisible.value = false;
  isRopeAppear.value = false;
};
const hideHeader = () => {
  isHeaderVisible.value = false;
  isRopeVisible.value = true;
  isRopeAppear.value = true;
};

const pullRope = async () => {
  isRopePulling.value = true;
  await nextTick();
  setTimeout(() => {
    isRopePulling.value = false;
    showHeader();
  }, 200); // 与动画时间保持一致
};

const handleScroll = () => {
  if (window.scrollY > 40) {
    hideHeader();
  } else {
    showHeader();
  }
};

onMounted(() => {
  // 首次加载header从顶部滑入
  setTimeout(() => {
    showHeader();
  }, 200);
  window.addEventListener("scroll", handleScroll);
  // 抽绳动画初始
  setTimeout(() => {
    isRopeAppear.value = true;
  }, 10);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <!-- Header主栏 -->
    <header class="side-header" :class="{ 'visible': isHeaderVisible, 'hidden': !isHeaderVisible }">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">山茶</router-link>
        </div>
        <nav class="main-nav">
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/gallery">相册</router-link></li>
            <li><router-link to="/blog">文章</router-link></li>
            <li><router-link to="/archive">归档</router-link></li>
            <li><router-link to="/blog">随记</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
    <!-- 灯泡拉绳 -->
    <div v-if="isRopeVisible" class="header-rope" :class="{ 'pulling': isRopePulling, 'rope-appear': isRopeAppear }" @click="pullRope">
      <div class="rope-line"></div>
      <div class="bulb-wrap">
        <div class="bulb">
          <div class="bulb-ball"></div>
          <div class="bulb-filament">
            <svg viewBox="0 0 16 10">
              <path d="M2 8 Q8 2 14 8" stroke="#e6b800" stroke-width="2" fill="none" />
            </svg>
          </div>
        </div>
        <div class="bulb-base"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-header {
  position: fixed;
  top: 0;
  left: 50px;
  width: 20vw;
  height: 100px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 24px 0;
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
  justify-content: flex-start;
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

/* 灯泡拉绳子样式 */
.header-rope {
  position: fixed;
  top: 0;
  left: 0;
  width: 56px;
  height: 140px;
  z-index: 210;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.header-rope .rope-line {
  width: 3px;
  background: linear-gradient(to bottom, #bdbdbd 80%, #e0e0e0 100%);
  border-radius: 2px;
  margin: 0 auto;
  height: 0;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.header-rope.rope-appear .rope-line {
  height: 60px;
}
.header-rope.pulling .rope-line {
  height: 120px;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.header-rope .bulb-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(-16px);
  transition: opacity 0.3s, transform 0.3s;
}
.header-rope.rope-appear .bulb-wrap {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s 0.3s, transform 0.3s 0.3s;
}
.header-rope.pulling .bulb-wrap {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-100%);
}
.header-rope .bulb {
  width: 32px;
  height: 32px;
  background: radial-gradient(circle at 60% 40%, #fffbe6 70%, #ffe066 100%);
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(255, 230, 102, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: box-shadow 0.3s, background 0.3s;
}
.header-rope .bulb:hover {
  box-shadow: 0 0 24px 8px #ffe066, 0 2px 12px 0 rgba(255, 230, 102, 0.35);
  background: radial-gradient(circle at 60% 40%, #fffbe6 60%, #ffe066 100%);
}
.header-rope .bulb-base {
  width: 16px;
  height: 8px;
  background: #bdbdbd;
  border-radius: 0 0 6px 6px;
  margin-top: -2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
.header-rope .bulb-filament {
  position: absolute;
  left: 8px;
  top: 13px;
  width: 16px;
  height: 10px;
  pointer-events: none;
}

/* 灯丝SVG */
.header-rope .bulb-filament svg {
  width: 16px;
  height: 10px;
  display: block;
}

.header-rope .bulb-ball {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.header-rope .bulb-ball:after {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  background: #ffe066;
  border-radius: 50%;
  position: absolute;
  left: 12px;
  top: 8px;
  opacity: 0.5;
}

.header-rope.pulling {
  transform: translateY(-100%);
}

@media (max-width: 900px) {
  .side-header {
    width: 90vw;
    min-width: 0;
    max-width: 100vw;
    padding: 0 10vw;
  }
}
</style> 