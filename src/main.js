import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// 创建一个全局组件用于Material Icons
app.component('MaterialIcon', {
  props: ['icon'],
  template: '<span class="material-icons-sharp">{{ icon }}</span>'
})

// 禁用右键点击
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// 挂载应用
app.mount('#app')
