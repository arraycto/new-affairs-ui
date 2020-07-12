<template>
  <div>
    <el-container>
      <!-- 导航栏 -->
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" active-text-color="#1e90ff"
               router>
        <el-menu-item index="/index/login" @click="invoke">首页</el-menu-item>
        <el-menu-item index="/teacher/manger">课程管理</el-menu-item>
        <el-menu-item index="">个人中心</el-menu-item>
        <el-menu-item index="">联系我们</el-menu-item>
      </el-menu>
    </el-container>

    <!--页头 -->
    <el-page-header @back="goBack" content="上级页面">
    </el-page-header>

    <!-- 课程信息（表格） -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Teacher",
    data() {
      return {
        // 默认激活的导航
        activeIndex: "/teacher/manger"
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 返回上级页面
      goBack() {
        this.$router.go(-1);
      },
      // 清除登录信息
      invoke() {
        axios.get("/api/teacher/teacher/invoke").then(response => {
          console.log(response);
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    margin: auto;
  }

  .el-menu-item {
    text-align: center;
    width: 300px;
  }

  .el-page-header {
    margin: 20px auto;
    width: 1200px;
  }
</style>
