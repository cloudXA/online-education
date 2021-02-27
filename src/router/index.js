import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  
  routes: [
    {
      path: '/',
      component: () => import ('@/views/home.vue'),
      name: 'home',
      children: [
        {
          path: '/knowledge',
          component: () => import ('@/components/knowledge')
        },
        {
          path: '/home-page',
          component: () => import('@/components/homePage')
        }
      ]
    },
    {
      path: '/searchBar',
      component: () => import ('@/components/navbar/search')
    },
    {
      path: '/navbar',
      component: () => import ('@/components/navbar')
    },
    {
      path: '/login',
      component: () => import ('@/components/login'),
      name: 'login'
    },
    {
      path: '/sign',
      component: () => import('@/components/sign'),
      name: 'sign'
    },
    {
      path: '/register',
      component: () => import ('@/components/register')
    }
  ]
});