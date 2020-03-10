import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  
  routes: [
    {
      path: '/',
      component: () => import ('@/components/test.vue')
    },
    {
      path: '/templateGrammar',
      component: () => import ('@/components/template.vue')
    },
    {
      path: '/conditionalJudegment',
      component: () => import ('@/components/condition.vue')
    },
    {
      path: '/component',
      component: () => import ('@/components/component.vue')
    },
    {
      path: '/menu',
      component: () => import ('@/views/index.vue')
    },
    {
      path: '/mock-server',
      component: () => import ('@/components/mock-server.vue')
    }
  ]
});