import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ArticleView from '../views/ArticleView.vue'
import BlogView from '../views/BlogView.vue'
import CategoryView from '../views/CategoryView.vue'
import ArchivePageView from '../views/ArchivePageView.vue'
import GalleryView from '../views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      meta: { title: '博客' }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
      meta: { title: '文章详情' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: { title: '图库' }
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchivePageView,
      meta: { title: '归档' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '页面未找到' }
    }
  ],
  // 添加滚动行为，在路由切换时自动滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    // 如果存在savedPosition（例如用户点击了浏览器的前进/后退按钮）
    if (savedPosition) {
      return savedPosition;
    }

    // 如果是同一个页面的不同参数（如文章ID变化）
    if (from.name === to.name && from.params.id !== to.params.id) {
      return { top: 0 };
    }

    // 其他情况，滚动到顶部
    return { top: 0 };
  }
})

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} | Kiri的个人主页`

  next()
})

// 路由加载完成后
router.afterEach(() => {
  setTimeout(() => {
  }, 200) // 短暂延迟以确保页面渲染完成
})

// 处理路由错误
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router 