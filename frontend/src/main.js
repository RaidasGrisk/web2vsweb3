// https://tailwindcss.com/docs/installation
// https://www.hyperui.dev/components/banners
// https://merakiui.com/components/#
// https://quatrochan.github.io/Equal/components/notification
// https://hypercolor.dev/

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store/index'

import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'

const app = createApp(App)
app.use(Equal)
app.use(store)
app.mount('#app')
