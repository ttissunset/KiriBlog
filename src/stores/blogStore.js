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
    },
    {
      id: 12,
      title: '现代Web开发完全指南：从入门到精通',
      summary: '本文全面介绍现代Web开发的各个方面，包括前端框架、后端技术、性能优化、安全实践以及未来趋势，帮助开发者构建高质量的Web应用。',
      content: `# 现代Web开发完全指南：从入门到精通

## 引言

Web开发领域在过去几年经历了巨大的变革。从单页面应用的兴起到微服务架构的普及，从原生JavaScript到各种框架的繁荣发展，现代Web开发已经成为一个复杂而又充满活力的生态系统。

> 优秀的Web应用不仅仅是代码的堆砌，更是用户体验与技术完美结合的艺术品。

本文将全面介绍现代Web开发的各个方面，帮助初学者和有经验的开发者更好地理解和应用这些技术。

![Web开发全景图](https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 1. 前端开发基础

### 1.1 HTML5语义化标签

HTML5引入了许多语义化标签，使代码结构更加清晰：

\`\`\`html
<header>网站头部</header>
<nav>导航菜单</nav>
<main>
  <article>
    <section>文章第一部分</section>
    <section>文章第二部分</section>
  </article>
</main>
<aside>侧边栏</aside>
<footer>网站底部</footer>
\`\`\`

语义化标签的好处包括：

* 提高代码可读性
* 有利于SEO优化
* 更好的可访问性
* 便于样式应用和维护

### 1.2 CSS现代特性

现代CSS已经具备强大的功能，包括：

1. Flexbox布局
2. Grid网格布局
3. CSS变量
4. CSS动画

看看这个Flexbox的例子：

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 300px;
  margin: 10px;
}
\`\`\`

> Flexbox和Grid的出现彻底改变了网页布局方式，使复杂布局变得简单而直观。

### 1.3 JavaScript与ECMAScript

现代JavaScript（ES6+）提供了许多强大的特性：

\`\`\`javascript
// 解构赋值
const { name, age } = person;

// 箭头函数
const multiply = (a, b) => a * b;

// 模板字符串
const greeting = \`你好，\${name}，今年\${age}岁\`;

// Promise异步处理
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// async/await简化异步代码
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## 2. 前端框架与库

### 2.1 主流前端框架对比

下表对比了三大主流前端框架的关键特性：

| 特性 | React | Vue | Angular |
| --- | --- | --- | --- |
| 开发公司/个人 | Facebook | 尤雨溪(独立) | Google |
| 首次发布年份 | 2013 | 2014 | 2016(Angular 2+) |
| 编程范式 | 函数式 | 混合 | 面向对象 |
| 学习曲线 | 中等 | 平缓 | 陡峭 |
| 数据绑定 | 单向 | 双向/单向 | 双向 |
| 组件定义 | JSX | 单文件组件 | TypeScript类 |
| 状态管理 | Redux/Context | Vuex/Pinia | NgRx/Services |
| 路由方案 | React Router | Vue Router | Angular Router |
| TypeScript支持 | 良好 | 良好 | 原生支持 |
| 社区规模 | 非常大 | 大 | 大 |
| 适用场景 | 复杂单页应用 | 中小型应用 | 企业级应用 |

### 2.2 React生态系统

React凭借其组件化思想和虚拟DOM机制成为最流行的前端库之一。

**React函数组件示例**：

\`\`\`jsx
function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="profile-card">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? '保存' : '编辑'}
      </button>
    </div>
  );
}
\`\`\`

React生态包括：

1. **状态管理**：Redux, MobX, Recoil
2. **路由**：React Router
3. **UI库**：Material-UI, Ant Design
4. **元框架**：Next.js, Remix

![React组件结构示例](https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

### 2.3 Vue.js的优雅设计

Vue.js以其渐进式架构和简洁API赢得了广泛喜爱。

**Vue组件示例**：

\`\`\`vue
<template>
  <div class="task-item" :class="{ completed: task.done }">
    <input type="checkbox" v-model="task.done">
    <span>{{ task.title }}</span>
    <button @click="removeTask">删除</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits(['remove']);

const removeTask = () => {
  emit('remove', props.task.id);
};
</script>

<style scoped>
.task-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
}
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
\`\`\`

Vue的优势包括：

* 模板语法直观
* 响应式系统高效
* 单文件组件结构清晰
* 学习曲线平缓

## 3. 后端技术栈

### 3.1 常用后端语言性能对比

| 语言/平台 | 处理请求速度(req/sec) | 内存使用(MB) | 启动时间(ms) | 开发效率 | 生态系统 |
| --- | --: | --: | --: | --- | --- |
| Node.js | ~19,000 | ~70 | ~120 | 高 | 丰富 |
| Go | ~50,000 | ~20 | ~15 | 中 | 成长中 |
| Java (Spring) | ~25,000 | ~400 | ~5,000 | 中 | 非常丰富 |
| Python (Django) | ~8,000 | ~100 | ~800 | 很高 | 丰富 |
| PHP (Laravel) | ~12,000 | ~80 | ~300 | 高 | 丰富 |
| Rust (Actix) | ~70,000 | ~12 | ~25 | 低-中 | 发展中 |
| .NET Core | ~30,000 | ~150 | ~1,000 | 高 | 丰富 |

*注：以上数据为典型配置下的近似值，实际性能因应用和配置不同而异*

### 3.2 Node.js与Express

Node.js使JavaScript能够在服务器端运行，而Express则是构建Web应用的流行框架。

\`\`\`javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 中间件示例
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// 路由处理
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' }
  ]);
});

app.post('/api/users', (req, res) => {
  // 创建新用户
  const newUser = req.body;
  res.status(201).json({ ...newUser, id: 3 });
});

app.listen(port, () => {
  console.log(\`服务器运行在 http://localhost:\${port}\`);
});
\`\`\`

### 3.3 数据库选择

现代Web应用可以选择多种数据库：

#### 关系型数据库与NoSQL数据库对比

| 特性 | 关系型数据库 | NoSQL数据库 |
| --- | --- | --- |
| 数据模型 | 表格/关系 | 文档/键值/列/图 |
| 模式 | 固定 | 灵活/无模式 |
| 事务支持 | 完全支持 | 有限/视类型而定 |
| 查询语言 | SQL (标准化) | 非标准化/特定API |
| 扩展方式 | 垂直扩展 | 水平扩展 |
| 一致性 | 强一致性 | 最终一致性 |
| 适用场景 | 复杂查询和事务 | 大数据和高并发 |
| 代表产品 | MySQL, PostgreSQL | MongoDB, Redis, Cassandra |

#### SQL示例：

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) VALUES ('johndoe', 'john@example.com');

SELECT * FROM users WHERE username = 'johndoe';
\`\`\`

#### MongoDB示例：

\`\`\`javascript
// 创建文档
db.users.insertOne({
  username: "johndoe",
  email: "john@example.com",
  preferences: {
    theme: "dark",
    notifications: true
  },
  roles: ["user", "editor"]
});

// 查询文档
db.users.find({
  "preferences.theme": "dark"
});
\`\`\`

> 数据库选择应基于项目需求，而非技术偏好。关系型数据库适合结构化数据和事务，NoSQL适合快速迭代和非结构化数据。

![数据库类型比较](https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 4. 全栈开发工具与实践

### 4.1 构建工具性能对比

| 构建工具 | 冷启动时间 | 热更新速度 | 打包性能 | 配置复杂度 | 插件生态 |
| --- | --- | --- | --- | --- | --- |
| Vite | 极快 (< 300ms) | 极快 | 快 | 低 | 中 |
| Webpack | 慢 (5-10s) | 中等 | 中等 | 高 | 丰富 |
| Parcel | 快 (1-2s) | 快 | 中等 | 几乎不需要 | 有限 |
| Rollup | 中等 (2-4s) | 中等 | 优秀(小体积) | 中等 | 中等 |
| esbuild | 极快 (< 200ms) | 极快 | 极快 | 低 | 有限 |
| Snowpack | 快 (< 1s) | 极快 | 中等 | 低 | 中等 |

### 4.2 DevOps与CI/CD

持续集成和持续部署是现代开发不可或缺的环节。

**GitHub Actions工作流示例**：

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      run: |
        # 部署命令
        echo "部署到生产环境"
\`\`\`

## 5. 性能优化

### 5.1 Web性能指标对比

| 性能指标 | 优秀 | 良好 | 需改进 | 较差 |
| --- | --- | --- | --- | --- |
| 首次内容绘制 (FCP) | < 1秒 | < 2秒 | < 4秒 | ≥ 4秒 |
| 最大内容绘制 (LCP) | < 2.5秒 | < 4秒 | < 6秒 | ≥ 6秒 |
| 首次输入延迟 (FID) | < 100ms | < 300ms | < 500ms | ≥ 500ms |
| 累积布局偏移 (CLS) | < 0.1 | < 0.25 | < 0.5 | ≥ 0.5 |
| 首次字节时间 (TTFB) | < 500ms | < 1秒 | < 1.5秒 | ≥ 1.5秒 |
| 总阻塞时间 (TBT) | < 200ms | < 500ms | < 1秒 | ≥ 1秒 |
| 交互到可用时间 (TTI) | < 3.8秒 | < 7.3秒 | < 12.5秒 | ≥ 12.5秒 |

### 5.2 前端性能优化

提升Web应用性能的关键策略：

* **资源压缩与合并**
* **懒加载与代码分割**
* **图片优化**
* **缓存策略**

**懒加载组件示例**：

\`\`\`jsx
import React, { lazy, Suspense } from 'react';

// 懒加载组件
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <h1>我的应用</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

### 5.3 CSS加载优化最佳实践

| 优化技术 | 描述 | 实现方式 | 影响 |
| --- | --- | --- | --- |
| 关键CSS内联 | 直接在HTML中内联首屏渲染必需的CSS | 提取并内联关键样式 | 减少首屏渲染阻塞时间 |
| CSS文件预加载 | 提前加载关键CSS文件 | 使用\`<link rel="preload">\` | 确保重要资源优先加载 |
| 异步加载非关键CSS | 使用非阻塞方式加载非关键CSS | 使用\`media="print" onload="this.media='all'"\` | 避免非关键CSS阻塞渲染 |
| CSS分割 | 按路由或组件分割CSS | 使用CSS Modules或构建工具拆分 | 减少每个页面的CSS加载量 |
| 移除未使用的CSS | 删除页面上未使用的CSS规则 | 使用PurgeCSS等工具 | 减少CSS文件体积 |
| 压缩CSS | 移除空格和注释等 | 使用cssnano等压缩工具 | 减少文件体积和传输时间 |
| 使用CSS变量 | 集中管理常用值 | 定义和使用CSS自定义属性 | 提高可维护性和减少重复 |

## 6. 安全最佳实践

### 6.1 常见Web安全威胁

Web应用面临多种安全挑战：

* **XSS (跨站脚本攻击)**
* **CSRF (跨站请求伪造)**
* **SQL注入**
* **中间人攻击**

### 6.2 OWASP十大Web应用安全风险

| 排名 | 安全风险 | 主要防御措施 |
| --- | --- | --- |
| 1 | 注入攻击 | 参数化查询、输入验证、ORM |
| 2 | 失效的身份认证 | 多因素认证、强会话管理 |
| 3 | 敏感数据暴露 | 加密传输、恰当存储、最小权限 |
| 4 | XML外部实体 | 禁用DTD、使用JSON |
| 5 | 失效的访问控制 | 权限检查、RBAC |
| 6 | 安全配置错误 | 安全基线、强化配置、最小权限 |
| 7 | 跨站脚本 | 内容安全策略、输出编码 |
| 8 | 不安全的反序列化 | 输入验证、完整性检查 |
| 9 | 使用含漏洞的组件 | 依赖管理、漏洞扫描 |
| 10 | 不足的日志记录和监控 | 集中日志、行为分析、告警 |

### 6.3 安全防护措施

\`\`\`javascript
// Express安全中间件配置
const helmet = require('helmet');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');

// 添加安全相关HTTP头
app.use(helmet());

// CSRF保护
app.use(csrf({ cookie: true }));

// 限制请求频率
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 15分钟内最多100次请求
});
app.use('/api/', apiLimiter);

// XSS防护 - 输入验证示例
function validateUserInput(input) {
  // 去除HTML标签
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
\`\`\`

## 7. 未来趋势与技术展望

### 7.1 前端技术趋势预测

| 技术趋势 | 当前状态 | 未来5年展望 | 主要优势 |
| --- | --- | --- | --- |
| WebAssembly | 良好支持，应用有限 | 广泛应用于复杂应用 | 接近原生性能、跨语言支持 |
| 微前端 | 部分采用，实现各异 | 统一标准，主流应用 | 团队自治、渐进升级 |
| 无代码/低代码 | 简单应用、原型设计 | 企业应用开发主流 | 开发效率、非开发者参与 |
| AI辅助开发 | 代码补全、简单生成 | 全流程辅助、自动重构 | 提高效率、减少错误 |
| Web3.0 | 实验阶段、部分应用 | 成熟的用户身份和数据所有权机制 | 用户控制、去中心化 |
| 原生Web组件 | 基本支持，采用有限 | 替代部分框架组件 | 标准化、无框架依赖 |
| 状态管理新范式 | Signals、Jotai等兴起 | 简化的响应式方案主导 | 性能提升、开发体验改善 |

### 7.2 WebAssembly

WebAssembly (WASM) 允许在浏览器中运行接近原生性能的代码。

\`\`\`rust
// Rust代码编译为WebAssembly
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[no_mangle]
pub extern "C" fn wasm_fibonacci(n: u32) -> u32 {
    fibonacci(n)
}
\`\`\`

### 7.3 边缘计算

边缘计算将服务部署到离用户更近的位置，减少延迟。

**Cloudflare Workers示例**：

\`\`\`javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 获取用户地理位置
  const userLocation = request.headers.get('CF-IPCountry');
  
  // 根据用户位置定制响应
  let content = '';
  if (userLocation === 'CN') {
    content = '欢迎来自中国的访问者！';
  } else {
    content = 'Welcome visitor!';
  }
  
  return new Response(content, {
    headers: { 'content-type': 'text/plain' },
  });
}
\`\`\`

![边缘计算网络](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 总结

现代Web开发是一个不断发展的领域，要成为一名出色的开发者，需要持续学习和实践。本文介绍的技术和最佳实践可以作为指南，但技术选择应该基于项目需求和团队能力。

记住，最好的技术是能够解决特定问题的技术，而不一定是最新或最流行的。

> 软件开发的核心是解决问题，而不是使用特定的技术栈。选择合适的工具，创造有价值的产品，是每个开发者应该追求的目标。

---

**参考资源：**

* [MDN Web Docs](https://developer.mozilla.org/)
* [Web.dev](https://web.dev/)
* [React官方文档](https://reactjs.org/)
* [Vue.js官方文档](https://vuejs.org/)
      `,
      createdAt: '2024-03-20T08:30:25.000Z',
      updatedAt: '2024-03-22T15:45:12.000Z',
      category: 'Web开发',
      tags: ['前端', '后端', '全栈', '性能优化', '安全'],
      views: 586,
      comments: [
        {
          id: 14,
          author: '全栈工程师',
          content: '文章非常全面，感谢分享这么详细的指南！',
          createdAt: '2024-03-21T10:15:45.000Z',
          approved: true
        },
        {
          id: 15,
          author: '前端初学者',
          content: '这篇文章对我帮助很大，特别是前端框架的比较部分。',
          createdAt: '2024-03-22T14:30:22.000Z',
          approved: true
        }
      ]
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