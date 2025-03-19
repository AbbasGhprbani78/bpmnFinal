import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'tailwindcss/tailwind.css'
import router from './router.js'
import store from './store.js';
import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';
const app = createApp(App);
app.use(BalmUI);
app.use(BalmUIPlus);
app.use(router);
app.use(store);
app.mount('#app')
