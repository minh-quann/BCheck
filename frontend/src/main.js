import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/router.js' 
import 'dayjs'
import axios from './plugins/axios'

const app = createApp(App)

// Thêm axios vào global properties
app.config.globalProperties.$axios = axios

app.use(router)

app.mount('#app') 
