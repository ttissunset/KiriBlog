<template>
  <div class="music-player">
    <!-- 音乐播放器内容 -->
    <div class="player-content">
      <div class="album-cover">
        <img src="../assets/5.jpg" alt="Album Cover" class="cover-img" />
      </div>

      <!-- 右侧内容区域 -->
      <div class="right-section">
        <!-- 歌曲标题 -->
        <div class="song-title">焼けのスター</div>

        <!-- Artist 和播放控制放在同一行 -->
        <div class="artist-controls-row">
          <!-- 左侧 Artist -->
          <div class="artist">今井麻美</div>

          <!-- 右侧播放控制和音量 -->
          <div class="controls-volume-wrapper">
            <!-- 播放控制 -->
            <div class="controls">
              <span class="material-icons-sharp control-btn" id="pointer">skip_previous</span>
              <span class="material-icons-sharp control-btn play-pause" id="pointer" @click="togglePlayPause">
                {{ isPlaying ? 'pause' : 'play_arrow' }}
              </span>
              <span class="material-icons-sharp control-btn" id="pointer">skip_next</span>
            </div>

            <!-- 音量控制 -->
            <div class="volume-control">
              <span class="material-icons-sharp" id="pointer" @click="toggleMute">
                {{ isMuted ? 'volume_off' : 'volume_up' }}
              </span>
            </div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-bar">
          <div class="current-time">0:00</div>
          <input type="range" min="0" max="100" value="0" class="progress-slider">
          <div class="total-time">0:00</div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
// 后续可以添加播放逻辑

const isPlaying = ref(false);
const isMuted = ref(false);
const volume = ref(30); // 默认音量100

const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value;
};

const toggleMute = () => {
  isMuted.value = !isMuted.value;
};

const onVolumeChange = () => {
  // 这里可以对接实际音频元素的音量设置
  // 例如 audioRef.value.volume = volume.value / 100;
};

// 监听播放状态变化，添加或移除playing类
watch(isPlaying, (newValue) => {
  const playerElement = document.querySelector('.music-player');
  if (playerElement) {
    if (newValue) {
      playerElement.classList.add('playing');
    } else {
      playerElement.classList.remove('playing');
    }
  }
});
</script>

<style scoped>
.music-player {
  margin-top: 30px;
  padding: 20px;
  background-color: var(--light-white);
  border-radius: var(--radius-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%; /* 进一步缩小整体跨度 */
  margin: 0 auto; /* 水平居中 */
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  /* 添加出现动画 */
  animation: player-appear 0.6s ease-out forwards;
  transform-origin: center bottom;
}

/* 定义动画关键帧 */
@keyframes player-appear {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.player-content {
  display: flex;
  align-items: center;
  width: 100%; /* 让内容占据父容器（music-player）的全部宽度 */
}

.album-cover {
  width: 90px; /* 缩小专辑图片尺寸 */
  height: 90px; /* 缩小专辑图片尺寸 */
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px; /* 与右侧内容保持间距 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  flex-shrink: 0; /* 防止封面缩小 */
  animation: element-appear 0.5s ease-out 0.2s both;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: cover-rotate 15s linear infinite;
  animation-play-state: paused; /* 默认暂停 */
}

/* 当播放状态激活时旋转专辑封面 */
.music-player.playing .cover-img {
  animation-play-state: running; /* 播放时旋转 */
}

/* 专辑封面旋转动画 */
@keyframes cover-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.right-section {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #eef0f3;
  border-radius: var(--radius-small);
  padding: 5px 10px;
  margin-bottom: 15px; /* 调整间距 */
  /* 移除 width: fit-content; 让其宽度适应容器 */
}

.search-bar span {
  margin-right: 5px;
  color: #57606a;
}

.song-info {
  text-align: left;
  margin-bottom: 10px; /* 调整间距 */
}

.song-title {
  font-size: var(--fs-20);
  font-weight: var(--fw-600);
  color: #24292f;
  margin-bottom: 10px;
  text-align: left;
  animation: element-appear 0.5s ease-out 0.3s both;
}

.artist-controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  animation: element-appear 0.5s ease-out 0.4s both;
}

.artist {
  font-size: var(--fs-16);
  color: #57606a;
  text-align: left;
}

.controls-volume-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.controls-and-volume {
  display: none; /* 不再使用此类 */
}

.controls {
  display: flex;
  align-items: center;
}

.control-btn {
  font-size: var(--fs-30);
  margin: 0 8px; /* 调整按钮间距 */
  color: #57606a;
  transition: all 0.2s ease;
}

.control-btn:hover {
  color: #6f42c1;
  transform: scale(1.1);
}

.control-btn:active {
  transform: scale(0.95);
}

.play-pause {
  font-size: var(--fs-48);
  color: #6f42c1; /* 紫色，参考图片 */
  background-color: #e1d5f4; /* 淡紫色背景 */
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(111, 66, 193, 0.2);
}

.play-pause:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 8px rgba(111, 66, 193, 0.3);
  background-color: #d9c7ef;
}

.play-pause:active {
  transform: scale(0.98);
  box-shadow: 0 1px 3px rgba(111, 66, 193, 0.3);
}

.progress-bar {
  display: flex;
  align-items: center;
  width: 100%;
  /* 作为最后一个元素，不需要 margin-bottom */
  animation: element-appear 0.5s ease-out 0.5s both;
}

.current-time,
.total-time {
  font-size: var(--fs-14);
  color: #57606a;
  min-width: 30px;
  text-align: center;
}

.progress-slider {
  flex-grow: 1;
  margin: 0 10px;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: #e1d5f4;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 2px;
}

.progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #6f42c1;
  border-radius: 50%;
}

.progress-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #6f42c1;
  border-radius: 50%;
}

.volume-control {
  display: flex;
  align-items: center;
  color: #57606a;
}

.volume-control span {
  font-size: var(--fs-24);
  transition: all 0.2s ease;
  /* 添加手型光标 已删除 */
}

.volume-control span:hover {
  color: #6f42c1;
  transform: scale(1.1);
}

.volume-control span:active {
  transform: scale(0.95);
}

/* 可以根据需要添加更多的响应式样式 */
@media (max-width: 768px) {
  .player-content {
    flex-direction: column; /* 小屏幕下垂直排列 */
    align-items: flex-start; /* 左对齐 */
  }

  .album-cover {
    margin-right: 0; /* 移除右侧间距 */
    margin-bottom: 15px; /* 添加下方间距 */
    width: 80px;
    height: 80px;
  }

  .right-section {
    width: 100%; /* 小屏幕下占据全部宽度 */
  }

  .search-bar {
    width: 100%; /* 小屏幕下占据全部宽度 */
    box-sizing: border-box;
  }

  .song-info {
    text-align: center; /* 小屏幕下居中 */
    width: 100%;
  }

  .artist-controls-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .controls-volume-wrapper {
    width: 100%;
    justify-content: center;
  }

  .artist {
    text-align: left;
    width: 100%;
  }

  .song-title {
    text-align: left;
  }

  .controls {
    margin-bottom: 10px; /* 与音量控制保持间距 */
  }

  .control-btn {
    font-size: var(--fs-24);
    margin: 0 8px;
  }

  .play-pause {
    font-size: var(--fs-40);
  }

  .current-time,
  .total-time {
    font-size: var(--fs-12);
  }
}

/* 定义元素出现动画 */
@keyframes element-appear {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 