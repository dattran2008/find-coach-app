import { createApp } from 'vue';
import components, { plugins } from './utils/element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(store).use(router);

components.forEach((component) => {
  app.component(component.name, component);
});

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.mount('#app');
