import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 引入FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// 添加图标到库
library.add(fas, fab, far)

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册FontAwesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
