import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import Student from "../components/Student";
import Teacher from "../components/Teacher";
import StudentCourseManagement from "../components/StudentCourseManagement";
import TeacherCourseManagement from "../components/TeacherCourseManagement";
import StudentSelectedCourse from "../components/StudentSelectedCourse";

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
      redirect: '/student/manage',
      children: [{
        path: '/student/manage',
        component: StudentCourseManagement
      }, {
        path: '/student/selected',
        component: StudentSelectedCourse
      }]
    },
    {
      path: '/teacher',
      component: Teacher,
      redirect: '/teacher/manage',
      children: [{
        path: '/teacher/manage',
        component: TeacherCourseManagement
      }]
    },
  ]
})
