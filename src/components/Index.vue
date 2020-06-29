<template>
  <el-container>
    <el-main>
      <p>new-affairs</p>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
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
