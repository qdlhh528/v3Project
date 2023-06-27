import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupComponents } from './plugin'
import router from './router'
import store from './store'

//vant样式表
import 'vant/lib/index.css'

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.log(err)
}
//注册组件
setupComponents(app)

app.use(router).use(store).mount('#app')
