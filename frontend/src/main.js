import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/router.js' 
import 'dayjs'
const app = createApp(App)

app.use(router)

app.mount('#app') 
