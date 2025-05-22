<template>
  <div class="music-player" :class="{ playing: isPlaying }">
    <!-- 音乐播放器内容 -->
    <div class="player-content">
      <div class="album-cover" v-if="currentSong">
        <img :src="currentSong.cover" :key="currentSongIndex" alt="Album Cover" class="cover-img" />
      </div>

      <!-- 右侧内容区域 -->
      <div class="right-section" v-if="currentSong">
        <!-- 歌曲标题 -->
        <div class="song-title">{{ currentSong.title }}</div>

        <!-- Artist 和播放控制放在同一行 -->
        <div class="artist-controls-row">
          <!-- 左侧 Artist -->
          <div class="artist">{{ currentSong.artist }}</div>

          <!-- 右侧播放控制和音量 -->
          <div class="controls-volume-wrapper">
            <!-- 播放控制 -->
            <div class="controls">
              <span class="material-icons-sharp control-btn" id="pointer" @click="playPrevious">skip_previous</span>
              <span class="material-icons-sharp control-btn play-pause" id="pointer" @click="togglePlayPause">
                {{ isPlaying ? 'pause' : 'play_arrow' }}
              </span>
              <span class="material-icons-sharp control-btn" id="pointer" @click="playNext">skip_next</span>
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
          <div class="current-time">{{ formatTime(currentTime) }}</div>
          <input type="range" min="0" max="100" v-model="progress" class="progress-slider" @input="onProgressChange" id="pointer">
          <div class="total-time">{{ currentSong.duration || '0:00' }}</div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import songData from '../assets/mp3.json';

// 音乐数据
const allSongs = ref([]);
const currentSongIndex = ref(0);
const currentSong = ref(null);
const audioElement = ref(null);
const currentTime = ref(0);
const progress = ref(0);

// 播放状态
const isPlaying = ref(false);
const isMuted = ref(false);
const volume = ref(30); // 默认音量30

// 初始化
onMounted(async () => {
  try {
    // 加载所有歌曲数据
    allSongs.value = songData.mp3Files;

    // 设置当前歌曲为第一首
    if (allSongs.value.length > 0) {
      currentSong.value = allSongs.value[0];
    }

    // 创建音频元素
    audioElement.value = new Audio();

    // 设置音频源
    if (currentSong.value) {
      audioElement.value.src = currentSong.value.url;
      audioElement.value.volume = volume.value / 100;
    }

    // 音频事件监听
    audioElement.value.addEventListener('timeupdate', updateProgress);
    audioElement.value.addEventListener('ended', () => {
      playNext();
    });

  } catch (error) {
    console.error('加载音乐数据失败:', error);
  }
});

// 切换播放/暂停
const togglePlayPause = () => {
  if (!audioElement.value) return;

  try {
    if (isPlaying.value) {
      audioElement.value.pause();
    } else {
      // 尝试播放，并处理可能的自动播放限制错误
      audioElement.value.play().catch(err => {
        console.error('播放失败:', err);
        isPlaying.value = false;
        return;
      });
    }

    isPlaying.value = !isPlaying.value;
  } catch (err) {
    console.error('播放控制错误:', err);
  }
};

// 切换静音
const toggleMute = () => {
  if (!audioElement.value) return;

  isMuted.value = !isMuted.value;
  audioElement.value.muted = isMuted.value;
};

// 播放上一首
const playPrevious = () => {
  if (allSongs.value.length <= 1) return;

  currentSongIndex.value = (currentSongIndex.value - 1 + allSongs.value.length) % allSongs.value.length;
  loadSong(currentSongIndex.value);
};

// 播放下一首
const playNext = () => {
  if (allSongs.value.length <= 1) return;

  currentSongIndex.value = (currentSongIndex.value + 1) % allSongs.value.length;
  loadSong(currentSongIndex.value);
};

// 加载歌曲
const loadSong = (index) => {
  if (!audioElement.value) return;

  // 保存當前播放狀態
  const wasPlaying = isPlaying.value;

  // 暫停當前播放
  if (isPlaying.value) {
    audioElement.value.pause();
  }

  // 更新當前歌曲
  currentSong.value = allSongs.value[index];
  audioElement.value.src = currentSong.value.url;
  audioElement.value.load();

  // 如果之前正在播放，則繼續播放新歌曲
  if (wasPlaying) {
    audioElement.value.play().catch(err => {
      console.error('無法自動播放歌曲:', err);
      isPlaying.value = false;
    });
  } else {
    isPlaying.value = false;
  }
};

// 更新进度
const updateProgress = () => {
  if (!audioElement.value) return;

  currentTime.value = audioElement.value.currentTime;
  progress.value = (audioElement.value.currentTime / audioElement.value.duration) * 100 || 0;
};

// 修改进度
const onProgressChange = () => {
  if (!audioElement.value) return;

  const newTime = (progress.value / 100) * audioElement.value.duration;
  audioElement.value.currentTime = newTime;
  currentTime.value = newTime;
};

// 格式化时间
const formatTime = (timeInSeconds) => {
  if (!timeInSeconds) return '0:00';

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

// 监听音量变化
watch(volume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume / 100;
  }
});

// 组件卸载时清理
const cleanupAudio = () => {
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', updateProgress);
    audioElement.value.removeEventListener('ended', playNext);
    audioElement.value.pause();
    audioElement.value = null;
  }
};

// 注册组件卸载时的清理函数
onUnmounted(cleanupAudio);
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
  transform-origin: center center;
  /* 添加 will-change 提高旋转性能 */
  will-change: transform;
  /* 添加过渡效果，使暂停更平滑 */
  transition: animation-play-state 0.2s ease;
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