  import router from './router/index.js';
  // import store from './store/index.js';
  import tokenInstance from './utils/auth.js';  // 从cookie获取token

  const whiteList = ['/login', '/'];   // 路由白名单

  router.beforeEach((to, from, next) => { 
    const hasToken = tokenInstance.getToken();
   
    if(hasToken) {
      if(to.path == '/login') {
        next({ path: '/' })
      } else {
        next();  
      }
    } else {
      whiteList.indexOf(to.path) !== -1 ? next() : next({ path: '/login'})
      // next();
    }
  })


