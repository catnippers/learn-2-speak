import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {Toggle, DoublePopover} from 'equal-vue'
import 'equal-vue/dist/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toggle)
app.use(DoublePopover)

app.mount('#app')
