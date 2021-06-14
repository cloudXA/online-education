
import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({ 
  
  routes: [
    { 
      path: '/',
      component: () => import ('@/home/index.vue'),
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
      path: "/summary/:companyId/:id",  // 题库
      component: () => import('@/components/summary/index.vue'),
      name: 'summary'
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
    },
    {
      path: "*",
      component: () => import("@/components/friendTips/404.vue")
    }
  ]
});