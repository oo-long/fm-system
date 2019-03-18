import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from "./views/Home.vue"
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import FundList from './views/FundList.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Index
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children: [
        {path: "",component: Home,meta:{title: "EF资金管理系统"}},
        {path: "/home",name:"home",component:Home,meta:{title: "EF资金管理系统"}},
        {path: "/profile",name:"profile",component:Profile,meta:{title: "个人主页"}},
        {path: "/fundlist",name:"fundlist",component:FundList,meta:{title: "资金流水"}}
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: "注册账号"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "登录账号"
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
      meta: {
        title: "404页面未找到"
      }
    },
  ]
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }
  const isLogin = localStorage.eleToken ? true : false;
  if( to.path == '/login' || to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
})

export default router;