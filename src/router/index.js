import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { title: "首页" },
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
  },
});

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `KiriBlog | ${to.meta.title} `;

  next();
});

// 路由加载完成后
router.afterEach(() => {
  setTimeout(() => { }, 200); // 短暂延迟以确保页面渲染完成
});

// 处理路由错误
router.onError((error) => {
  console.error("路由错误:", error);
});

export default router;
