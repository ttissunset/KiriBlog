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
            <h3>图片信息</h3>
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
              <span class="info-value">{{
                formatCameraTime(selectedImage.date || "2023-06-15T14:35:00")
              }}</span>
            </div>

            <div class="info-description">
              <h4>照片描述</h4>
              <p>
                {{
                  selectedImage.description ||
                  "这是一张精美的照片，捕捉了瞬间的美好。"
                }}
              </p>
            </div>

            <div class="info-location">
              <h4>拍摄地点</h4>
              <p>湖南省长沙市</p>
            </div>

            <div class="save-image-btn">
              <button @click="saveImage" class="save-button">
                <MaterialIcon icon="download" />
                保存图片
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 接收父组件传递的选中图片对象
const props = defineProps({
  selectedImage: {
    type: Object,
    default: null,
  },
});

// 定义向父组件触发的事件
const emit = defineEmits(["close"]);

// 关闭查看器，通知父组件
const closeViewer = () => {
  emit("close");
};

// 格式化相机拍摄时间，将ISO日期字符串格式化为易读格式
const formatCameraTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// 保存图片
const saveImage = () => {
  if (!props.selectedImage || !props.selectedImage.url) return;

  // 创建一个链接元素来下载图片
  const link = document.createElement('a');
  link.href = props.selectedImage.url;

  // 从URL中提取文件名，如果没有则使用默认名称
  const filename = props.selectedImage.url.split('/').pop() || 'image.jpg';
  link.download = filename;

  // 触发点击以下载图片
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 简单提示成功消息
  alert("图片已保存成功");
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
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  color: rgb(136, 125, 125);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  transform-origin: center center;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.close-btn:hover {
  background-color: rgba(236, 61, 61, 0.726);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
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

.info-description,
.info-location {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.info-description h4,
.info-location h4 {
  font-size: 1rem;
  margin: 0 0 10px 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.info-description p,
.info-location p {
  line-height: 1.6;
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

.save-image-btn {
  margin-top: 20px;
}

.save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background-color: var(--primary-color, #2196f3);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3);
}

.save-button:hover {
  background-color: var(--primary-color-dark, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(33, 150, 243, 0.4);
}

.save-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2);
}

.save-button svg {
  transition: transform 0.2s ease;
}

.save-button:hover svg {
  transform: translateY(2px);
}
</style>
