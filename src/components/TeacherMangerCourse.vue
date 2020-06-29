<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        label="课程号"
        prop="couId"
        align="center">
      </el-table-column>
      <el-table-column
        label="课程名"
        prop="couName"
        align="center">
      </el-table-column>
      <el-table-column
        label="开课老师"
        prop="couBuilder"
        align="center">
      </el-table-column>
      <el-table-column
        label="最大人数"
        prop="couCount"
        align="center">
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-folder-add"
                     @click="dialogFormVisible = true">新建课程
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>

    <el-dialog title="新建课程" :visible.sync="dialogFormVisible" width="30%" @closed="closeDialog">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="课程名" :label-width="formLabelWidth" prop="couName">
          <el-input v-model="form.couName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大人数" :label-width="formLabelWidth" prop="couCount">
          <el-input v-model="form.couCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选课时间" :label-width="formLabelWidth" prop="couTime">
          <el-date-picker
            v-model="form.couTime"
            type="datetime"
            placeholder="选择日期时间" prop="couTime">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "TeacherMangerCourse",
    data() {
      return {
        tableData: {},
        dialogFormVisible: false,
        form: {
          couName: '',
          couCount: '',
          couBuilder: '',
          couTime: ''
        },
        formLabelWidth: '80px',
        rules: {
          couName: [
            {required: true, message: '请输入课程名', trigger: 'blur'},
          ],
          couCount: [
            {required: true, message: '请输入课程最大人数', trigger: 'blur'},
            {pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur'}
          ],
          couTime: [
            {required: true, message: '请选择选课时间', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        // 编辑
        console.log(index, row);
      },
      handleDelete(index, row) {
        // 删除
        console.log(index, row);
      },
      closeDialog() {
        // 清除dialog中的内容
        this.form.couName = '';
        this.form.couCount = '';
        this.form.couBuilder = '';
        this.form.couTime = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitCourse();
          } else {
            this.$message.error({
              message: '认真填写！',
              center: true
            });
            return false;
          }
        });
      },
      submitCourse() {
        // 关闭模态框
        this.dialogFormVisible = false;
        // 构造数据
        let url = 'http://localhost:88/api/teacher/teacher/addCourse';
        let data = {
          couName: this.form.couName,
          couCount: this.form.couCount,
          couBuilder: this.form.couBuilder,
          couTime: this.form.couTime
        }
        // 发送请求新建课程
        axios.post(url, data)
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后发送请求刷新页面
              this.listByTeaId();
              this.$message({
                message: '添加成功',
                type: 'success',
                center: true
              });
            } else {
              this.$message.error({
                message: response.data.msg,
                center: true
              });
            }
            console.log(response);
          })
          .catch((error) => {
            // 请求失败后给予提示
            console.log(error);
          });
      },
      listByTeaId() {
        axios.get('http://localhost:88/api/teacher/teacher/list/teaId')
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.tableData = response.data.courseList;
            } else {
              // 返回结果失败
              this.$message.error({
                message: response.data.msg,
                center: true
              });
            }
            console.log(response);
          })
          .catch((error) => {
            // 请求失败后给予提示
            console.log(error);
          });
      }
    },
    created() {
      this.listByTeaId();
    }
  }
</script>

<style scoped>
  .el-table {
    margin: auto;
    width: 1200px;
    height: 680px;
  }

  .el-pagination {
    width: 400px;
    margin: 30px auto;
  }

</style>
