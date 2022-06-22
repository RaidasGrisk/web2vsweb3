// https://tailwindcss.com/docs/installation
// https://www.hyperui.dev/components/banners
// https://merakiui.com/components/#
// https://quatrochan.github.io/Equal/components/notification
// https://hypercolor.dev/

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store/index'

import sal from "sal.js"
import "/node_modules/sal.js/dist/sal.css"

import naive from 'naive-ui'

// atropos.js
import 'atropos/css'

const app = createApp(App)
app.use(store)
app.use(naive)
app.use(sal)
app.mount('#app')
