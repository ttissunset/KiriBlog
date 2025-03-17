<template>
  <MainLayout>
    <div class="message-board">
      <!-- 留言板头部 -->
      <div class="message-board-header">
        <div class="header-content">
          <font-awesome-icon :icon="['fas', 'comments']" class="header-icon" />
          <div class="header-text">
            <h1>留言板</h1>
            <p>欢迎在此留下您的想法、建议或问题，与我交流互动</p>
          </div>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <font-awesome-icon :icon="['fas', 'comment']" class="stat-icon" />
            <div class="stat-info">
              <div class="stat-value">{{ messages.length }}</div>
              <div class="stat-label">条留言</div>
            </div>
          </div>
          <div class="stat-item">
            <font-awesome-icon :icon="['fas', 'reply']" class="stat-icon" />
            <div class="stat-info">
              <div class="stat-value">{{ getReplyCount() }}</div>
              <div class="stat-label">条回复</div>
            </div>
          </div>
          <div class="stat-item">
            <font-awesome-icon :icon="['fas', 'clock']" class="stat-icon" />
            <div class="stat-info">
              <div class="stat-value">{{ getLastActiveTime() }}</div>
              <div class="stat-label">最近活动</div>
            </div>
          </div>
        </div>
      </div>

      <div class="message-container">
        <!-- 左侧留言表单 -->
        <div class="message-form-section">
          <div class="section-header">
            <font-awesome-icon
              :icon="['fas', 'pencil-alt']"
              class="section-icon"
            />
            <h2>发表留言</h2>
          </div>

          <div class="message-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">
                  <font-awesome-icon
                    :icon="['fas', 'user']"
                    class="input-icon"
                  />
                  <span>昵称</span>
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="newMessage.author"
                  placeholder="您的昵称 (可选)"
                  class="form-control"
                />
              </div>

              <div class="form-group">
                <label for="email">
                  <font-awesome-icon
                    :icon="['fas', 'envelope']"
                    class="input-icon"
                  />
                  <span>邮箱</span>
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="newMessage.email"
                  placeholder="您的邮箱 (不会公开，可选)"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="content">
                <font-awesome-icon
                  :icon="['fas', 'comment-dots']"
                  class="input-icon"
                />
                <span>留言内容</span>
              </label>
              <textarea
                id="content"
                v-model="newMessage.content"
                placeholder="请输入留言内容..."
                class="form-control content-textarea"
                rows="5"
              ></textarea>
            </div>

            <div class="form-actions">
              <button
                @click="submitMessage"
                class="submit-btn"
                :disabled="!newMessage.content"
              >
                <font-awesome-icon :icon="['fas', 'paper-plane']" />
                <span>发表留言</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧留言列表 -->
        <div class="message-list-section">
          <div class="section-header">
            <font-awesome-icon :icon="['fas', 'list']" class="section-icon" />
            <h2>留言列表</h2>
            <div class="message-sort">
              <button
                @click="sortOrder = 'newest'"
                :class="{ active: sortOrder === 'newest' }"
                class="sort-btn"
              >
                最新
              </button>
              <button
                @click="sortOrder = 'oldest'"
                :class="{ active: sortOrder === 'oldest' }"
                class="sort-btn"
              >
                最早
              </button>
            </div>
          </div>

          <div class="message-list">
            <div v-if="sortedMessages.length === 0" class="no-messages">
              <font-awesome-icon
                :icon="['fas', 'comment-slash']"
                class="no-messages-icon"
              />
              <p>暂无留言</p>
              <p class="no-messages-sub">成为第一个留言的人吧！</p>
            </div>

            <div
              v-for="message in sortedMessages"
              :key="message.id"
              class="message-item"
            >
              <div class="message-avatar">
                <div class="avatar-circle" :style="getAvatarColor(message.author)">
                  {{ getAvatarInitials(message.author) }}
                </div>
              </div>
              <div class="message-content">
                <div class="message-header">
                  <div class="message-author">{{ message.author || '匿名用户' }}</div>
                  <div class="message-date">{{ formatDate(message.createdAt) }}</div>
                </div>
                <div class="message-text">{{ message.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { format, formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";
import MainLayout from "../layouts/Header.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faComment,
  faReply,
  faClock,
  faPencilAlt,
  faUser,
  faEnvelope,
  faCommentDots,
  faInfoCircle,
  faPaperPlane,
  faRedo,
  faList,
  faSortAmountDown,
  faSortAmountUp,
  faCalendarAlt,
  faCheckCircle,
  faUserShield,
  faInbox,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faQq } from "@fortawesome/free-brands-svg-icons";

// 注册图标
library.add(
  faComments,
  faComment,
  faReply,
  faClock,
  faPencilAlt,
  faUser,
  faEnvelope,
  faCommentDots,
  faInfoCircle,
  faPaperPlane,
  faRedo,
  faList,
  faSortAmountDown,
  faSortAmountUp,
  faCalendarAlt,
  faCheckCircle,
  faUserShield,
  faInbox,
  faChevronLeft,
  faChevronRight,
  faGithub,
  faQq
);

// 留言表单数据
const newMessage = ref({
  author: "",
  email: "",
  content: "",
});

// 判断表单是否已填写
const isFormFilled = computed(() => {
  return (
    newMessage.value.author.trim() !== "" ||
    newMessage.value.email.trim() !== "" ||
    newMessage.value.content.trim() !== ""
  );
});

// 重置表单
const resetForm = () => {
  newMessage.value = {
    author: "",
    email: "",
    content: "",
  };
};

// 留言列表
const messages = ref([
  {
    id: 1,
    author: "山茶爱好者",
    content:
      "博客设计得很漂亮，文章内容也很充实！希望博主能继续更新更多高质量的内容。最近在学习前端开发，您的博客对我帮助很大。",
    createdAt: "2023-11-20T10:25:00.000Z",
    reply:
      "感谢支持！我会继续努力提供更多优质内容。如果您在学习过程中有任何问题，也欢迎随时提出，我很乐意帮助。",
    replyAt: "2023-11-20T15:30:00.000Z",
  },
  {
    id: 2,
    author: "前端学习者",
    content:
      "请问博主有没有关于Vue 3 Composition API的详细教程推荐？我正在从Vue 2迁移到Vue 3，遇到了一些困难。",
    createdAt: "2023-11-18T14:15:00.000Z",
    reply: null,
    replyAt: null,
  },
  {
    id: 3,
    author: "技术爱好者",
    content:
      "希望博主能多写一些关于Node.js的文章，尤其是关于性能优化方面的内容。最近我在做一个高并发的项目，需要这方面的知识。",
    createdAt: "2023-11-15T09:40:00.000Z",
    reply:
      "已收到建议，我正在准备Node.js性能优化系列文章，感谢支持！预计下个月就会开始更新，敬请期待。",
    replyAt: "2023-11-16T11:20:00.000Z",
  },
  {
    id: 4,
    author: "Web设计师",
    content:
      "博客的界面设计很清爽，用户体验也很好。不知道博主是否考虑过增加深色模式？对于经常熬夜写代码的开发者来说会更友好。",
    createdAt: "2023-11-12T22:05:00.000Z",
    reply:
      "谢谢建议！深色模式确实是个不错的功能，我已经将它加入到开发计划中，希望很快就能和大家见面。",
    replyAt: "2023-11-13T09:15:00.000Z",
  },
  {
    id: 5,
    author: "算法工程师",
    content:
      "最近在研究JavaScript中的数据结构和算法，希望博主能分享一些这方面的经验和实践案例。",
    createdAt: "2023-11-10T16:30:00.000Z",
    reply: null,
    replyAt: null,
  },
]);

// 筛选和排序
const sortOrder = ref('newest');
const currentPage = ref(1);
const itemsPerPage = 5;

// 筛选后的留言
const sortedMessages = computed(() => {
  // 获取所有留言，仅根据排序顺序
  return [...messages.value].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder.value === 'newest' ? dateB - dateA : dateA - dateB;
  });
});

// 总页数
const totalPages = computed(() => {
  return Math.ceil(sortedMessages.value.length / itemsPerPage);
});

// 获取头像首字母
const getAvatarInitial = (name) => {
  if (!name || name === "匿名用户") return "?";
  return name.charAt(0).toUpperCase();
};

// 提交留言
const submitMessage = () => {
  if (!newMessage.value.content.trim()) return;

  // 创建新留言对象
  const message = {
    id: messages.value.length + 1,
    author: newMessage.value.author.trim() || "匿名用户",
    email: newMessage.value.email.trim(),
    content: newMessage.value.content.trim(),
    createdAt: new Date().toISOString(),
    reply: null,
    replyAt: null,
  };

  // 在实际应用中，这里应该是发送到服务器的代码
  // 这里仅作演示，将留言添加到本地数组
  messages.value.unshift(message);

  // 重置表单
  resetForm();

  // 显示成功提示
  alert("留言已提交，等待管理员审核");
};

// 格式化日期
const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy-MM-dd HH:mm");
};

// 获取回复数量
const getReplyCount = () => {
  return messages.value.filter((message) => message.reply).length;
};

// 获取最近活动时间
const getLastActiveTime = () => {
  if (messages.value.length === 0) return "暂无活动";

  const dates = messages.value.map((msg) => {
    const createdDate = new Date(msg.createdAt);
    const replyDate = msg.replyAt ? new Date(msg.replyAt) : null;
    return replyDate && replyDate > createdDate ? replyDate : createdDate;
  });

  const latestDate = new Date(Math.max(...dates.map((date) => date.getTime())));
  return formatDistance(latestDate, new Date(), {
    addSuffix: true,
    locale: zhCN,
  });
};

// 获取头像颜色
const getAvatarColor = (name) => {
  const colors = [
    '#007bff', '#dc3545', '#28a745', '#6c757d', '#ffc107', '#17a2b8', '#343a40'
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// 获取头像初始字母
const getAvatarInitials = (name) => {
  if (!name || name === "匿名用户") return "?";
  return name.charAt(0).toUpperCase();
};
</script>

<style scoped>
/* 整体布局 */
.message-board {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 留言板头部 */
.message-board-header {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  overflow: hidden;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 25px;
}

.header-icon {
  font-size: 2.8rem;
  color: var(--link-color);
  padding: 20px;
  background-color: rgba(var(--link-color-rgb, 50, 115, 220), 0.1);
  border-radius: 50%;
}

.header-text h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.header-text p {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
}

/* 统计信息样式 */
.header-stats {
  display: flex;
  gap: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  font-size: 1.5rem;
  color: var(--link-color);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
}

/* 留言内容区域 */
.message-container {
  display: grid;
  grid-template-columns: 35% 1fr;
  gap: 30px;
  background-color: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* 留言表单部分 */
.message-form-section {
  padding: 30px;
  border-right: 1px solid var(--border-color);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.section-icon {
  font-size: 1.3rem;
  color: var(--link-color);
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}

/* 表单样式 */
.message-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-color);
}

.input-icon {
  font-size: 0.9rem;
  color: var(--link-color);
}

.form-control {
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--link-color);
  box-shadow: 0 0 0 3px rgba(var(--link-color-rgb, 50, 115, 220), 0.1);
}

.content-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background-color: var(--link-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background-color: var(--link-hover-color, #2860b1);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 留言列表部分 */
.message-list-section {
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.message-sort {
  margin-left: auto;
  display: flex;
  gap: 5px;
}

.sort-btn {
  background: none;
  border: none;
  padding: 5px 10px;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.sort-btn:hover {
  background-color: var(--button-bg);
}

.sort-btn.active {
  color: var(--link-color);
  font-weight: 500;
  opacity: 1;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 5px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 无留言时的样式 */
.no-messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: var(--text-color);
  opacity: 0.5;
  text-align: center;
}

.no-messages-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.no-messages p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.no-messages-sub {
  margin-top: 5px !important;
  font-size: 1rem !important;
  font-weight: normal !important;
}

/* 留言项目样式 */
.message-item {
  display: flex;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.message-item:last-child {
  border-bottom: none;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.message-author {
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text-color);
}

.message-date {
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.7;
}

.message-text {
  line-height: 1.6;
  color: var(--text-color);
}

/* 响应式布局 */
@media (max-width: 900px) {
  .message-container {
    grid-template-columns: 1fr;
  }
  
  .message-form-section {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}

@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
