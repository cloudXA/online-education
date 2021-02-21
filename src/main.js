import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

import axios from 'axios';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../common.scss';  

// 使mock生效
import '../mock/';

Vue.config.productionTip = false;

Vue.use(Element);
Vue.prototype.$http = axios; 

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
