import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/global.scss'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
