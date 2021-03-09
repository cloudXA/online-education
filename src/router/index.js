import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  
  routes: [
    { 
      path: '/',
      component: () => import ('@/views/home.vue'),
      redirect: '/homepage',
      name: 'home',
      children: [
        {
          path: '/knowledge',   
          component: () => import ('@/components/knowledge'),
          name: 'knowledge'
        },
        {
          path: '/homepage',
          component: () => import('@/components/homePage'),
          name: 'homepage'
        }
      ]
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