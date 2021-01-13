import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  // mode:"history",   //路径去掉#
  routes: [
    //路由重定向
    {
      path: "/",
      redirect: "/login"
    },
    //登陆
    {
      path: "/login",
      name: "/login",
      component: r => require.ensure([], () => r(require('@/views/login')), 'demo'),
    },
    

  ]
})
