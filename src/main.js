import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import "./assets/iconfont/iconfont.css";

import plugins from './plugins';
import request from './utils/request.js';
Vue.prototype.$ajax = request;


import  {Form, FormItem, Input,  Select, Option} from 'element-ui';

import XInput from '@/common/z-input/index';


// import 'element-ui/lib/theme-chalk/index.css';
import '../common.scss';  

import './permission.js';

// 使mock生效
// import '../mock';

Vue.config.productionTip = false;

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(XInput);

Vue.use(plugins)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
