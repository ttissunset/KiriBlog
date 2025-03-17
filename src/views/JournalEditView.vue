<template>
  <MainLayout>
    <div class="journal-edit-container">
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>写随笔</h3>
        </div>
        
        <div class="sidebar-section">
          <h4>日期设置</h4>
          <div class="form-group">
            <label>日期</label>
            <input type="date" v-model="journalDate" class="form-control" />
          </div>
          <div class="form-group">
            <label>时间</label>
            <input type="time" v-model="journalTime" class="form-control" />
          </div>
        </div>
        
        <div class="sidebar-section">
          <h4>心情</h4>
          <div class="mood-selector">
            <button 
              v-for="mood in moods" 
              :key="mood.value" 
              class="mood-btn" 
              :class="{ active: selectedMood === mood.value }"
              @click="selectedMood = mood.value"
            >
              {{ mood.icon }} {{ mood.label }}
            </button>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h4>天气</h4>
          <div class="weather-selector">
            <button 
              v-for="weather in weathers" 
              :key="weather.value" 
              class="weather-btn" 
              :class="{ active: selectedWeather === weather.value }"
              @click="selectedWeather = weather.value"
            >
              {{ weather.icon }} {{ weather.label }}
            </button>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h4>标签</h4>
          <div class="tags-input">
            <div class="tags-container">
              <span v-for="(tag, index) in tags" :key="index" class="tag">
                {{ tag }}
                <button class="tag-remove" @click="removeTag(index)">×</button>
              </span>
            </div>
            <div class="tag-input-container">
              <input 
                type="text" 
                v-model="newTag" 
                @keydown.enter="addTag" 
                placeholder="添加标签..." 
                class="tag-input form-control"
              />
              <button class="add-tag-btn" @click="addTag">+</button>
            </div>
          </div>
        </div>
        
        <div class="actions-container">
          <button class="action-btn save-btn" @click="saveJournal">保存</button>
          <button class="action-btn preview-btn" @click="previewJournal">预览</button>
          <button class="action-btn cancel-btn" @click="cancelEdit">取消</button>
        </div>
      </div>
      
      <div class="editor-container">
        <div class="editor-header">
          <input type="text" v-model="title" placeholder="标题..." class="title-input" />
          <div class="editor-info">
            <span class="word-count">{{ wordCount }} 个字</span>
            <span class="save-status">{{ saveStatus }}</span>
          </div>
        </div>
        
        <div class="editor-content">
          <textarea 
            v-model="content" 
            placeholder="记录你的想法..." 
            class="content-textarea"
            @input="updateWordCount"
          ></textarea>
          
          <div v-if="isPreviewMode" class="preview-content">
            <div class="preview-title">{{ title || '无标题' }}</div>
            <div class="preview-meta">
              <span class="preview-date">{{ formattedDate }}</span>
              <span class="preview-mood">{{ getMoodLabel() }}</span>
              <span class="preview-weather">{{ getWeatherLabel() }}</span>
            </div>
            <div class="preview-body" v-html="renderedContent"></div>
            <div class="preview-tags">
              <span v-for="(tag, index) in tags" :key="index" class="preview-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import { marked } from 'marked';
import MainLayout from '../layouts/Header.vue';

const router = useRouter();

// 随笔编辑状态
const title = ref('');
const content = ref('');
const journalDate = ref(format(new Date(), 'yyyy-MM-dd'));
const journalTime = ref(format(new Date(), 'HH:mm'));
const tags = ref([]);
const newTag = ref('');
const selectedMood = ref('happy');
const selectedWeather = ref('sunny');
const wordCount = ref(0);
const saveStatus = ref('未保存');
const isPreviewMode = ref(false);

// 心情选项
const moods = [
  { icon: '😊', label: '开心', value: 'happy' },
  { icon: '😔', label: '低落', value: 'sad' },
  { icon: '😌', label: '平静', value: 'calm' },
  { icon: '🤔', label: '思考', value: 'thinking' },
  { icon: '😤', label: '生气', value: 'angry' },
  { icon: '😴', label: '疲惫', value: 'tired' }
];

// 天气选项
const weathers = [
  { icon: '☀️', label: '晴朗', value: 'sunny' },
  { icon: '☁️', label: '多云', value: 'cloudy' },
  { icon: '🌧️', label: '雨天', value: 'rainy' },
  { icon: '❄️', label: '雪天', value: 'snowy' },
  { icon: '🌫️', label: '雾天', value: 'foggy' },
  { icon: '⛈️', label: '雷雨', value: 'storm' }
];

// 格式化日期显示
const formattedDate = computed(() => {
  try {
    const date = new Date(`${journalDate.value}T${journalTime.value}`);
    return format(date, 'yyyy年MM月dd日 HH:mm');
  } catch (e) {
    return '日期无效';
  }
});

// 获取心情标签
const getMoodLabel = () => {
  const mood = moods.find(m => m.value === selectedMood.value);
  return mood ? `${mood.icon} ${mood.label}` : '';
};

// 获取天气标签
const getWeatherLabel = () => {
  const weather = weathers.find(w => w.value === selectedWeather.value);
  return weather ? `${weather.icon} ${weather.label}` : '';
};

// 使用marked渲染Markdown内容
const renderedContent = computed(() => {
  return marked(content.value || '');
});

// 添加标签
const addTag = () => {
  if (newTag.value.trim() && !tags.value.includes(newTag.value.trim())) {
    tags.value.push(newTag.value.trim());
    newTag.value = '';
  }
};

// 移除标签
const removeTag = (index) => {
  tags.value.splice(index, 1);
};

// 更新字数统计
const updateWordCount = () => {
  wordCount.value = content.value.trim().length;
  saveStatus.value = '未保存';
};

// 保存随笔
const saveJournal = () => {
  // TODO: 实现保存到数据存储的逻辑
  saveStatus.value = '已保存';
  setTimeout(() => {
    router.push('/journal');
  }, 500);
};

// 预览随笔
const previewJournal = () => {
  isPreviewMode.value = !isPreviewMode.value;
};

// 取消编辑
const cancelEdit = () => {
  if (confirm('确认要放弃当前编辑内容吗？')) {
    router.push('/journal');
  }
};

// 自动保存草稿
watch([title, content], () => {
  // 每次内容变更保存到本地存储
  localStorage.setItem('journal_draft', JSON.stringify({
    title: title.value,
    content: content.value,
    date: journalDate.value,
    time: journalTime.value,
    mood: selectedMood.value,
    weather: selectedWeather.value,
    tags: tags.value
  }));
}, { deep: true });

// 组件挂载时尝试恢复草稿
onMounted(() => {
  try {
    const savedDraft = localStorage.getItem('journal_draft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      title.value = draft.title || '';
      content.value = draft.content || '';
      journalDate.value = draft.date || format(new Date(), 'yyyy-MM-dd');
      journalTime.value = draft.time || format(new Date(), 'HH:mm');
      selectedMood.value = draft.mood || 'happy';
      selectedWeather.value = draft.weather || 'sunny';
      tags.value = draft.tags || [];
      
      updateWordCount();
    }
  } catch (e) {
    console.error('Error restoring draft:', e);
  }
});
</script>

<style scoped>
.journal-edit-container {
  display: flex;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  padding: 20px;
}

.sidebar {
  width: 300px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
}

.sidebar-header {
  padding-bottom: 15px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.sidebar-header h3 {
  font-size: 1.3rem;
  margin: 0;
  color: var(--text-color);
}

.sidebar-section {
  padding-bottom: 20px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.sidebar-section h4 {
  font-size: 1rem;
  margin: 0 0 12px 0;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #666;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: white;
}

.mood-selector, .weather-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.mood-btn, .weather-btn {
  padding: 8px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.mood-btn:hover, .weather-btn:hover {
  border-color: rgba(0, 0, 0, 0.2);
}

.mood-btn.active, .weather-btn.active {
  background-color: var(--link-color);
  color: white;
  border-color: var(--link-color);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 0.85rem;
}

.tag-remove {
  background: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  color: #999;
  font-size: 1rem;
  padding: 0 0 0 3px;
}

.tag-input-container {
  display: flex;
  gap: 8px;
}

.tag-input {
  flex: 1;
  padding: 8px;
}

.add-tag-btn {
  background-color: #f0f0f0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 36px;
  cursor: pointer;
  font-size: 1.2rem;
}

.actions-container {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  padding: 12px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-btn {
  background-color: var(--link-color);
  color: white;
}

.preview-btn {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-color);
}

.cancel-btn {
  background-color: rgba(255, 0, 0, 0.05);
  color: #d32f2f;
}

.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.02);
}

.editor-header {
  padding: 20px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-input {
  font-size: 1.5rem;
  padding: 8px 0;
  border: none;
  background-color: transparent;
  color: var(--text-color);
  width: 70%;
  font-weight: 500;
}

.title-input:focus {
  outline: none;
}

.editor-info {
  font-size: 0.9rem;
  color: #666;
  display: flex;
  gap: 15px;
}

.editor-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.content-textarea {
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  resize: none;
  font-size: 1.05rem;
  line-height: 1.6;
  background-color: transparent;
  color: var(--text-color);
}

.content-textarea:focus {
  outline: none;
}

.preview-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  overflow-y: auto;
}

.preview-title {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 15px;
  color: var(--text-color);
}

.preview-meta {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.preview-body {
  line-height: 1.7;
  color: var(--text-color);
}

.preview-tags {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preview-tag {
  padding: 4px 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #666;
}

@media (max-width: 768px) {
  .journal-edit-container {
    flex-direction: column;
    height: auto;
  }
  
  .sidebar {
    width: 100%;
    order: 2;
  }
  
  .editor-container {
    flex: none;
    min-height: 350px;
    order: 1;
  }
}
</style> 