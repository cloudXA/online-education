import Vue from 'vue';
import Router from 'vue-router';
import test from '../components/test.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // component: () => import ('../components/test.vue')
      component: test
    }
  ]
});