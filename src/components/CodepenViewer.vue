<template>
  <div class="code-block-wrapper">
    <div class="code-block-header">
      <!-- 代码类型 -->
      <div class="header-left">
        <div class="code-type-label">{{ typeLabel }}</div>
      </div>
      <!-- 复制代码 -->
      <div class="copy-button" @click="copyCode($event)">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </div>
    </div>
    <div class="code-main-container">
      <div class="code-content" :class="{ expanded: expanded }">
        <table class="code-table">
          <tbody>
            <tr v-for="(line, index) in displayedCodeLines" :key="index">
              <td class="line-number">{{ index + 1 }}</td>
              <td class="line-content" v-html="`<span class='hljs ${langClass}'>${line || ' '}</span>`"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="code-footer" v-if="shouldShowExpand">
      <a href="#" class="show-all-code" @click.prevent="toggleExpand">
        <MaterialIcon icon="expand_more" :class="{ rotated: expanded }" />
        {{ expanded ? "收起代码" : `展示全部 ${totalLines} 行代码内容` }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "",
  },
});

const expanded = ref(false);
const MAX_VISIBLE_LINES = 10;

// 确定语言类型标签
const typeLabel = computed(() => {
  const lang = props.language.toLowerCase();
  if (lang === "js" || lang === "javascript") return "JavaScript";
  if (lang === "ts" || lang === "typescript") return "TypeScript";
  if (lang === "html") return "HTML";
  if (lang === "css") return "CSS";
  if (lang === "vue") return "Vue";
  if (lang === "json") return "JSON";
  if (lang) return lang.toUpperCase();
  return "代码";
});

// 高亮代码
const highlightedCode = computed(() => {
  const lang = props.language;
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(props.code.trim(), { language: lang }).value;
  }
  return hljs.highlightAuto(props.code.trim()).value;
});

// 语言类名
const langClass = computed(() => {
  return props.language ? `language-${props.language}` : "";
});

// 代码行数组
const codeLines = computed(() => {
  return highlightedCode.value.split("\n");
});

// 是否需要展开/折叠功能
const shouldShowExpand = computed(() => {
  return codeLines.value.length > MAX_VISIBLE_LINES;
});

// 显示的代码行
const displayedCodeLines = computed(() => {
  if (expanded.value || !shouldShowExpand.value) {
    return codeLines.value;
  }
  return codeLines.value.slice(0, MAX_VISIBLE_LINES);
});

// 总行数
const totalLines = computed(() => {
  return codeLines.value.length;
});

// 复制代码
const copyCode = (e) => {
  const button = e.currentTarget; // 使用事件对象获取当前按钮
  
  navigator.clipboard
    .writeText(props.code)
    .then(() => {
      const originalIcon = button.innerHTML;
      button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
      button.classList.add("copied");

      // 显示成功提示
      if (window.$toast) {
        window.$toast.success("代码已复制到剪贴板", {
          title: "复制成功",
          duration: 3000 // 使用较短的持续时间
        });
      } else {
        // 尝试使用组件内的方法
        const instance = getCurrentInstance();
        if (instance && instance.appContext && instance.appContext.config.globalProperties.$toast) {
          instance.appContext.config.globalProperties.$toast.success("代码已复制到剪贴板", {
            title: "复制成功",
            duration: 3000
          });
        } else {
          // 备用提示方式
          showSimpleToast("代码已复制到剪贴板", "success");
        }
      }

      setTimeout(() => {
        button.innerHTML = originalIcon;
        button.classList.remove("copied");
      }, 2000);
    })
    .catch((err) => {
      console.error("复制失败:", err);
      if (window.$toast) {
        window.$toast.error("复制失败，请手动复制", {
          title: "复制失败",
          duration: 3000
        });
      } else {
        // 尝试使用组件内的方法
        const instance = getCurrentInstance();
        if (instance && instance.appContext && instance.appContext.config.globalProperties.$toast) {
          instance.appContext.config.globalProperties.$toast.error("复制失败，请手动复制", {
            title: "复制失败",
            duration: 3000
          });
        } else {
          showSimpleToast("复制失败，请手动复制", "error");
        }
      }
    });
};

// 备用提示函数 - 简单的提示
const showSimpleToast = (message, type = 'info') => {
  try {
    // 尝试使用全局toast服务
    const instance = getCurrentInstance();
    if (instance && instance.appContext && instance.appContext.config.globalProperties.$toast) {
      instance.appContext.config.globalProperties.$toast[type](message, {
        title: type === 'success' ? '成功' : 
               type === 'error' ? '错误' : 
               type === 'warning' ? '警告' : '提示'
      });
      return;
    }
  } catch (err) {
    console.error("无法使用全局toast服务，降级使用内联toast:", err);
  }
  
  // 备用方案 - 创建一个简单的提示元素
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 16px';
  toast.style.background = type === 'success' ? '#f0f9eb' : 
                         type === 'error' ? '#fef0f0' : 
                         type === 'warning' ? '#fdf6ec' : '#f4f4f5';
  toast.style.color = '#606266';
  toast.style.borderLeft = type === 'success' ? '4px solid #67c23a' : 
                         type === 'error' ? '4px solid #f56c6c' : 
                         type === 'warning' ? '4px solid #e6a23c' : '4px solid #909399';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
  toast.style.zIndex = '9999';
  toast.style.transition = 'all 0.3s';
  toast.innerText = message;
  
  document.body.appendChild(toast);
  
  // 3秒后移除
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

// 展开/折叠代码
const toggleExpand = () => {
  expanded.value = !expanded.value;
};

// 组件挂载时检查是否应该折叠代码
onMounted(() => {
  if (shouldShowExpand.value) {
    expanded.value = false;
  }
});
</script>

<style scoped>
.code-block {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  font-size: 12px;
  color: #24292e;
}

.code-type {
  font-weight: 600;
}

.code-content {
  position: relative;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.code-content-inner {
  background-color: #f6f8fa;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
  line-height: 1.5;
}

.code-footer {
  padding: 8px 0;
  text-align: center;
  background-color: #f9f9f9;
}

.show-all-code {
  font-size: 12px;
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.show-all-code:hover {
  text-decoration: none;
  color: #333;
}

.material-icons-sharp.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

/* 复用当前文章中的代码块样式 */
.code-block-wrapper {
  margin: 24px 0;
  border-radius: 0;
  overflow: hidden;
  background-color: #fff;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  border: 1px solid #ddd;
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
}

.code-type-label {
  background-color: #f0f0f0;
  color: #333;
  padding: 2px 8px;
  border-radius: 0;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #ddd;
}

.code-type-arrow {
  margin-left: 6px;
  font-size: 12px;
  color: #666;
}

.copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  transition: background-color 0.2s;
  border: 1px solid #ddd;
}

.copy-button:hover {
  background-color: #f0f0f0;
}

.copy-button.copied {
  background-color: rgba(40, 167, 69, 0.1);
}

.code-main-container {
  display: flex;
  position: relative;
  border-bottom: 1px solid #ddd;
}

.line-numbers-area {
  position: relative;
  width: 50px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
}

.line-numbers-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 11px;
  color: #666;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.line-number-arrow {
  margin: 0 4px;
}

.line-numbers-text {
  white-space: nowrap;
}

.code-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.line-number {
  text-align: center;
  padding: 0 2px;
  max-width: 10px;
  user-select: none;
  color: #999;
  border-right: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 12px;
}

.line-content {
  padding: 0 12px;
  white-space: pre;
  font-size: 13px;
  line-height: 1.5;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .code-block-wrapper {
    background-color: #1e1e1e;
    border-color: #333;
  }

  .code-block-header,
  .line-numbers-area,
  .code-footer {
    background-color: #252525;
    border-color: #333;
  }

  .code-type-label {
    background-color: #333;
    color: #ccc;
    border-color: #444;
  }

  .code-type-arrow,
  .line-numbers-indicator,
  .line-number {
    color: #999;
  }

  .line-number,
  .line-numbers-area {
    background-color: #252525;
    border-color: #333;
  }

  .copy-button {
    border-color: #444;
  }

  .copy-button:hover {
    background-color: #333;
  }

  .show-all-code {
    color: #999;
  }

  .show-all-code:hover {
    color: #ccc;
  }

  .line-numbers-indicator {
    background-color: rgba(30, 30, 30, 0.8);
  }
}

/* 确保hljs正确展示 */
:deep(.hljs) {
  background: transparent !important;
  padding: 0 !important;
  color: inherit;
}
</style>
