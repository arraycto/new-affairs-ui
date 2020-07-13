<template>
  <!-- 登录表单 -->
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon size="mini">
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
    // 登录页
    name: "Login",
    data() {
      return {
        // 登录表单所绑定的数据
        form: {
          id: '',
          name: '',
          status: '学生'
        },
        // 表单校验规则
        rules: {
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
      // 提交表单
      submitForm(formName) {
        // 校验表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 表单校验成功则根据身份发送请求
            if (this.form.status === '学生') {
              this.go('/api/student/student/login', {
                stuId: this.form.id,
                stuPassword: this.form.password,
              }, "/student")
            } else {
              this.go('/api/teacher/teacher/login', {
                teaId: this.form.id,
                teaPassword: this.form.password,
              }, "/teacher")
            }
          } else {
            // 表单校验失败
            this.fail("认真填写！")
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 跳转到注册页面
      register() {
        this.$router.push({path: '/index/register'})
      },
      // 发送登录请求
      go(url, data, where) {
        axios.post(url, data)
          .then((response) => {
            if (response.data.code === 200) {
              // 请求成功后给予回复
              this.success(where);
            } else {
              this.fail(response.data.msg);
            }
            console.log(response);
          })
          .catch((error) => {
            // 请求失败后给予提示
            this.fail("请求失败！")
            console.log(error);
          });
      },
      // 请求成功后跳转到对应的界面
      success(where) {
        this.$router.push({path: where});
      },
      // 错误提示消息
      fail(msg) {
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
    margin: -100px auto auto auto;
    text-align: center;
  }

  .el-button {
    margin-left: 10px;
  }
</style>
