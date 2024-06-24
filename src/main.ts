import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";

import { createPinia } from 'pinia'
const pinia = createPinia()

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')


