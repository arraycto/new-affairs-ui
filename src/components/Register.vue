<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
    <el-form-item label="账号" prop="id">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" show-password></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio label="男" value="1"></el-radio>
        <el-radio label="女" value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio label="学生"></el-radio>
        <el-radio label="教师"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">注册</el-button>
      <el-button @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        form: {
          id: '',
          name: '',
          sex: '男',
          status: '学生'
        }, rules: {
          id: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {pattern: /^[0-9]{3,8}$/, message: '3 到 8 个数字组成', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          status: [
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
              this.save('http://localhost:88/api/student/student/add', {
                stuId: this.form.id,
                stuName: this.form.name,
                stuPassword: this.form.password,
                stuSex: this.form.sex
              })
            } else {
              this.save('http://localhost:88/api/teacher/teacher/add', {
                teaId: this.form.id,
                teaName: this.form.name,
                teaPassword: this.form.password,
                teaSex: this.form.sex
              })
            }

          } else {
            this.failed("认真填写！")
            console.log('error submit!!');
            return false;
          }
        });
      },
      login() {
        this.$router.push({path: '/login'})
      },
      // 发送请求
      save(url, data) {
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
              this.failed("请求失败！")
              // 请求失败后给予提示
              console.log(error);
            }
          );
      },
      success() {
        this.$confirm('注册成功，为您跳转到登录页？', '确认跳转', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '快来登录吧！',
            center: true
          });
          this.login();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '为你停留在此处！',
            center: true
          });
        });
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
    margin: -150px auto auto auto;
    text-align: center;
  }

  .el-button {
    margin-left: 10px;
  }
</style>
