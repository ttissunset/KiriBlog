<template>
  <MainLayout>
    <div class="new-journal-page">
      <div class="page-header">
        <h1>新建随记</h1>
        <p>记录生活中的点滴感悟</p>
      </div>
      
      <div class="journal-form">
        <div class="form-group">
          <label for="title">标题</label>
          <input 
            type="text" 
            id="title" 
            v-model="journalData.title" 
            placeholder="给你的随记起个标题" 
            class="form-control" 
          />
        </div>
        
        <div class="form-row">
          <div class="form-group date-group">
            <label for="date">日期</label>
            <input 
              type="date" 
              id="date" 
              v-model="journalData.date" 
              class="form-control" 
            />
          </div>
          
          <div class="form-group time-group">
            <label for="time">时间</label>
            <input 
              type="time" 
              id="time" 
              v-model="journalData.time" 
              class="form-control" 
            />
          </div>
          
          <div class="form-group weather-group">
            <label for="weather">天气</label>
            <div class="weather-selector">
              <button 
                v-for="emoji in weatherOptions" 
                :key="emoji"
                type="button"
                class="weather-option"
                :class="{ 'active': journalData.weather === emoji }"
                @click="journalData.weather = emoji"
              >
                {{ emoji }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="content">内容</label>
          <textarea 
            id="content" 
            v-model="journalData.content" 
            placeholder="记录下你的所思所想..." 
            class="form-control content-textarea" 
            rows="12"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="image">图片 (可选)</label>
          <div class="image-upload">
            <input 
              type="file" 
              id="image" 
              ref="imageInput"
              @change="handleImageUpload" 
              accept="image/*" 
              class="image-input" 
            />
            <label for="image" class="upload-label">
              <span class="upload-icon">+</span>
              <span class="upload-text">{{ imageUploadText }}</span>
            </label>
            
            <div v-if="journalData.imagePreview" class="image-preview">
              <img :src="journalData.imagePreview" alt="预览图片" />
              <button type="button" class="remove-image" @click="removeImage">×</button>
            </div>
          </div>
        </div>
        
        <div class="form-group signature-group">
          <label for="signature">签名 (可选)</label>
          <input 
            type="text" 
            id="signature" 
            v-model="journalData.signature" 
            placeholder="你的签名" 
            class="form-control" 
          />
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancelJournal">取消</button>
          <button type="button" class="save-btn" @click="saveJournal" :disabled="!isFormValid">保存随记</button>
        </div>
      </div>
      
      <!-- 预览部分 -->
      <div v-if="showPreview" class="preview-section">
        <div class="preview-header">
          <h2>预览</h2>
          <button type="button" class="close-preview" @click="showPreview = false">关闭</button>
        </div>
        
        <div class="journal-preview">
          <div class="preview-title-row">
            <h1 class="preview-title">{{ journalData.title || '无标题' }}</h1>
            <div class="preview-date">
              {{ formatDate }} {{ formatTime }}
              <span v-if="journalData.weather">{{ journalData.weather }}</span>
            </div>
          </div>
          
          <div class="preview-content">
            <p v-for="(paragraph, index) in contentParagraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
          
          <div v-if="journalData.imagePreview" class="preview-image">
            <img :src="journalData.imagePreview" :alt="journalData.title" />
          </div>
          
          <div v-if="journalData.signature" class="preview-signature">
            {{ journalData.signature }}
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const router = useRouter()

// 天气选项
const weatherOptions = ['☀️', '🌤️', '☁️', '🌧️', '⛈️', '❄️', '🌫️', '🌪️'];

// 表单数据
const journalData = ref({
  title: '',
  date: '',
  time: '',
  content: '',
  weather: '',
  signature: '',
  image: null,
  imagePreview: null
});

// 显示预览状态
const showPreview = ref(false);

// 图片上传相关
const imageInput = ref(null);
const imageUploadText = computed(() => 
  journalData.value.imagePreview ? '更换图片' : '选择图片'
);

// 格式化日期和时间
const formatDate = computed(() => {
  if (!journalData.value.date) return '';
  const date = new Date(journalData.value.date);
  return `${date.getMonth() + 1}-${date.getDate()}`;
});

const formatTime = computed(() => {
  if (!journalData.value.time) return '';
  return journalData.value.time;
});

// 段落分割
const contentParagraphs = computed(() => {
  if (!journalData.value.content) return [];
  return journalData.value.content.split('\n\n').filter(p => p.trim());
});

// 表单验证
const isFormValid = computed(() => {
  return journalData.value.title.trim() && 
         journalData.value.date && 
         journalData.value.content.trim();
});

// 处理图片上传
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // 检查文件类型
  if (!file.type.match('image.*')) {
    alert('请选择图片文件！');
    return;
  }
  
  // 创建图片预览
  const reader = new FileReader();
  reader.onload = (e) => {
    journalData.value.imagePreview = e.target.result;
    journalData.value.image = file;
  };
  reader.readAsDataURL(file);
};

// 移除图片
const removeImage = () => {
  journalData.value.image = null;
  journalData.value.imagePreview = null;
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

// 保存随记
const saveJournal = () => {
  if (!isFormValid.value) {
    alert('请填写必填字段后再保存');
    return;
  }
  
  // 在实际应用中，这里应该将数据提交到后端存储
  // 这里仅作为演示，将随记数据保存到localStorage
  const timestamp = new Date().toISOString();
  const journal = {
    id: Date.now(), // 使用时间戳作为ID
    title: journalData.value.title,
    date: `${journalData.value.date}T${journalData.value.time || '00:00'}:00.000Z`,
    content: journalData.value.content,
    weather: journalData.value.weather,
    signature: journalData.value.signature,
    imageUrl: journalData.value.imagePreview, // 实际应用中应该上传图片并保存URL
    createdAt: timestamp,
    updatedAt: timestamp
  };
  
  // 保存到localStorage
  let journals = JSON.parse(localStorage.getItem('journals') || '[]');
  journals.push(journal);
  localStorage.setItem('journals', JSON.stringify(journals));
  
  alert('随记保存成功！');
  router.push('/journal'); // 保存后跳转到随记列表页
};

// 取消创建
const cancelJournal = () => {
  if (confirm('确定要取消创建吗？已填写的内容将会丢失。')) {
    router.push('/journal');
  }
};

// 组件挂载时，设置默认日期和时间
onMounted(() => {
  const now = new Date();
  
  // 设置默认日期（YYYY-MM-DD格式）
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  journalData.value.date = `${year}-${month}-${day}`;
  
  // 设置默认时间（HH:MM格式）
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  journalData.value.time = `${hours}:${minutes}`;
});
</script>

<style scoped>
.new-journal-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 8px;
  color: var(--text-color);
}

.page-header p {
  color: var(--text-color);
  opacity: 0.7;
}

.journal-form {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  padding: 30px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 15px;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}

.form-control {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--link-color);
  box-shadow: 0 0 0 3px rgba(var(--link-color-rgb, 50, 115, 220), 0.1);
}

.content-textarea {
  resize: vertical;
  min-height: 250px;
  line-height: 1.6;
}

/* 天气选择器 */
.weather-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.weather-option {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.weather-option:hover {
  background-color: var(--button-hover);
}

.weather-option.active {
  background-color: var(--link-color);
  color: white;
  border-color: var(--link-color);
}

/* 图片上传 */
.image-upload {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image-input {
  display: none;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  justify-content: center;
}

.upload-label:hover {
  background-color: var(--button-hover);
  border-color: var(--link-color);
}

.upload-icon {
  font-size: 1.5rem;
  opacity: 0.6;
}

.image-preview {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 10px;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.remove-image {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.remove-image:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* 表单操作 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.cancel-btn, .save-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background-color: var(--button-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.save-btn {
  background-color: var(--link-color);
  color: white;
  border: none;
}

.cancel-btn:hover {
  background-color: var(--button-hover);
}

.save-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 预览部分 */
.preview-section {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  padding: 30px;
  margin-top: 30px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.preview-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-color);
}

.close-preview {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-preview:hover {
  opacity: 1;
}

/* 预览内容样式 */
.preview-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--link-color);
  margin-bottom: 20px;
}

.preview-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-color);
}

.preview-date {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
}

.preview-content {
  line-height: 2;
  color: var(--text-color);
  margin: 20px 0;
}

.preview-content p {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.preview-content p:last-child {
  border-bottom: none;
}

.preview-image {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: block;
}

.preview-signature {
  text-align: right;
  font-size: 1.5rem;
  color: var(--text-color);
  opacity: 0.7;
  margin-top: 30px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .journal-form {
    padding: 20px;
  }
  
  .preview-title-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .preview-date {
    margin-top: 10px;
  }
}
</style> 