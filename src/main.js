// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



require('@/http/mockApi.js')

//引入Vuex
import store from './store/考试'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//配置axios
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false


//配置element-ui视图
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
Vue.use(ElementUI)

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入响应式布局
import AutoResponsive from 'autoresponsive-vue';
Vue.use(AutoResponsive);



//2002A期末卷 功能 （注意需要在路由配置文件中添加一个meta属性   requiresAuth: true, //判断是否登陆，没有登陆跳转到登陆页面）
//首页 如果没有token值跳转到登陆页面，有token值 进入
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    //判断用户是否登陆，先获取sessionStorage的数据
    let data = sessionStorage.getItem("user_token");
    if (!data) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})



// //有token值的时候无法返回登陆页面  没有token的时候可以返回登陆页面
// ///全局路由守卫
// router.beforeEach((to,from,next)=>{
//   //我要去登陆页面
//   if(to.name=="/login"){
//     //判断用户是否登陆，先获取sessionStorage的数据
//     let data = sessionStorage.getItem("user_token");
//     console.log(data);
//     //用户以及登陆过跳转后台管理页面
//     if(data != null){
//       next('/home');
//     }

//     next();
//   }
//   next();
// })


// //路由守卫 - 前置  只有登陆获取到token值 才能访问其他页面
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   let data = sessionStorage.getItem("user_token");
//   if (!data) return next('login')
//   next()
// })





//请求token 拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('user_token')
  // config.headers['token'] = window.sessionStorage.getItem('user_token')   //2001期末卷的 took值
  // 在最后必须 return config
  return config
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,       //挂载vue的实例上  也就是每个页面都可以用 不用单独引入
  components: { App },
  template: '<App/>'
})
