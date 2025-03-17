<template>
  <div v-if="selectedImage" class="image-viewer" @click.self="closeViewer">
    <div class="image-viewer-content">
      <button class="close-btn" @click="closeViewer">×</button>
      
      <div class="viewer-container">
        <div class="viewer-main">
          <img :src="selectedImage.url" alt="Selected image" class="viewer-image" />
        </div>
        
        <div class="camera-info">
          <div class="camera-info-header">
            <h3>相机信息</h3>
          </div>
          <div class="camera-info-details">
            <div class="info-row">
              <span class="info-label">相机型号</span>
              <span class="info-value">Canon EOS R5</span>
            </div>
            <div class="info-row">
              <span class="info-label">镜头</span>
              <span class="info-value">RF 24-70mm F2.8L</span>
            </div>
            <div class="info-row">
              <span class="info-label">光圈</span>
              <span class="info-value">f/2.8</span>
            </div>
            <div class="info-row">
              <span class="info-label">快门速度</span>
              <span class="info-value">1/200s</span>
            </div>
            <div class="info-row">
              <span class="info-label">ISO</span>
              <span class="info-value">100</span>
            </div>
            <div class="info-row">
              <span class="info-label">焦距</span>
              <span class="info-value">35mm</span>
            </div>
            <div class="info-row">
              <span class="info-label">拍摄时间</span>
              <span class="info-value">{{ formatCameraTime(selectedImage.date || '2023-06-15T14:35:00') }}</span>
            </div>
            
            <div class="info-description">
              <h4>照片描述</h4>
              <p>{{ selectedImage.description || '这是一张精美的照片，捕捉了瞬间的美好。'}}</p>
            </div>
            
            <div class="info-location">
              <h4>拍摄地点</h4>
              <p>湖南省长沙市</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 接收父组件传递的选中图片对象
const props = defineProps({
  selectedImage: {
    type: Object,
    default: null
  }
});

// 定义向父组件触发的事件
const emit = defineEmits(['close']);

// 关闭查看器，通知父组件
const closeViewer = () => {
  emit('close');
};

// 格式化相机拍摄时间，将ISO日期字符串格式化为易读格式
const formatCameraTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
</script>

<style scoped>
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(30, 30, 30, 0.92);
  backdrop-filter: blur(15px);
}

.image-viewer-content {
  position: relative;
  width: 95%;
  height: 90%;
  max-width: 1800px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
}

.viewer-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  z-index: 1001;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.viewer-main {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 22, 0.5);
}

.viewer-image {
  max-width: 90%;
  max-height: 85vh;
  object-fit: contain;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
}

.camera-info {
  width: 320px;
  height: 100%;
  background-color: rgba(40, 40, 45, 0.95);
  padding: 25px;
  color: white;
  overflow-y: auto;
}

.camera-info-header {
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 15px;
}

.camera-info-header h3 {
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
}

.camera-info-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.info-value {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.info-description, .info-location {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.info-description h4, .info-location h4 {
  font-size: 1rem;
  margin: 0 0 10px 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.info-description p, .info-location p {
  line-height: 1.6;
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

@media (max-width: 768px) {
  .viewer-container {
    flex-direction: column;
  }
  
  .camera-info {
    width: 100%;
    height: auto;
    max-height: 40vh;
    padding: 15px;
  }
  
  .camera-info-header {
    margin-bottom: 15px;
    padding-bottom: 10px;
  }
  
  .camera-info-header h3 {
    font-size: 1.2rem;
  }
  
  .viewer-main {
    height: 60vh;
  }
  
  .viewer-image {
    max-height: 55vh;
  }
}
</style> 