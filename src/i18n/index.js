import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    nav: {
      home: "首页",
      gallery: "相册",
      blog: "文章",
      journal: "随记",
      archive: "归档"
    },
    header: {
      searchPlaceholder: "搜索文章...",
      langSwitch: "切换语言"
    },
    home: {
      title: "我的个人空间",
      subtitle: "记录日常，分享生活点滴"
    },
    journal: {
      title: "那些浅浅的叙述",
      subtitle: "希望能留有痕迹",
      newJournal: "写新随记",
      emptyJournal: "选择一篇随记来阅读",
      emptyJournalSub: "或者创建一篇新的随记"
    },
    archive: {
      title: "回忆与归档",
      subtitle: "岁月绵长，山高路远，葱茏回首，我们也曾在这里留下过足迹。"
    },
    common: {
      readMore: "阅读更多",
      noData: "暂无数据",
      loading: "加载中...",
      backToList: "返回列表",
      viewCount: "次阅读",
      tags: "标签："
    },
    article: {
      author: "作者",
      views: "次阅读",
      readingTime: "预计阅读时长",
      minutes: "分钟",
      updateAt: "更新于",
      aiSummary: "AI 摘要",
      poweredBy: "由 ChatGPT 提供支持",
      showMore: "显示更多",
      showLess: "收起",
      prevArticle: "上一篇",
      nextArticle: "下一篇",
      relatedArticles: "相关文章",
      comments: "评论区",
      noComments: "暂无评论",
      postComment: "发表评论",
      commentNote: "评论需要管理员审核后才会显示",
      nickname: "您的昵称 (可选)",
      commentContent: "评论内容",
      submit: "提交评论",
      notFound: "文章未找到",
      notFoundDesc: "您访问的文章可能已被删除或移动到其他位置。",
      backToHome: "返回首页",
      category: "分类：",
      publishedAt: "发布于："
    },
    gallery: {
      title: "相册",
      subtitle: "每一个精彩的瞬间，都值得被记录",
      cameraInfo: "相机信息",
      cameraModel: "相机型号",
      lens: "镜头",
      aperture: "光圈",
      shutterSpeed: "快门速度",
      focalLength: "焦距",
      photoTime: "拍摄时间",
      photoDesc: "照片描述",
      location: "拍摄地点",
      loadingImages: "加载图片中...",
      loadMore: "加载更多照片..."
    },
    blog: {
      title: "博客文章",
      subtitle: "分享技术与生活的点滴记录",
      category: "分类",
      popularPosts: "热门文章",
      noArticles: "没有找到符合条件的文章",
      tryDifferent: "请尝试使用不同的筛选条件",
      clearFilters: "清除所有筛选",
      resetFilter: "重置筛选",
      month: "月"
    },
    articleContent: {
      // 示例文章内容的多语言支持
      "2024年前端开发趋势展望": {
        title: "2024年前端开发趋势展望",
        summary: "探讨2024年前端开发领域的主要趋势，包括AI辅助开发、WebAssembly应用拓展、Web Components标准化等方向",
        content: "# 2024年前端开发趋势展望\n\n随着技术的不断演进，前端开发领域在2024年将迎来诸多新趋势。本文将探讨几个关键方向：\n\n## AI辅助开发工具的普及\n\n人工智能正深刻改变前端开发流程。像GitHub Copilot这样的工具已经能够根据注释生成代码，而2024年，我们将看到更多AI辅助工具的出现，它们能够：\n\n- 自动生成复杂组件\n- 智能重构代码\n- 提供更精准的性能优化建议\n\n## WebAssembly应用拓展\n\nWebAssembly将在2024年迎来更广泛的应用场景：\n\n- 高性能web应用（如图像处理工具、CAD软件）\n- 游戏开发\n- 跨平台应用框架\n\n## Web Components标准化\n\n虽然Web Components已经存在多年，但2024年可能是它真正被广泛采用的一年：\n\n- 主流框架提供更好的互操作性\n- 组件生态系统的成熟\n- 更多大型应用采用Web Components架构\n\n## 边缘计算的应用\n\n随着边缘计算技术的成熟，前端开发将更多地考虑如何利用这一优势：\n\n- 使用边缘函数优化API调用\n- 内容分发优化\n- 实时数据处理\n\n## Rust生态在前端工具链的崛起\n\nRust语言正在前端工具链中扮演越来越重要的角色：\n\n- 新一代构建工具（如SWC、Turbopack）\n- 更快的编译和打包速度\n- 更安全的依赖管理\n\n2024年，前端开发将继续朝着更高效、更安全、更具性能的方向发展。适应这些趋势，将帮助开发者创建更好的用户体验。"
      },
      "React Server Components实战": {
        title: "React Server Components实战",
        summary: "深入解析React Server Components的工作原理、使用场景及最佳实践，通过实例展示如何结合客户端组件构建高性能React应用",
        content: "# React Server Components实战指南\n\n## 引言\n\nReact Server Components (RSC) 是React生态系统的重要创新，它允许我们构建部分在服务器上渲染的组件。本文将深入探讨RSC的核心概念和实战应用。\n\n## 什么是Server Components?\n\nServer Components是在服务器上渲染并且永远不会在客户端上运行的React组件。它们的主要优势包括：\n\n- 减少客户端JavaScript包大小\n- 直接访问服务器资源（数据库、文件系统等）\n- 提升首屏加载性能\n\n## Server Components vs. Client Components\n\n在使用RSC架构时，我们需要区分两种类型的组件：\n\n**Server Components:**\n- 在服务器上执行\n- 不能使用hooks\n- 不能添加事件处理器\n- 可以直接访问服务器资源\n\n**Client Components:**\n- 在浏览器中执行\n- 可以使用所有React功能（状态、效果、事件等）\n- 需要显式标记（通常使用'use client'指令）\n\n## 实战案例：构建博客应用\n\n让我们构建一个简单的博客应用，展示RSC的实际应用：\n\n### 1. 创建Server Component获取文章列表\n\n```jsx\n// app/page.js (Server Component)\nasync function BlogList() {\n  // 直接在服务器上获取数据，无需客户端API调用\n  const articles = await fetchArticlesFromDatabase();\n  \n  return (\n    <div>\n      <h1>我的博客</h1>\n      {articles.map(article => (\n        <ArticlePreview key={article.id} article={article} />\n      ))}\n    </div>\n  );\n}\n```\n\n### 2. 结合Client Component处理交互\n\n```jsx\n// components/CommentForm.js\n'use client';\n\nimport { useState } from 'react';\n\nexport default function CommentForm({ articleId }) {\n  const [comment, setComment] = useState('');\n  \n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    await submitComment(articleId, comment);\n    setComment('');\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <textarea \n        value={comment} \n        onChange={(e) => setComment(e.target.value)} \n      />\n      <button type=\"submit\">提交评论</button>\n    </form>\n  );\n}\n```\n\n### 3. 混合使用Server和Client Components\n\n```jsx\n// app/articles/[id]/page.js\nimport CommentForm from '@/components/CommentForm';\n\nasync function ArticlePage({ params }) {\n  // 服务器组件可以直接获取数据\n  const article = await getArticleById(params.id);\n  const comments = await getArticleComments(params.id);\n  \n  return (\n    <div>\n      <h1>{article.title}</h1>\n      <div dangerouslySetInnerHTML={{ __html: article.content }} />\n      \n      <h2>评论</h2>\n      {comments.map(comment => (\n        <div key={comment.id}>{comment.text}</div>\n      ))}\n      \n      {/* 客户端组件处理交互 */}\n      <CommentForm articleId={params.id} />\n    </div>\n  );\n}\n```\n\n## 最佳实践\n\n1. **分离关注点**：将数据获取逻辑放在Server Components中，将交互逻辑放在Client Components中\n\n2. **优化数据获取**：利用React的自动批处理和并行数据获取\n\n3. **懒加载Client Components**：减少初始JavaScript包大小\n\n4. **考虑边界情况**：处理加载状态和错误情况\n\n## 结论\n\nReact Server Components为构建高性能React应用提供了强大的工具。通过合理区分服务器和客户端职责，我们可以创建既快速又交互丰富的用户体验。\n\n随着Next.js等框架对RSC的深度集成，这种开发模式将成为React应用开发的重要范式。"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      gallery: "Gallery",
      blog: "Blog",
      journal: "Journal",
      archive: "Archive"
    },
    header: {
      searchPlaceholder: "Search articles...",
      langSwitch: "Switch Language"
    },
    home: {
      title: "My Personal Space",
      subtitle: "Record daily life, share moments"
    },
    journal: {
      title: "Those Gentle Narratives",
      subtitle: "Hope to leave traces",
      newJournal: "Write New Journal",
      emptyJournal: "Select a journal to read",
      emptyJournalSub: "Or create a new one"
    },
    archive: {
      title: "Memories & Archives",
      subtitle: "Time is long, the road is far. Looking back at the lush years, we have left our footprints here."
    },
    common: {
      readMore: "Read More",
      noData: "No Data",
      loading: "Loading...",
      backToList: "Back to list",
      viewCount: "views",
      tags: "Tags:"
    },
    article: {
      author: "Author",
      views: "views",
      readingTime: "Est. reading time",
      minutes: "minutes",
      updateAt: "Updated on",
      aiSummary: "AI Summary",
      poweredBy: "Powered By ChatGPT",
      showMore: "Show More",
      showLess: "Show Less",
      prevArticle: "Previous",
      nextArticle: "Next",
      relatedArticles: "Related Articles",
      comments: "Comments",
      noComments: "No comments yet",
      postComment: "Post a Comment",
      commentNote: "Comments will be displayed after admin approval",
      nickname: "Your nickname (optional)",
      commentContent: "Comment content",
      submit: "Submit",
      notFound: "Article Not Found",
      notFoundDesc: "The article you're looking for may have been deleted or moved to another location.",
      backToHome: "Back to Home",
      category: "Category:",
      publishedAt: "Published at:"
    },
    gallery: {
      title: "Gallery",
      subtitle: "Every wonderful moment deserves to be recorded",
      cameraInfo: "Camera Info",
      cameraModel: "Camera Model",
      lens: "Lens",
      aperture: "Aperture",
      shutterSpeed: "Shutter Speed",
      focalLength: "Focal Length",
      photoTime: "Photo Time",
      photoDesc: "Photo Description",
      location: "Location",
      loadingImages: "Loading images...",
      loadMore: "Load more photos..."
    },
    blog: {
      title: "Blog",
      subtitle: "Sharing bits of tech and life",
      category: "Categories",
      popularPosts: "Popular Posts",
      noArticles: "No articles found",
      tryDifferent: "Try different filter criteria",
      clearFilters: "Clear all filters",
      resetFilter: "Reset Filter",
      month: "Month"
    },
    articleContent: {
      // Example article content in English
      "2024年前端开发趋势展望": {
        title: "Frontend Development Trends 2024",
        summary: "Exploring major trends in frontend development for 2024, including AI-assisted development, WebAssembly application expansion, Web Components standardization, and more",
        content: "# Frontend Development Trends 2024\n\nAs technology continues to evolve, the frontend development field will see many new trends in 2024. This article will explore several key directions:\n\n## Popularization of AI-Assisted Development Tools\n\nArtificial intelligence is profoundly changing the frontend development process. Tools like GitHub Copilot can already generate code based on comments, and in 2024, we'll see more AI-assisted tools emerge that can:\n\n- Automatically generate complex components\n- Intelligently refactor code\n- Provide more precise performance optimization suggestions\n\n## WebAssembly Application Expansion\n\nWebAssembly will see broader application scenarios in 2024:\n\n- High-performance web applications (such as image processing tools, CAD software)\n- Game development\n- Cross-platform application frameworks\n\n## Web Components Standardization\n\nAlthough Web Components have existed for years, 2024 may be the year they are widely adopted:\n\n- Mainstream frameworks providing better interoperability\n- Maturation of component ecosystems\n- More large-scale applications adopting Web Components architecture\n\n## Edge Computing Applications\n\nAs edge computing technology matures, frontend development will increasingly consider how to leverage this advantage:\n\n- Using edge functions to optimize API calls\n- Content delivery optimization\n- Real-time data processing\n\n## Rise of Rust Ecosystem in Frontend Toolchain\n\nThe Rust language is playing an increasingly important role in the frontend toolchain:\n\n- Next-generation build tools (such as SWC, Turbopack)\n- Faster compilation and bundling speeds\n- More secure dependency management\n\nIn 2024, frontend development will continue to evolve toward greater efficiency, security, and performance. Adapting to these trends will help developers create better user experiences."
      },
      "React Server Components实战": {
        title: "Practical Guide to React Server Components",
        summary: "In-depth analysis of React Server Components' working principles, use cases, and best practices, demonstrating how to build high-performance React applications by combining with client components",
        content: "# Practical Guide to React Server Components\n\n## Introduction\n\nReact Server Components (RSC) are an important innovation in the React ecosystem, allowing us to build components that render partially on the server. This article will explore the core concepts and practical applications of RSC.\n\n## What are Server Components?\n\nServer Components are React components that render on the server and never run on the client. Their main advantages include:\n\n- Reduced client-side JavaScript bundle size\n- Direct access to server resources (databases, file systems, etc.)\n- Improved first-screen loading performance\n\n## Server Components vs. Client Components\n\nWhen using RSC architecture, we need to distinguish between two types of components:\n\n**Server Components:**\n- Execute on the server\n- Cannot use hooks\n- Cannot add event handlers\n- Can directly access server resources\n\n**Client Components:**\n- Execute in the browser\n- Can use all React features (state, effects, events, etc.)\n- Need to be explicitly marked (typically using the 'use client' directive)\n\n## Practical Case: Building a Blog Application\n\nLet's build a simple blog application to demonstrate the practical application of RSC:\n\n### 1. Create a Server Component to Fetch Article List\n\n```jsx\n// app/page.js (Server Component)\nasync function BlogList() {\n  // Fetch data directly on the server, no client-side API calls needed\n  const articles = await fetchArticlesFromDatabase();\n  \n  return (\n    <div>\n      <h1>My Blog</h1>\n      {articles.map(article => (\n        <ArticlePreview key={article.id} article={article} />\n      ))}\n    </div>\n  );\n}\n```\n\n### 2. Combine with Client Component for Interaction\n\n```jsx\n// components/CommentForm.js\n'use client';\n\nimport { useState } from 'react';\n\nexport default function CommentForm({ articleId }) {\n  const [comment, setComment] = useState('');\n  \n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    await submitComment(articleId, comment);\n    setComment('');\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <textarea \n        value={comment} \n        onChange={(e) => setComment(e.target.value)} \n      />\n      <button type=\"submit\">Submit Comment</button>\n    </form>\n  );\n}\n```\n\n### 3. Mix Server and Client Components\n\n```jsx\n// app/articles/[id]/page.js\nimport CommentForm from '@/components/CommentForm';\n\nasync function ArticlePage({ params }) {\n  // Server components can fetch data directly\n  const article = await getArticleById(params.id);\n  const comments = await getArticleComments(params.id);\n  \n  return (\n    <div>\n      <h1>{article.title}</h1>\n      <div dangerouslySetInnerHTML={{ __html: article.content }} />\n      \n      <h2>Comments</h2>\n      {comments.map(comment => (\n        <div key={comment.id}>{comment.text}</div>\n      ))}\n      \n      {/* Client component handles interaction */}\n      <CommentForm articleId={params.id} />\n    </div>\n  );\n}\n```\n\n## Best Practices\n\n1. **Separate Concerns**: Put data fetching logic in Server Components and interaction logic in Client Components\n\n2. **Optimize Data Fetching**: Leverage React's automatic batching and parallel data fetching\n\n3. **Lazy Load Client Components**: Reduce initial JavaScript bundle size\n\n4. **Consider Edge Cases**: Handle loading states and error scenarios\n\n## Conclusion\n\nReact Server Components provide powerful tools for building high-performance React applications. By properly distinguishing server and client responsibilities, we can create user experiences that are both fast and richly interactive.\n\nWith deep integration of RSC in frameworks like Next.js, this development pattern will become an important paradigm for React application development."
      }
    }
  }
}

const i18n = createI18n({
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages,
  legacy: false, // 使用Composition API
  globalInjection: true // 全局注入$t方法
})

export default i18n 