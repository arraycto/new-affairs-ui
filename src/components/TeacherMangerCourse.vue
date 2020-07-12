<template>
  <div>
    <!-- 课程相关信息 -->
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
        label="开课账号"
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
        <!-- 新建课程 -->
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-folder-add"
                     @click="dialogFormVisible = true">新建课程
          </el-button>
        </template>
        <!-- 课程的编辑及删除 -->
        <template slot-scope="scope">
          <!-- scope.row表示当前行的数据 -->
          <el-button size="mini" type="primary" icon="el-icon-edit" circle
                     @click="dialogEditFormVisible=true;handleEdit(scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle
                     @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="current"
      :total="total"
      :page-size="pageSize"
      @current-change="currentChange"
      @prev-click="preClick"
      @next-click="nextClick"
    >
    </el-pagination>

    <!-- 新建课程的Dialog -->
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

    <!-- 编辑课程的Dialog -->
    <el-dialog title="编辑课程" :visible.sync="dialogEditFormVisible" width="30%">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="课程名" :label-width="formLabelWidth" prop="couName">
          <el-input v-model="editForm.couName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大人数" :label-width="formLabelWidth" prop="couCount">
          <el-input v-model="editForm.couCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选课时间" :label-width="formLabelWidth" prop="couTime">
          <el-date-picker
            v-model="editForm.couTime"
            type="datetime"
            placeholder="选择日期时间" prop="couTime">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">立即修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "TeacherMangerCourse",
    data() {
      return {
        // 课程信息（表格）
        tableData: [],
        // 新建课程的Dialog：关闭
        dialogFormVisible: false,
        // 编辑课程的Dialog：关闭
        dialogEditFormVisible: false,
        // 新建课程所绑定的表单数据
        form: {
          couName: '',
          couCount: '',
          couBuilder: '',
          couTime: ''
        },
        // 编辑课程绑定的表单数据
        editForm: {
          couId: '',
          couName: '',
          couCount: '',
          couTime: ''
        },
        formLabelWidth: '80px',
        // 当前页码
        current: 1,
        // 总记录数
        total: 1,
        // 分页大小
        pageSize: 12,
        // 表单校验规则
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
      // 编辑课程
      handleEdit(row) {
        this.editForm.couId = row.couId
        // 弹出编辑框并回显数据
        this.editForm.couName = row.couName;
        this.editForm.couCount = row.couCount;
        this.editForm.couTime = row.couTime;
      },
      // 提交编辑表单的业务
      submitEditForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验通过提交内容
            this.submitEditCourse();
          } else {
            this.$message.error({
              message: '认真填写！',
              center: true
            });
            return false;
          }
        });
      },
      // 提交修改的内容到服务器
      submitEditCourse() {
        // 关闭模态框
        this.dialogEditFormVisible = false;
        // 发送请求提交修改
        axios.post('/api/course/course/edit', {
          couId: this.editForm.couId,
          couName: this.editForm.couName,
          couCount: this.editForm.couCount,
          couTime: this.editForm.couTime

        })
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 修改成功后重新加载数据
              this.listByTeaId();
              this.$message({
                message: '修改成功',
                type: 'success',
                center: true
              });
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
      },
      // 删除课程
      handleDelete(couId) {
        // 删除
        axios.post('/api/course/course/del/couId', {
          couId: couId
        })
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 删除成功后重新加载数据
              this.listByTeaId();
              this.$message({
                message: '删除成功',
                type: 'success',
                center: true
              });
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
      },
      // 关闭新建表单的模态框后清除其内容
      closeDialog() {
        this.form.couName = '';
        this.form.couCount = '';
        this.form.couBuilder = '';
        this.form.couTime = '';
      },
      // 提交新建课程的业务
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交内容到服务器
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
      // 提交新建课程的内容到服务器
      submitCourse() {
        // 关闭模态框
        this.dialogFormVisible = false;
        // 构造数据
        let url = '/api/teacher/teacher/addCourse';
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
      // 实现当前页码改变后页面数据重新加载
      currentChange() {
        this.listByTeaId();
      },
      // 下一页
      nextClick() {
        this.current++;
        this.listByTeaId();
      },
      // 上一页
      preClick() {
        this.current--;
        this.listByTeaId();
      },
      // 分页查询指定教师开设的课程
      listByTeaId() {
        axios.get('/api/teacher/teacher/list/teaId?current=' + this.current)
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.tableData = response.data.courseIPage.records;
              this.total = response.data.courseIPage.total;
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
    // 页面创建后就加载数据
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
    text-align: center;
    margin: 30px auto;
  }

</style>
