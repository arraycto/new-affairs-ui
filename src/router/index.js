import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Login from "../components/Login";
import Register from "../components/Register";

Vue.use(Router)

export default new Router({
  // 十分重要！！！
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/login',
      children: [{
        path: '/login',
        component: Login
      }, {
        path: '/register',
        component: Register
      }]
    }
  ]
})
