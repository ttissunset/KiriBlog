import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ArticleView from '../views/ArticleView.vue'
import BlogView from '../views/BlogView.vue'
import JournalView from '../views/JournalView.vue'
import JournalEditView from '../views/JournalEditView.vue'
import CategoryView from '../views/CategoryView.vue'
import ArchivePageView from '../views/ArchivePageView.vue'

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
      path: '/journal',
      name: 'journal',
      component: JournalView,
      meta: { title: '随记' }
    },
    {
      path: '/journal/edit',
      name: 'journal-edit',
      component: JournalEditView,
      meta: { title: '写随笔' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: CategoryView,
      props: { category: '图库' },
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
  ]
})

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Kiri的个人主页`
  next()
})

export default router 