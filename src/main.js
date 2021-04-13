import { createApp } from 'vue';
import components, { plugins } from './utils/element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.provide('plugins', app.config.globalProperties);
app.use(store).use(router);

app.mount('#app');
