<template>
  <MainLayout>
    <div class="journal-page">
      <!-- 左侧日历 -->
      <div class="calendar-section">
        <div class="calendar-header">
          <button class="calendar-nav-btn" @click="prevMonth">
            <span class="nav-icon">‹</span>
          </button>
          <h2 class="current-date">{{ currentYear }}年{{ currentMonth }}月{{ currentDay }}日</h2>
          <button class="calendar-nav-btn" @click="nextMonth">
            <span class="nav-icon">›</span>
          </button>
        </div>
        
        <!-- 星期表头 -->
        <div class="calendar-weekdays">
          <div class="weekday">日</div>
          <div class="weekday">一</div>
          <div class="weekday">二</div>
          <div class="weekday">三</div>
          <div class="weekday">四</div>
          <div class="weekday">五</div>
          <div class="weekday">六</div>
        </div>
        
        <!-- 日期网格 -->
        <div class="calendar-grid">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="calendar-day"
            :class="{
              'current-month': day.currentMonth,
              'today': day.isToday,
              'selected': isSelectedDay(day.date),
              'has-journal': hasJournalEntry(day.date)
            }"
            @click="selectDay(day.date)"
          >
            {{ day.day }}
          </div>
        </div>
        
        <!-- 那些浅浅的叙述 -->
        <div class="journal-subtitle">
          <h3 class="subtitle-text">那些</h3>
          <h2 class="subtitle-highlight">浅浅的叙述</h2>
          <p class="subtitle-desc">希望能留有痕迹</p>
        </div>
        
        <!-- 随记列表 -->
        <div class="journal-list">
          <div 
            v-for="(entry, index) in journalEntries" 
            :key="index"
            class="journal-entry-item"
            :class="{ 'active': selectedJournalId === entry.id }"
            @click="selectJournal(entry.id)"
          >
            <div class="entry-date">{{ formatDate(entry.date) }}</div>
            <div class="entry-title">{{ entry.title }}</div>
          </div>
          
          <div v-if="journalEntries.length === 0" class="empty-journal-list">
            暂无随记
          </div>
        </div>
      </div>
      
      <!-- 右侧随记内容 -->
      <div class="journal-content-section">
        <div v-if="selectedJournal" class="journal-content">
          <div class="journal-header">
            <div class="journal-title-row">
              <h1 class="journal-title">{{ selectedJournal.title }}</h1>
              <div class="journal-date-time">
                {{ formatDate(selectedJournal.date) }} {{ formatTime(selectedJournal.date) }}
                <span class="journal-weather" v-if="selectedJournal.weather">{{ selectedJournal.weather }}</span>
              </div>
            </div>
          </div>
          
          <div class="journal-text" v-html="formatJournalContent(selectedJournal.content)"></div>
          
          <div v-if="selectedJournal.image" class="journal-image">
            <img :src="selectedJournal.image" :alt="selectedJournal.title" />
          </div>
          
          <div class="journal-footer">
            <div class="journal-signature" v-if="selectedJournal.signature">
              {{ selectedJournal.signature }}
            </div>
          </div>
        </div>
        
        <div v-else class="empty-journal">
          <div class="empty-prompt">
            <div class="empty-icon">📝</div>
            <p>今日还没有随记</p>
            <p class="empty-sub">记录下今天的所思所想吧</p>
            <button class="new-journal-btn" @click="createNewJournal">写今日随记</button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { useRouter } from 'vue-router'
import MainLayout from '../layouts/Header.vue'

const router = useRouter()

// 当前日期状态
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const selectedJournalId = ref(null)

// 计算当前年、月、日
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)
const currentDay = computed(() => selectedDate.value.getDate())

// 模拟随记数据
const journalData = ref([
  {
    id: 1,
    title: '运动后的酸痛',
    date: '2023-03-03T07:57:00.000Z',
    content: `新年后打了第一场排球，今天起来全身酸痛，每一次打球都在测量这一段时间有没有锻炼。这段时间太懒，体能大幅降低了。大把时间都耗在电脑旁前，我应该多活动的位置，特别是晚上下班回家一样，也是坐在电脑旁前，

对着屏幕。我应该多做一些运动，比如压一下腿做做深蹲，做几个俯卧撑...昨天一起打球的同学，明明平时也很少锻炼，但两周之后

就有些力不从心。大口喘气，腿酸无力，手臂酸软，始终扣不起来，动作迟缓才刚开始。看着场上的大家潇洒的方

式，我还是喜欢这项运动，今天的腿酸希望快快恢复一点，开始参与更多基础运动，让排球变得更长久的陪伴。最近还着眼于打羽毛球，不过还没有什么技术，或许就是技术不行，感觉打完

球都不那么累。有打羽毛球的伙伴吗？打打球聊聊天，带上我进步进步，下次再回来。`,
    weather: '☁️',
    signature: '✎',
    image: '/src/assets/basketball-court.jpg'
  },
  {
    id: 4,
    title: '2025年3月16日',
    date: '2025-03-16T10:00:00.000Z',
    content: `今天是个特别的日子，像往常一样早起，但心情格外愉快。天气晴朗，阳光明媚，让人忍不住想出门走走。

早上去了附近的公园，看到很多人在晨练，孩子们在草地上玩耍，一切都充满了生机。坐在湖边的长椅上，看着水面上的波光粼粼，思绪也变得清晰起来。

这段时间工作很忙，几乎没有时间好好休息。今天终于可以放松一下，给自己一点喘息的空间。有时候我们太过关注目标和结果，忘记了享受过程的重要性。

下午约了几个朋友一起吃饭，聊了很多近况和未来的计划。朋友们都很支持我的决定，这让我更有信心了。真的很感谢能有这样的朋友在身边。

晚上回家，整理了一下最近的照片和笔记。发现记录生活真的是一件很有意义的事情，可以在未来的某一天回头看看，找回那些被遗忘的小确幸。

希望明天也是个好天气，我计划去爬山，呼吸一下新鲜空气，让身心都得到放松。`,
    weather: '☀️',
    signature: '✎',
  },
  {
    id: 2,
    title: '春日小记',
    date: '2023-03-01T10:30:00.000Z',
    content: `今天的阳光格外明媚，花园里的樱花开始绽放。春天真的来了，感觉整个世界都充满了活力。\n\n早晨去公园散步，看到很多人在晨练，空气中弥漫着清新的气息。回来的路上买了一束鲜花，放在书桌上，每次抬头都能看到，心情也会变得更愉快。`,
    weather: '☀️',
    signature: '✎'
  },
  {
    id: 3,
    title: '读书笔记',
    date: '2023-02-25T16:45:00.000Z',
    content: `最近在读《原子习惯》，这本书讲述了如何通过微小的改变累积成巨大的成果。\n\n特别喜欢书中提到的"身份认同"概念，我们的习惯最终会成为我们身份的一部分。如果想要改变习惯，首先需要改变对自己的看法。\n\n明天开始尝试书中的方法，每天进步1%。`,
    weather: '🌤️',
    signature: '✎'
  }
])

// 获取当前月份的所有日期
const calendarDays = computed(() => {
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(currentDate.value)
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // 填充开始空白
  const startDay = monthStart.getDay()
  const daysWithPadding = []
  
  // 填充上个月的日期
  for (let i = 0; i < startDay; i++) {
    const prevDate = new Date(monthStart)
    prevDate.setDate(prevDate.getDate() - (startDay - i))
    daysWithPadding.push({
      date: prevDate,
      day: prevDate.getDate(),
      currentMonth: false,
      isToday: isSameDay(prevDate, new Date())
    })
  }
  
  // 当月日期
  allDays.forEach(date => {
    daysWithPadding.push({
      date: date,
      day: date.getDate(),
      currentMonth: true,
      isToday: isSameDay(date, new Date())
    })
  })
  
  // 填充下个月的日期
  const endDay = monthEnd.getDay()
  const remainingSlots = 6 - endDay
  
  for (let i = 1; i <= remainingSlots; i++) {
    const nextDate = new Date(monthEnd)
    nextDate.setDate(nextDate.getDate() + i)
    daysWithPadding.push({
      date: nextDate,
      day: nextDate.getDate(),
      currentMonth: false,
      isToday: isSameDay(nextDate, new Date())
    })
  }
  
  return daysWithPadding
})

// 筛选当前显示的随记列表
const journalEntries = computed(() => {
  const currentMonthStart = new Date(currentYear.value, currentMonth.value - 1, 1)
  const currentMonthEnd = new Date(currentYear.value, currentMonth.value, 0)
  
  return journalData.value.filter(entry => {
    const entryDate = new Date(entry.date)
    return entryDate >= currentMonthStart && entryDate <= currentMonthEnd
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
})

// 获取选中的随记
const selectedJournal = computed(() => {
  if (!selectedJournalId.value) return null
  return journalData.value.find(entry => entry.id === selectedJournalId.value)
})

// 日历导航
const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

const prevMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

// 选择日期
const selectDay = (date) => {
  selectedDate.value = date
  
  // 查找该日期是否有随记
  const journal = journalData.value.find(entry => isSameDay(new Date(entry.date), date))
  if (journal) {
    selectedJournalId.value = journal.id
  } else {
    selectedJournalId.value = null
  }
}

// 选择随记
const selectJournal = (id) => {
  selectedJournalId.value = id
  const journal = journalData.value.find(entry => entry.id === id)
  if (journal) {
    selectedDate.value = new Date(journal.date)
  }
}

// 检查日期是否被选中
const isSelectedDay = (date) => {
  return isSameDay(date, selectedDate.value)
}

// 检查某一天是否有随记
const hasJournalEntry = (date) => {
  return journalData.value.some(entry => isSameDay(new Date(entry.date), date))
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

// 格式化时间
const formatTime = (dateString) => {
  const date = new Date(dateString)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

// 格式化随记内容，保留换行并使用p标签包裹段落
const formatJournalContent = (content) => {
  // 将文本按段落分割，并用p标签包裹每个段落
  const paragraphs = content.split('\n\n');
  return paragraphs.map(p => {
    // 处理段落内的单行换行
    const lines = p.split('\n').join('<br>');
    return `<p>${lines}</p>`;
  }).join('');
}

// 创建新随记（占位函数）
const createNewJournal = () => {
  router.push('/journal/edit')
}

// 组件挂载时
onMounted(() => {
  // 获取当前日期
  const today = new Date();
  selectedDate.value = today;
  
  // 查找今天的随记
  const todayJournal = journalData.value.find(entry => isSameDay(new Date(entry.date), today));
  
  if (todayJournal) {
    // 如果今天有随记，选中它
    selectedJournalId.value = todayJournal.id;
  } else if (journalEntries.value.length > 0) {
    // 如果今天没有随记但本月有随记，选中本月第一篇
    selectedJournalId.value = journalEntries.value[0].id;
  }
  
  // 确保当前显示的月份是今天所在的月份
  currentDate.value = today;
})
</script>

<style scoped>
/* 随记页面整体布局 */
.journal-page {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  margin-top: 24px;
}

/* 左侧日历部分 */
.calendar-section {
  background-color: rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.current-date {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

.calendar-nav-btn {
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.2rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.calendar-nav-btn:hover {
  background-color: var(--button-hover);
}

/* 星期表头 */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 10px 0;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.weekday {
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.7;
  font-weight: 500;
}

/* 日期网格 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 42px);
  text-align: center;
  padding: 0 5px 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  cursor: pointer;
  position: relative;
  color: var(--text-color);
  transition: all 0.2s ease;
  margin: 2px;
  border-radius: 50%;
  height: 38px;
  width: 38px;
}

.calendar-day:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.calendar-day:not(.current-month) {
  opacity: 0.3;
}

.calendar-day.today {
  font-weight: 700;
  color: var(--link-color);
  border: 1px solid var(--link-color);
}

.calendar-day.selected {
  background-color: var(--link-color);
  color: white;
  font-weight: 600;
  transform: scale(1.05);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.calendar-day.has-journal::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: var(--link-color);
  border-radius: 50%;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}

.calendar-day.selected.has-journal::after {
  background-color: white;
}

/* 随记标题部分 */
.journal-subtitle {
  padding: 25px 15px 15px;
  border-bottom: 1px solid var(--border-color);
}

.subtitle-text {
  font-size: 1.2rem;
  color: var(--text-color);
  margin: 0;
  opacity: 0.6;
  font-weight: normal;
}

.subtitle-highlight {
  font-size: 2rem;
  color: var(--text-color);
  margin: 5px 0;
  opacity: 0.4;
  font-weight: 200;
}

.subtitle-desc {
  font-size: 0.9rem;
  color: var(--text-color);
  margin: 5px 0 0;
  opacity: 0.6;
}

/* 随记列表 */
.journal-list {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.journal-entry-item {
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.journal-entry-item:hover {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.journal-entry-item.active {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: var(--link-color);
  border-left: 3px solid var(--link-color);
}

.entry-date {
  font-size: 0.75rem;
  opacity: 0.65;
  color: var(--text-color);
  margin-bottom: 4px;
}

.entry-title {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-color);
  font-size: 1rem;
}

.empty-journal-list {
  text-align: center;
  padding: 20px 0;
  color: var(--text-color);
  opacity: 0.6;
}

/* 右侧随记内容 */
.journal-content-section {
  border-radius: 12px;
  overflow: hidden;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.01);
}

.journal-header {
  margin-bottom: 20px;
}

.journal-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.journal-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-color);
}

.journal-date-time {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 5px;
}

.journal-weather {
  font-size: 1.1rem;
}

.journal-text {
  line-height: 2;
  color: var(--text-color);
  margin: 20px 0 30px;
}

/* 段落之间的下划线效果 */
.journal-text p {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
}

.journal-text p:last-child {
  border-bottom: none;
}

.journal-image {
  margin: 30px 0;
  border-radius: 8px;
  overflow: hidden;
}

.journal-image img {
  width: 100%;
  height: auto;
  display: block;
}

.journal-footer {
  margin-top: 40px;
  text-align: right;
}

.journal-signature {
  font-size: 1.5rem;
  color: var(--text-color);
  opacity: 0.7;
}

/* 空随记状态 */
.empty-journal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.4;
}

.empty-prompt p {
  font-size: 1.1rem;
  margin: 0 0 10px;
  color: var(--text-color);
}

.empty-sub {
  font-size: 0.9rem;
  opacity: 0.7;
}

.new-journal-btn {
  margin-top: 20px;
  background-color: var(--link-color);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.new-journal-btn:hover {
  background-color: var(--link-hover);
  transform: translateY(-2px);
}

/* 响应式调整 */
@media (max-width: 900px) {
  .journal-page {
    grid-template-columns: 1fr;
  }
  
  .calendar-section {
    margin-bottom: 20px;
  }
}

.journal-date {
  color: var(--link-color);
  opacity: 0.85;
  margin-right: 15px;
}

.journal-weather {
  font-size: 1rem;
}
</style> 