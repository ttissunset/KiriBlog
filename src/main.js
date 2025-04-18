import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import i18n from './i18n' // 引入i18n配置
import toast from './utils/toast' // 引入Toast服务
import { useThemeStore } from './stores/themeStore' // 引入主题状态管理

// 引入FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// 添加图标到库
library.add(fas, fab, far)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(i18n) // 使用i18n

// 初始化主题设置
const themeStore = useThemeStore()
themeStore.initTheme()

// 注册FontAwesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

// 全局属性
app.config.globalProperties.$toast = toast
window.$toast = toast; // 添加到全局对象，便于在非组件上下文中使用

// 禁用右键点击
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// 挂载应用
app.mount('#app')
