import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import Student from "../components/Student";
import Teacher from "../components/Teacher";
import StudentElective from "../components/StudentElective";
import TeacherMangerCourse from "../components/TeacherMangerCourse";
import AlreadyElective from "../components/AlreadyElective";

Vue.use(Router)

export default new Router({
  // 十分重要！！！
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/index/login',
      children: [{
        path: '/index/login',
        component: Login
      }, {
        path: '/index/register',
        component: Register
      }]
    },
    {
      path: '/student',
      component: Student,
      redirect: '/student/elective',
      children: [{
        path: '/student/elective',
        component: StudentElective
      }, {
        path: '/student/already',
        component: AlreadyElective
      }]
    },
    {
      path: '/teacher',
      component: Teacher,
      redirect: '/teacher/manger',
      children: [{
        path: '/teacher/manger',
        component: TeacherMangerCourse
      }]
    },
  ]
})
