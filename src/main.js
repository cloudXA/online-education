import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import "./assets/iconfont/iconfont.css";

import plugins from './plugins';
import request from './utils/request.js';
Vue.prototype.$ajax = request;


import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../common.scss';  

import './permission.js';

// 使mock生效
import '../mock';

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(plugins)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
