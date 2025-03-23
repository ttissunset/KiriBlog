import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  // 文章列表
  const articles = ref([
    {
      id: 10,
      title: '2024年前端开发趋势展望',
      summary: '探讨2024年前端技术的发展方向，包括AI辅助开发、WebAssembly的普及和Web组件标准化...',
      content: `# 2024年前端开发趋势展望
      
2024年前端开发领域正在经历快速变革，多项技术趋势值得关注。

## AI辅助开发工具的普及

人工智能正在深刻改变前端开发流程：
- GitHub Copilot等代码补全工具提高编码效率
- AI生成UI组件减少重复工作
- 智能调试工具帮助定位问题

## WebAssembly的广泛应用

WebAssembly正在扩展Web应用的可能性：
- 高性能计算任务在浏览器中实现
- 复杂应用如CAD、视频编辑在Web端运行
- 与JavaScript的无缝集成

## Web组件的标准化

组件化开发正在走向标准：
- Custom Elements的广泛支持
- Shadow DOM提供更好的封装
- HTML Templates简化组件定义

## 边缘计算与前端

边缘计算为前端带来新机遇：
- 通过边缘渲染减少延迟
- 分布式内容交付提升全球用户体验
- 服务器组件与边缘计算的结合

## Rust生态在前端工具链的崛起

Rust正在改变前端工具开发：
- 构建工具性能显著提升
- 更可靠的依赖管理
- 更快的热重载和开发体验
      `,
      createdAt: '2024-02-05T08:30:25.000Z',
      updatedAt: '2024-02-06T15:45:12.000Z',
      category: '前端趋势',
      tags: ['前端', '技术趋势', '2024'],
      views: 426,
      comments: [
        {
          id: 13,
          author: '技术探索者',
          content: '很期待WebAssembly在2024年的发展！',
          createdAt: '2024-02-05T12:30:45.000Z',
          approved: true
        }
      ]
    },
    {
      id: 11,
      title: 'React Server Components实战',
      summary: '深入解析React Server Components的工作原理和最佳实践，探讨如何结合客户端组件打造高性能应用...',
      content: `# React Server Components实战指南
      
React Server Components(RSC)是React生态中的重要创新，本文将详细介绍其实战应用。

## 基本概念

Server Components允许开发者创建仅在服务器上渲染的组件：
\`\`\`jsx
// 服务器组件示例
export default async function ProductDetails({ id }) {
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}
\`\`\`

## 与客户端组件协作

服务器组件和客户端组件可以相互嵌套使用：
\`\`\`jsx
// 客户端组件 ("use client")
'use client';
import { useState } from 'react';

export default function AddToCart({ productId }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => setAdded(true)}>
      {added ? '已添加' : '添加到购物车'}
    </button>
  );
}
\`\`\`

## 数据获取策略

服务器组件中的数据获取变得简单直接：
\`\`\`jsx
export default async function Dashboard() {
  const [user, orders, recommendations] = await Promise.all([
    getUser(),
    getOrders(),
    getRecommendations()
  ]);
  
  return (
    <div>
      <UserProfile user={user} />
      <RecentOrders orders={orders} />
      <Recommendations items={recommendations} />
    </div>
  );
}
\`\`\`

## 性能优化最佳实践

- 将大型依赖移至服务器组件
- 适当拆分客户端和服务器组件
- 使用流式渲染提升用户体验
      `,
      createdAt: '2024-01-15T10:25:32.000Z',
      updatedAt: '2024-01-16T09:17:18.000Z',
      category: 'React',
      tags: ['React', 'Server Components', '前端'],
      views: 358,
      comments: []
    },
    {
      id: 1,
      title: '如何开始Vue 3项目开发',
      summary: 'Vue 3提供了许多新特性，本文将介绍如何快速上手Vue 3项目开发...',
      content: `# 如何开始Vue 3项目开发
      
Vue 3是Vue.js的最新版本，带来了Composition API、更好的TypeScript支持等特性。

## 创建项目
使用Vite创建Vue 3项目：
\`\`\`bash
npm init vite@latest my-vue-app -- --template vue
\`\`\`

## Composition API
Composition API是Vue 3的一大亮点：
\`\`\`js
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return { count }
  }
}
\`\`\`
      `,
      createdAt: '2023-11-15T08:00:00.000Z',
      updatedAt: '2023-11-15T10:30:00.000Z',
      category: 'Vue.js',
      tags: ['Vue', 'JavaScript', '前端'],
      views: 358,
      comments: [
        {
          id: 1,
          author: '匿名用户',
          content: '文章写得很清晰，感谢分享！',
          createdAt: '2023-11-15T15:30:00.000Z',
          approved: true
        }
      ]
    },
    {
      id: 2,
      title: 'JavaScript异步编程详解',
      summary: '本文详细介绍JavaScript中的异步编程模式，包括回调、Promise和async/await...',
      content: `# JavaScript异步编程详解
      
JavaScript是单线程语言，但它可以通过异步编程实现非阻塞操作。

## 回调函数
最早的异步处理方式：
\`\`\`js
function fetchData(callback) {
  setTimeout(() => {
    callback('数据')
  }, 1000)
}

fetchData(data => console.log(data))
\`\`\`

## Promise
Promise提供了更优雅的异步处理方式：
\`\`\`js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('数据')
    }, 1000)
  })
}

fetchData().then(data => console.log(data))
\`\`\`

## Async/Await
ES2017引入的语法糖，使异步代码更接近同步写法：
\`\`\`js
async function getData() {
  const data = await fetchData()
  console.log(data)
}

getData()
\`\`\`
      `,
      createdAt: '2023-11-10T09:15:00.000Z',
      updatedAt: '2023-11-10T09:15:00.000Z',
      category: 'JavaScript',
      tags: ['JavaScript', '异步编程', '前端'],
      views: 246,
      comments: []
    },
    {
      id: 3,
      title: 'Node.js流式处理大文件',
      summary: '在Node.js中处理大文件时，使用流式处理可以有效减少内存占用...',
      content: `# Node.js流式处理大文件
      
在处理大型文件时，Node.js的流式API（Stream API）是最佳选择。

## 流的基本概念
Node.js中的流是处理读写数据的抽象接口，可以高效处理大量数据。

## 读取文件流
\`\`\`js
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');

readStream.on('data', (chunk) => {
  console.log('读取到数据块：', chunk.length);
});

readStream.on('end', () => {
  console.log('文件读取完成');
});
\`\`\`

## 写入文件流
\`\`\`js
const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello, ');
writeStream.write('World!');
writeStream.end();
\`\`\`

## 管道操作
管道是Node.js流的强大功能，可以轻松将数据从一个流传输到另一个流：

\`\`\`js
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
\`\`\`
      `,
      createdAt: '2023-10-25T14:30:00.000Z',
      updatedAt: '2023-10-26T08:45:00.000Z',
      category: 'Node.js',
      tags: ['Node.js', '文件处理', '后端'],
      views: 176,
      comments: [
        {
          id: 2,
          author: 'Node爱好者',
          content: '正在开发一个文件处理系统，这篇文章对我帮助很大！',
          createdAt: '2023-10-27T10:15:00.000Z',
          approved: true
        }
      ]
    },
    {
      id: 4,
      title: 'CSS Grid布局实战指南',
      summary: 'CSS Grid是一种强大的二维布局系统，本文将通过实例详细讲解如何使用...',
      content: `# CSS Grid布局实战指南
      
CSS Grid是一种二维布局系统，专为解决复杂布局问题而设计。

## 基本概念
Grid容器和Grid项目是Grid布局的核心概念：

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 200px;
  gap: 20px;
}
\`\`\`

## 定位元素
可以使用grid-column和grid-row精确定位元素：

\`\`\`css
.item {
  grid-column: 1 / 3; /* 从第1条网格线到第3条网格线 */
  grid-row: 1 / 2;    /* 从第1条网格线到第2条网格线 */
}
\`\`\`

## 响应式布局
结合媒体查询，Grid可以轻松创建响应式布局：

\`\`\`css
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
\`\`\`

## 与Flexbox比较
Grid适合整体页面布局，Flexbox适合一维布局或组件内部布局。二者结合使用效果更佳。
      `,
      createdAt: '2023-11-05T16:20:00.000Z',
      updatedAt: '2023-11-05T18:30:00.000Z',
      category: 'CSS',
      tags: ['CSS', 'Grid', '前端', '响应式设计'],
      views: 209,
      comments: [
        {
          id: 3,
          author: '前端新手',
          content: '第一次真正理解了Grid布局，感谢分享！',
          createdAt: '2023-11-06T09:45:00.000Z',
          approved: true
        }
      ]
    },
    {
      id: 5,
      title: 'Vue 3组件通信的8种方式',
      summary: 'Vue 3提供了多种组件通信方式，本文详细介绍这些方法并分析各自的适用场景...',
      content: `# Vue 3组件通信的8种方式
      
组件通信是Vue应用中的核心问题，Vue 3提供了多种通信方式。

## 1. Props传递
父组件向子组件传递数据：
\`\`\`vue
<!-- 父组件 -->
<template>
  <child-component :message="parentMessage" />
</template>

<!-- 子组件 -->
<script setup>
const props = defineProps({
  message: String
})
</script>
\`\`\`

## 2. 事件触发
子组件向父组件通信：
\`\`\`vue
<!-- 子组件 -->
<template>
  <button @click="sendMessage">发送消息</button>
</template>

<script setup>
const emit = defineEmits(['update'])
function sendMessage() {
  emit('update', 'Hello from child')
}
</script>

<!-- 父组件 -->
<template>
  <child-component @update="handleUpdate" />
</template>
\`\`\`

## 3. v-model
双向绑定简化组件通信：
\`\`\`vue
<!-- 父组件 -->
<template>
  <custom-input v-model="text" />
</template>

<!-- 子组件 -->
<script setup>
defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])
</script>
\`\`\`

## 4. provide/inject
跨多级组件通信：
\`\`\`js
// 祖先组件
provide('theme', 'dark')

// 后代组件
const theme = inject('theme')
\`\`\`

## 5. Vuex/Pinia
全局状态管理：
\`\`\`js
// Pinia store
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ }
  }
})

// 组件中
const store = useStore()
\`\`\`

## 6. refs
直接访问子组件：
\`\`\`vue
<template>
  <child-component ref="childRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
const childRef = ref(null)
onMounted(() => {
  childRef.value.someMethod()
})
</script>
\`\`\`

## 7. 事件总线
第三方事件总线库：
\`\`\`js
import mitt from 'mitt'
const emitter = mitt()

// 发送事件
emitter.emit('event-name', data)

// 监听事件
emitter.on('event-name', (data) => {})
\`\`\`

## 8. 状态组合与共享
使用组合式API共享状态：
\`\`\`js
// useUser.js
export function useUser() {
  const user = ref(null)
  const loading = ref(false)
  
  async function fetchUser(id) {
    loading.value = true
    user.value = await api.getUser(id)
    loading.value = false
  }
  
  return { user, loading, fetchUser }
}
\`\`\`
      `,
      createdAt: '2023-11-08T11:40:00.000Z',
      updatedAt: '2023-11-09T13:20:00.000Z',
      category: 'Vue.js',
      tags: ['Vue', '组件通信', '前端'],
      views: 312,
      comments: []
    },
    {
      id: 6,
      title: 'Vue 3 Composition API全解析',
      summary: '本文深入解析Vue 3的Composition API，包括响应式系统、生命周期钩子和性能优化等方面',
      content: `# Vue 3 Composition API全解析

Vue 3的Composition API是一种全新的组织组件逻辑的方式，它允许我们按照功能而非选项来组织代码。

## 为什么需要Composition API？

在Vue 2中，我们使用Options API来组织代码，这种方式在小型组件中工作良好，但在大型组件中会导致代码分散。例如，一个功能的逻辑可能分布在data、methods、computed和watch等不同选项中。

Composition API通过将相关功能的代码组织在一起，提高了代码的可读性和可维护性。

## 核心概念

### ref和reactive

\`ref\`和\`reactive\`是Vue 3中用于创建响应式数据的API：

\`\`\`js
import { ref, reactive } from 'vue'

// 使用ref
const count = ref(0)
console.log(count.value) // 访问值需要使用.value

// 使用reactive
const state = reactive({
  count: 0,
  message: 'Hello'
})
console.log(state.count) // 直接访问属性
\`\`\`

### 计算属性和监听器

\`computed\`和\`watch\`函数用于创建计算属性和监听器：

\`\`\`js
import { ref, computed, watch } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

watch(count, (newValue, oldValue) => {
  console.log(\`Count changed from \${oldValue} to \${newValue}\`)
})
\`\`\`

### 生命周期钩子

生命周期钩子现在以独立函数的形式提供：

\`\`\`js
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUpdated(() => {
  console.log('Component updated')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
\`\`\`

## 代码组织

Composition API的主要优势是能够将相关功能的代码组织在一起。例如，我们可以将计数器功能封装在一个函数中：

\`\`\`js
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return {
    count,
    doubleCount,
    increment,
    decrement
  }
}
\`\`\`

然后在组件中使用：

\`\`\`js
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, doubleCount, increment, decrement } = useCounter()
    
    return {
      count,
      doubleCount,
      increment,
      decrement
    }
  }
}
\`\`\`

## 与Options API对比

Composition API不是替代Options API，而是提供了一种新的选择。在以下情况下，Composition API特别有用：

1. 组件逻辑复杂，需要更好的代码组织
2. 需要在多个组件之间复用逻辑
3. 使用TypeScript进行类型检查

对于简单的组件，Options API仍然是一个不错的选择。

## 性能优化

Composition API在性能方面也有一些优势：

1. 更好的Tree-shaking支持
2. 更精确的依赖追踪
3. 避免了Options API中的代理对象开销

## 结论

Composition API是Vue 3中的一个强大功能，它提供了更灵活、更可维护的方式来组织组件代码。虽然学习曲线稍陡，但一旦掌握，将显著提高开发效率和代码质量。

如果你正在使用Vue 3进行开发，强烈建议探索Composition API，尤其是对于中大型项目和需要逻辑复用的场景。
`,
      createdAt: '2023-12-05T10:20:00.000Z',
      updatedAt: '2023-12-07T14:15:00.000Z',
      category: 'Vue.js',
      tags: ['Vue', 'JavaScript', '前端', 'Composition API'],
      views: 412,
      comments: [
        {
          id: 10,
          author: 'Vue开发者',
          content: '写得非常清晰，帮我解决了很多困惑！',
          createdAt: '2023-12-06T08:30:00.000Z',
          approved: true
        },
        {
          id: 11,
          author: '前端学习者',
          content: '请问Composition API与React Hooks有什么异同？',
          createdAt: '2023-12-08T16:45:00.000Z',
          approved: true
        }
      ]
    },
    {
      id: 7,
      title: '前端性能优化最佳实践',
      summary: '这篇文章总结了提升前端应用性能的关键技术和策略，包括代码分割、懒加载、缓存策略等',
      content: `# 前端性能优化最佳实践

前端性能优化是提升用户体验的关键一环。本文将分享一系列经过实践验证的优化技术。

## 为什么性能很重要？

研究表明：
- 页面加载时间每增加1秒，转化率下降7%
- 53%的移动用户会放弃加载时间超过3秒的网站
- 页面加载速度直接影响SEO排名

## 关键渲染路径优化

### 1. 减少关键CSS

将首屏渲染必需的CSS内联到HTML中：

\`\`\`html
<style>
  /* 关键CSS */
  body { margin: 0; font-family: sans-serif; }
  header { height: 60px; background: #f5f5f5; }
  /* 等等... */
</style>
\`\`\`

### 2. JavaScript优化

- 使用async/defer属性延迟加载非关键JavaScript
- 避免同步JavaScript阻塞渲染

\`\`\`html
<script defer src="app.js"></script>
<script async src="analytics.js"></script>
\`\`\`

## 资源优化

### 1. 图片优化

使用现代图片格式和响应式图片：

\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="描述" loading="lazy">
</picture>
\`\`\`

关键技术：
- 使用WebP格式（比JPEG小25-35%）
- 图片懒加载
- 合理设置图片尺寸和压缩率

### 2. 字体优化

优化Web字体加载：

\`\`\`css
@font-face {
  font-family: 'MyFont';
  font-display: swap;
  src: url('myfont.woff2') format('woff2');
}
\`\`\`

font-display: swap可以防止字体阻塞渲染。

## 代码分割与懒加载

### 1. 路由级别代码分割

在Vue Router中：

\`\`\`js
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue')
  }
]
\`\`\`

### 2. 组件级别懒加载

\`\`\`js
Vue.component('heavy-component', () => import('./HeavyComponent.vue'))
\`\`\`

## 缓存策略

### 1. HTTP缓存

设置恰当的缓存头：

\`\`\`
Cache-Control: max-age=31536000, immutable
\`\`\`

### 2. Service Worker缓存

实现离线功能和资源缓存：

\`\`\`js
// service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js',
        '/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

## 构建优化

### 1. 代码压缩与树摇

使用Webpack、Rollup或Vite等构建工具进行代码优化：

\`\`\`js
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true
  }
}
\`\`\`

### 2. 分块策略

合理配置分块策略，平衡请求数与缓存效率：

\`\`\`js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 6,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return \`vendor.\${packageName.replace('@', '')}\`;
          }
        }
      }
    }
  }
}
\`\`\`

## 渲染性能

### 1. 虚拟列表

当渲染大量数据时，使用虚拟列表：

\`\`\`js
<virtual-list
  :size="40"
  :items="items"
  :buffer="10"
>
  <template v-slot:item="{ item }">
    {{ item }}
  </template>
</virtual-list>
\`\`\`

### 2. Web Workers

将CPU密集型任务移至Web Worker中：

\`\`\`js
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: largeData });
worker.onmessage = e => {
  console.log('处理结果:', e.data);
};

// worker.js
self.onmessage = e => {
  const result = complexCalculation(e.data);
  self.postMessage(result);
};
\`\`\`

## 性能测量与监控

### 1. Web Vitals

监控Core Web Vitals：
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### 2. 性能预算

设定并监控性能预算：
- 首次加载JavaScript不超过300KB
- Time to Interactive不超过3秒
- 首屏加载时间不超过1.5秒

## 结论

前端性能优化是一个持续过程，需要从多个维度进行分析和改进。通过实施本文提到的最佳实践，可以显著提高应用的加载速度和运行效率，从而提升用户体验和业务转化率。

记住，性能优化应该基于实际测量，而不是主观感受。使用Lighthouse、WebPageTest等工具进行客观评估，并根据数据来决定优化方向。
`,
      createdAt: '2023-12-10T15:30:00.000Z',
      updatedAt: '2023-12-12T09:45:00.000Z',
      category: '前端优化',
      tags: ['性能优化', 'JavaScript', '前端', 'Web开发'],
      views: 328,
      comments: [
        {
          id: 12,
          author: '性能爱好者',
          content: '非常全面的总结！建议再加上一些预加载技术的介绍。',
          createdAt: '2023-12-11T18:20:00.000Z',
          approved: true
        }
      ]
    },
    {
      id: 8,
      title: '测试文章1',
      summary: '这是测试文章1的摘要',
      content: '这是测试文章1的内容',
      createdAt: '2023-12-01T10:00:00.000Z',
      updatedAt: '2023-12-01T10:00:00.000Z',
      category: '测试分类',
      tags: ['测试标签1', '测试标签2'],
      views: 100,
      comments: []
    },
    {
      id: 9,
      title: '测试文章2',
      summary: '这是测试文章2的摘要',
      content: '这是测试文章2的内容',
      createdAt: '2023-12-02T10:00:00.000Z',
      updatedAt: '2023-12-02T10:00:00.000Z',
      category: '测试分类',
      tags: ['测试标签1', '测试标签2'],
      views: 100,
      comments: []
    }
  ])

  // 分类列表
  const categories = ref([
    { id: 1, name: 'Vue.js', count: 2 },
    { id: 2, name: 'JavaScript', count: 1 },
    { id: 3, name: 'CSS', count: 1 },
    { id: 4, name: 'Node.js', count: 1 }
  ])

  // 标签列表
  const tags = ref([
    { id: 1, name: 'Vue', count: 2 },
    { id: 2, name: 'JavaScript', count: 2 },
    { id: 3, name: '前端', count: 4 },
    { id: 4, name: '异步编程', count: 1 },
    { id: 5, name: 'CSS', count: 1 },
    { id: 6, name: 'Grid', count: 1 },
    { id: 7, name: '响应式设计', count: 1 },
    { id: 8, name: 'Node.js', count: 1 },
    { id: 9, name: '文件处理', count: 1 },
    { id: 10, name: '后端', count: 1 },
    { id: 11, name: '组件通信', count: 1 }
  ])

  // 统计信息
  const statistics = ref({
    totalArticles: 5,
    totalViews: 1301,
    totalComments: 3
  })

  // 最新评论
  const pendingComments = ref([
    {
      id: 2,
      articleId: 2,
      author: '匿名用户',
      content: '异步编程真的很重要，谢谢分享！',
      createdAt: '2023-11-16T12:45:00.000Z',
      approved: false
    },
    {
      id: 3,
      articleId: 5,
      author: 'Vue学习者',
      content: '请问provide/inject和Vuex在使用场景上有什么区别？',
      createdAt: '2023-11-17T08:30:00.000Z',
      approved: false
    }
  ])

  // 获取所有文章，按创建时间降序排序
  const getAllArticles = computed(() => {
    return [...articles.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  // 根据ID获取文章
  const getArticleById = (id) => {
    return articles.value.find(article => article.id === id);
  };

  // 根据筛选条件过滤文章
  const getFilteredArticles = (category, tag, searchTerm) => {
    let result = [...articles.value];
    
    if (category) {
      result = result.filter(article => article.category === category);
    }
    
    if (tag) {
      result = result.filter(article => article.tags.includes(tag));
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(term) || 
        article.summary.toLowerCase().includes(term) || 
        article.content.toLowerCase().includes(term)
      );
    }
    
    // 按照时间降序排序
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // 获取热门文章
  const getPopularArticles = () => {
    return [...articles.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  };

  // 获取按分类分组的文章
  const getArticlesByCategory = (categoryName) => {
    const result = articles.value.filter(article => article.category === categoryName);
    // 按照时间降序排序
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // 获取按标签分组的文章
  const getArticlesByTag = (tagName) => {
    const result = articles.value.filter(article => article.tags.includes(tagName));
    // 按照时间降序排序
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // 获取相关文章
  const getRelatedArticles = (articleId) => {
    const currentArticle = getArticleById(articleId);
    if (!currentArticle) return [];
    
    // 计算两篇文章的相关度评分
    const calculateRelevanceScore = (article, currentArticle) => {
      let score = 0;
      
      // 如果分类相同，加分
      if (article.category === currentArticle.category) {
        score += 3;
      }
      
      // 根据共同标签数量加分
      const commonTags = article.tags.filter(tag => 
        currentArticle.tags.includes(tag)
      );
      score += commonTags.length * 2;
      
      // 可以根据其他因素继续计算相关度，例如标题相似度、内容关键词等
      
      return score;
    };
    
    const result = articles.value
      .filter(article => 
        article.id !== articleId && 
        (article.category === currentArticle.category || 
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .sort((a, b) => {
        // 计算相关度分数
        const aScore = calculateRelevanceScore(a, currentArticle);
        const bScore = calculateRelevanceScore(b, currentArticle);
        
        // 如果相关度相同，按照时间排序
        if (aScore === bScore) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        
        return bScore - aScore;
      })
      .slice(0, 3);
      
    return result;
  };

  // 按年月归档文章
  const archivedArticles = computed(() => {
    // 创建存放文章的临时对象
    const archive = {}
    
    // 将所有文章按年月分组
    articles.value.forEach(article => {
      const date = new Date(article.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      
      if (!archive[year]) {
        archive[year] = {}
      }
      
      if (!archive[year][month]) {
        archive[year][month] = []
      }
      
      archive[year][month].push(article)
    })
    
    // 创建结果对象，用于存储排序后的数据
    const result = {}
    
    // 按年从新到旧排序 (2025年在前，2024年在后)
    const sortedYears = Object.keys(archive).sort((a, b) => b - a)
    
    // 为每个年份创建条目
    sortedYears.forEach(year => {
      result[year] = {}
      
      // 按月从新到旧排序 (12月在前，1月在后)
      const sortedMonths = Object.keys(archive[year]).sort((a, b) => b - a)
      
      // 为每个月份创建条目
      sortedMonths.forEach(month => {
        // 对每个月中的文章按时间从新到旧排序
        archive[year][month].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        result[year][month] = archive[year][month]
      })
    })
    
    return result
  })

  // 添加评论
  const addComment = (articleId, author, content) => {
    const newComment = {
      id: Math.max(0, ...pendingComments.value.map(c => c.id)) + 1,
      articleId,
      author: author || '匿名用户',
      content,
      createdAt: new Date().toISOString(),
      approved: false
    }
    
    pendingComments.value.push(newComment)
    return newComment
  }

  // 审核评论
  const approveComment = (commentId) => {
    const comment = pendingComments.value.find(c => c.id === commentId)
    if (comment) {
      const article = articles.value.find(a => a.id === comment.articleId)
      if (article) {
        article.comments.push({...comment, approved: true})
        pendingComments.value = pendingComments.value.filter(c => c.id !== commentId)
        statistics.value.totalComments++
      }
    }
  }

  // 增加文章阅读量
  const incrementArticleViews = (articleId) => {
    const article = articles.value.find(article => article.id === Number(articleId))
    if (article) {
      article.views++
      statistics.value.totalViews++
    }
  }

  return { 
    articles, 
    categories, 
    tags, 
    statistics, 
    pendingComments,
    archivedArticles,
    getAllArticles,
    getArticleById, 
    getRelatedArticles,
    getArticlesByCategory,
    getArticlesByTag,
    getFilteredArticles,
    getPopularArticles,
    addComment,
    approveComment,
    incrementArticleViews
  }
}) 