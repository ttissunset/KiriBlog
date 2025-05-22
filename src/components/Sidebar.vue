<script setup>
import { ref, onMounted } from 'vue';
import Header from './Header.vue';
import MusicPlayer from './MusicPlayer.vue';

const emit = defineEmits(['scrollToContent']);
const displayBio = ref('');
const fullBio = '"自由独立试新茶，沉醉半生"';

const typeWriter = () => {
  let i = 0;
  const speed = 100; // 打字速度（毫秒）

  const type = () => {
    if (i < fullBio.length) {
      displayBio.value += fullBio.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

onMounted(() => {
  typeWriter();
});

const handleScroll = () => {
  emit('scrollToContent');
};
</script>

<template>
  <Header />
  <div class="sidebar">
    <div class="sidebar-content">
      <!-- 头像及基本个人信息区域 -->
      <div class="avatar-section">
        <img src="../assets/avatar.jpg" alt="头像" class="avatar-img" />
        <h1 class="profile-name">Kiri</h1>
        <p class="username">苯氨基丙酸</p>
        <div class="bio">{{ displayBio }}</div>
      </div>

      <!-- 音乐播放器组件 -->
      <MusicPlayer />

      <!-- 向下滚动提示 -->
      <div class="scroll-hint" id="pointer" @click="handleScroll">
        <span>向下滚动查看更多</span>
        <div class="scroll-arrow">
          <span class="material-icons-sharp">expand_more</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 25%;
  height: calc(100vh - 60px); /* 减去 Header 的高度 */
  padding: 40px 20px;
  box-sizing: border-box;
  background-color: var(--light-white);
  z-index: 10;
  position: fixed;
  left: 0;
  top: 60px; /* Header 的高度 */
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

/* 头像部分样式 */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-img {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-circle);
  border: 1px solid #d0d7de;
  margin-bottom: 16px;
  object-fit: cover;
}

.profile-name {
  font-size: var(--fs-24);
  line-height: 1.25;
  font-weight: var(--fw-600);
  color: #24292f;
  margin: 0 0 4px;
}

.username {
  font-size: var(--fs-20);
  font-weight: 300;
  line-height: 24px;
  color: #57606a;
  margin: 0 0 16px;
}

.bio {
  margin-bottom: 16px;
  color: #24292f;
  font-size: var(--fs-16);
  line-height: 1.5;
  font-style: italic;
  border-left: 3px solid #e0e0e0;
  padding-left: 16px;
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #57606a;
  font-size: var(--fs-14);
  transition: transform 0.3s ease;
}

.scroll-hint:hover {
  transform: translateY(5px);
}

.scroll-arrow {
  margin-top: 10px;
  animation: fadeDown 1.8s infinite;
}

@keyframes fadeDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    min-height: 50vh;
    top: 0;
  }
}
</style> 