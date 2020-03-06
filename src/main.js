import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
