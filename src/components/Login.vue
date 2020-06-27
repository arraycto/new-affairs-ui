<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
    <el-form-item label="账号" prop="id">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" show-password></el-input>
    </el-form-item>
    <el-form-item label="身份" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio label="学生"></el-radio>
        <el-radio label="教师"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
      <el-button @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          id: '',
          name: '',
          status: '学生'
        }, rules: {
          // 校验规则
          id: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {pattern: /^[0-9]{3,8}$/, message: '3 到 8 个数字组成', trigger: 'blur'}

          ], password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
          ], status: [
            {required: true, message: '请选择身份', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验成功根据身份发送请求
            if (this.form.status === '学生') {
              this.go('http://localhost:88/api/student/student/login', {
                stuId: this.form.id,
                stuPassword: this.form.password,
              })
            } else {
              this.go('http://localhost:88/api/teacher/teacher/login', {
                teaId: this.form.id,
                teaPassword: this.form.password,
              })
            }
          } else {
            this.failed("认真填写！")
            console.log('error submit!!');
            return false;
          }
        });
      },
      register() {
        this.$router.push({path: '/register'})
      },
      // 发送请求
      go(url, data) {
        axios.post(url, data)
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后给予回复
              this.success();
            } else {
              this.failed(response.data.msg);
            }
            console.log(response);
          })
          .catch((error) => {
            // 请求失败后给予提示
            this.failed("请求失败！")
            console.log(error);
          });
      },
      success() {
        // todo 跳转到首页
        alert("到首页了");
      },
      failed(msg) {
        this.$message.error({
          message: msg,
          center: true
        });
      }
    }
  }
</script>

<style scoped>
  .el-form {
    width: 600px;
    margin: -80px auto auto auto;
    text-align: center;
  }

  .el-button {
    margin-left: 10px;
  }
</style>
