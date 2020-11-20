import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createI18n } from 'vue-i18n'


const i18n = createI18n({
    legacy: true,
    locale: 'zh-cn',
    messages: {
      'zh-cn':require('@/i18n/zh-cn'),
      'zh-tw':require('@/i18n/zh-tw'),
      'en-us':require('@/i18n/en-us')
    }
  })

// 动画本地引入
import '@/assets/css/animate.min.css'
// 移动端样式引入
import '@/assets/css/inPhone.css'

// 引入antd组件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


const app = createApp(App)

// 不需要添加全局 需要使用的地方直接$i18n.locale
// app.config.globalProperties.$i18n = i18n


app.config.globalProperties.$filters = {
    // 添加全局时间过滤器
    filterDate(value: string){
        const [first ,center] = value.split('T')
        const last = center.split('.')[0]
        return `${first}  ${last}`
    }
}

app.use(store)
app.use(Antd)
app.use(i18n)
app.use(router)
app.mount('#app')