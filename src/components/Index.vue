<template>
  <el-container>
    <el-main>
      <p>new-affairs</p>
      <!-- 登录、注册 -->
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    // 首页
    name: "Index"
  }
</script>

<style scoped>
  .el-main {
    background-color: #FFFFFF;
    height: 850px;
  }

  .el-main > p {
    font-family: "Bernard MT Condensed", serif;
    text-align: center;
    font-size: 180px;
    color: #1e90ff;
  }
</style>
