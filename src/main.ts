import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// 动画本地引入
import '@/assets/css/animate.min.css'

// 引入antd组件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// import Axios from 'axios'
// app.config.globalProperties.$http = Axios

// import vueI18n from 'vue-i18n'
// const i18n = new vueI18n({
//   locale:'zh',
//   messages:{
//     zh:require('@/i18n/zh-Lan'),
//     en:require('@/i18n/en-Lan')
//   }
// })

app.use(store)
app.use(Antd)
// app.use(i18n)
app.use(router)
app.mount('#app')