<template>
  <div class="code-block-wrapper">
    <div class="code-block-header">
      <!-- 代码类型 -->
      <div class="header-left">
        <div class="code-type-label">{{ typeLabel }}</div>
      </div>
      <!-- 复制代码 -->
      <div class="copy-button" @click="copyCode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path
            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          ></path>
        </svg>
      </div>
    </div>
    <div class="code-main-container">
      <div class="code-content" :class="{ expanded: expanded }">
        <table class="code-table">
          <tbody>
            <tr v-for="(line, index) in displayedCodeLines" :key="index">
              <td class="line-number">{{ index + 1 }}</td>
              <td
                class="line-content"
                v-html="`<span class='hljs ${langClass}'>${line || ' '}</span>`"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="code-footer" v-if="shouldShowExpand">
      <a href="#" class="show-all-code" @click.prevent="toggleExpand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="{ rotated: expanded }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        {{ expanded ? "收起代码" : `展示全部 ${totalLines} 行代码内容` }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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
const copyCode = () => {
  navigator.clipboard
    .writeText(props.code)
    .then(() => {
      const button = document.querySelector(".copy-button");
      const originalIcon = button.innerHTML;
      button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
      button.classList.add("copied");

      setTimeout(() => {
        button.innerHTML = originalIcon;
        button.classList.remove("copied");
      }, 2000);
    })
    .catch((err) => {
      console.error("复制失败:", err);
      alert("复制失败，请手动复制");
    });
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
/* 复用当前文章中的代码块样式 */
.code-block-wrapper {
  margin: 24px 0;
  border-radius: 0;
  overflow: hidden;
  background-color: #fff;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
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

.code-content {
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  transition: max-height 0.3s ease;
  max-height: 300px;
}

.code-content.expanded {
  max-height: none;
}

/* 折叠时设置最大高度以确保只显示前10行 */
.code-content:not(.expanded) {
  max-height: calc(24px * 10); /* 行高 * 最大可见行数 */
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

.code-footer {
  padding: 8px 12px;
  font-size: 12px;
  background-color: #f9f9f9;
}

.show-all-code {
  display: flex;
  align-items: center;
  color: #666;
  text-decoration: none;
  font-weight: 500;
}

.show-all-code:hover {
  color: #333;
}

.show-all-code svg {
  margin-right: 6px;
  transform: rotate(0);
  transition: transform 0.3s ease;
}

.show-all-code svg.rotated {
  transform: rotate(180deg);
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
