import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MessageBoardView from '../views/MessageBoardView.vue'
import NotFoundView from '../views/NotFoundView.vue'

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
      path: '/comments',
      name: 'comments',
      component: MessageBoardView,
      meta: { title: '留言板' }
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      meta: { title: '博客' }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      meta: { title: '文章详情' }
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../views/JournalView.vue'),
      meta: { title: '随记' }
    },
    {
      path: '/journal/edit',
      name: 'journal-edit',
      component: () => import('../views/JournalEditView.vue'),
      meta: { title: '写随笔' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/CategoryView.vue'),
      props: { category: '图库' },
      meta: { title: '图库' }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchivePageView.vue'),
      meta: { title: '归档' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '页面未找到' }
    }
  ]
})

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Kiri的个人主页`
  next()
})

export default router 