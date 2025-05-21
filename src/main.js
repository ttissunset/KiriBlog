import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// 禁用右键点击
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// 挂载应用
app.mount('#app')
