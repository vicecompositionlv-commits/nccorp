import { createSSRApp } from 'vue'
import './styles/global.css'
import App from './App.vue'

// createSSRApp hydrates the prerendered markup in production and mounts normally in dev (empty #app).
createSSRApp(App).mount('#app')
