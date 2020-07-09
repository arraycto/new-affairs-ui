import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import Student from "../components/Student";
import Teacher from "../components/Teacher";
import StudentElective from "../components/StudentElective";
import TeacherMangerCourse from "../components/TeacherMangerCourse";

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
    },
    {
      path: '/student',
      component: Student,
      redirect: '/elective',
      children: [{
        path: '/elective',
        component: StudentElective
      }]
    },
    {
      path: '/teacher',
      component: Teacher,
      redirect: '/manger',
      children: [{
        path: '/manger',
        component: TeacherMangerCourse
      }]
    },
  ]
})
