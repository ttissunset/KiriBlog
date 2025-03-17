# 个人博客网站

这是一个基于Vue 3、Vue Router和Pinia构建的现代化个人博客网站。

## 功能特点

### 1. 首页
- 网站介绍和快速入口
- 分类与标签快速筛选
- 站点统计信息展示

### 2. 文章详情页
- Markdown内容渲染
- 文章元数据展示（发布时间、分类、标签、阅读量）
- 上一篇/下一篇文章导航
- 相关文章推荐
- 匿名评论功能（需博主审核）

### 3. 归档页
- 按年份/月份归档的文章列表
- 分类与标签云
- 内容筛选功能

### 4. 搜索功能
- 全站搜索
- 关键词匹配（标题、内容）
- 搜索结果分页展示

## 技术栈

- Vue 3 - 前端框架
- Vue Router - 路由管理
- Pinia - 状态管理
- Date-fns - 时间处理
- 自定义Markdown渲染

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── assets/       # 静态资源
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia状态管理
├── views/        # 页面组件
└── components/   # 通用组件
```

## 自定义配置

请参阅 [Vite配置参考](https://vitejs.dev/config/). 