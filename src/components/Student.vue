<template>
  <div>
    <el-container>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" active-text-color="#1e90ff"
               router>
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="/elective">在线选课</el-menu-item>
        <el-menu-item index="">已选课程</el-menu-item>
        <el-menu-item index="">个人中心</el-menu-item>
        <el-menu-item index="">联系我们</el-menu-item>
      </el-menu>
    </el-container>
    <el-page-header @back="goBack" content="上级页面">
    </el-page-header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        activeIndex: "/elective"
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goBack() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .el-menu {
    margin: auto;
  }

  .el-menu-item {
    text-align: center;
    width: 240px;
  }

  .el-page-header {
    margin: 20px auto;
    width: 1200px;
  }
</style>
