<template>
  <div class="markdown-table-container">
    <table class="markdown-table" v-if="headers.length > 0">
      <thead>
        <tr class="header-row">
          <th v-for="(header, index) in headers" :key="index" :style="{ textAlign: alignments[index] || 'left' }">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" :style="{ textAlign: alignments[cellIndex] || 'left' }" v-html="formatCell(cell)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  markdown: {
    type: String,
    required: true
  }
});

const headers = ref([]);
const alignments = ref([]);
const rows = ref([]);

// 解析Markdown表格
const parseMarkdownTable = (markdown) => {
  try {
    // 重置数据
    headers.value = [];
    alignments.value = [];
    rows.value = [];

    if (!markdown || !markdown.includes('|')) return;

    // 分割表格行，移除空行和只有空格的行
    const tableRows = markdown.split(/[\r\n]+/).filter(row => row.trim() !== '' && row.includes('|'));

    if (tableRows.length < 3) return; // 需要至少有表头、分隔符和一行数据

    // 处理表头行
    const headerRow = tableRows[0];
    headers.value = headerRow
      .split('|')
      .filter((cell, index, array) => index > 0 && index < array.length - 1) // 去除首尾空单元格
      .map(cell => cell.trim());

    // 处理分隔行，确定列对齐方式
    const alignmentRow = tableRows[1];
    alignments.value = alignmentRow
      .split('|')
      .filter((cell, index, array) => index > 0 && index < array.length - 1)
      .map(cell => {
        const trimmed = cell.trim();
        if (!trimmed || trimmed.length === 0) return 'left';

        if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
        if (trimmed.endsWith(':')) return 'right';
        return 'left';
      });

    // 处理数据行
    const dataRows = tableRows.slice(2);
    rows.value = dataRows.map(row => {
      return row
        .split('|')
        .filter((cell, index, array) => index > 0 && index < array.length - 1)
        .map(cell => cell.trim());
    });

    // 确保数据行单元格数量与表头匹配
    rows.value.forEach(row => {
      while (row.length < headers.value.length) {
        row.push(''); // 不足的单元格用空字符串填充
      }
    });

    // 打印调试信息
    console.log('解析的表格数据:', { headers: headers.value, rows: rows.value, alignments: alignments.value });
  } catch (error) {
    console.error('解析Markdown表格出错:', error);
  }
};

// 格式化单元格中的内容，支持简单的markdown格式
const formatCell = (text) => {
  if (!text) return '';

  // 处理代码标记
  let formatted = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 处理粗体
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 处理斜体
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 处理HTML标签（如TDZ<uninitialized>）
  formatted = formatted.replace(/&lt;([^&]+)&gt;/g, '<span class="tag">&lt;$1&gt;</span>');

  // 处理常见关键字
  const keywords = ['var', 'let', 'const', 'function', 'if', 'for', 'undefined', 'TDZ'];
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    formatted = formatted.replace(regex, `<code>${keyword}</code>`);
  });

  return formatted;
};

// 监听markdown属性的变化
watch(() => props.markdown, (newValue) => {
  if (newValue) {
    parseMarkdownTable(newValue);
  }
}, { immediate: true });

// 组件挂载后检查表格数据
onMounted(() => {
  if (props.markdown) {
    parseMarkdownTable(props.markdown);
  }
});
</script>

<style scoped>
.markdown-table-container {
  overflow-x: auto;
  margin: 20px 0 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.markdown-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e9e9e9;
  font-family: Arial, sans-serif;
  background-color: #fff;
}

.markdown-table th,
.markdown-table td {
  border: 1px solid #e9e9e9;
  padding: 12px 16px;
  text-align: left;
  line-height: 1.5;
}

.markdown-table th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #333;
}

.header-row th {
  text-align: center;
}

.markdown-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.markdown-table tr:hover {
  background-color: #f0f7ff;
}

.markdown-table code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
  color: #d14;
}

.markdown-table .tag {
  color: #2973b7;
  font-family: monospace;
}
</style>
