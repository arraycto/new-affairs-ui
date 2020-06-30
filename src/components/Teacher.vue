<template>
  <div>
    <el-container>
      <!-- 导航栏 -->
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" active-text-color="#1e90ff"
               router>
        <el-menu-item index="/login">首页</el-menu-item>
        <el-menu-item index="/manger">课程管理</el-menu-item>
        <el-menu-item index="">已开课程</el-menu-item>
        <el-menu-item index="">个人中心</el-menu-item>
        <el-menu-item index="">联系我们</el-menu-item>
      </el-menu>
    </el-container>

    <!--页头 -->
    <el-page-header @back="goBack" content="上级页面">
    </el-page-header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Teacher",
    data() {
      return {
        // 默认激活的导航
        activeIndex: "/manger"
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 返回上级页面
      goBack() {
        this.$router.go(-1);
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
    width: 240px;
  }

  .el-page-header {
    margin: 20px auto;
    width: 1200px;
  }
</style>
