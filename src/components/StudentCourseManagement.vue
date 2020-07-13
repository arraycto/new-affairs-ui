<template>
  <div>
    <!-- 课程相关信息 -->
    <el-table
      :data="tableData.filter(data => !search || data.couName.toLowerCase().includes(search.toLowerCase()))">
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
        <!-- 搜索 -->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <!-- 加入课程 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-document-add"
            :disabled="isSelectedCourse(scope.row)"
            @click="open(scope.row)">加入课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 验证码 -->
    <el-dialog
      title="慢一点，先做道题吧"
      :visible.sync="centerDialogVisible"
      width="20%"
      destroy-on-close>
      <div style="margin: auto 65px 40px" id="divForVerify">
        <Verify @success="resSuccess" @error="resError" :type="2" id="verify"></Verify>
      </div>
    </el-dialog>

    <!-- 分页条 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :total="total"
      :page-size="pageSize"
      @current-change="currentChange"
      @prev-click="preClick"
      @next-click="nextClick">
    </el-pagination>
  </div>
</template>

<script>
  import Verify from 'vue2-verify'

  export default {
    // 学生端在线选课
    name: "StudentCourseManagement",
    data() {
      return {
        // 验证码手动激活标志
        centerDialogVisible: false,
        // 课程信息（表格）
        tableData: [],
        // 搜索
        search: '',
        // 当前页码
        currentPage: 1,
        // 总记录数
        total: 1,
        // 分页大小
        pageSize: 12,
        // 已选课程
        selectedCourses: [],
        // 验证码通过标志
        flag: false,
        // 行数据
        row: {},
      }
    },
    components: {
      // 验证码组件
      Verify
    },
    methods: {
      // 验证码成功
      resSuccess() {
        // 关闭模态框
        this.centerDialogVisible = false;
        // 发送请求
        this.handleAddCourse(this.row);
      },
      // 验证码失败
      resError() {
        this.$message.error({
          message: '认真计算',
          center: true
        });
      },
      // 打开验证码窗口
      open(row) {
        this.centerDialogVisible = true;
        // 保存当前行的数据
        this.row = row;
      },
      // 加入课程
      handleAddCourse(row) {
        // row为当前行的数据
        axios.post('/api/killers/killers/grab', {
          couId: row.couId,
          teaId: row.couBuilder,
          randomCode: row.randomCode
        })
          .then((response) => {
            if (response.data.code === 200) {
              // 请求成功后重新加载页面
              this.getOptionalCoursesByPage();
              this.$message.success({
                message: '加入成功',
                center: true
              });
              this.tableData = response.data.courseIPage.records;
              this.total = response.data.courseIPage.total;
            } else {
              // 给予错误提示
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
        console.log(row);
      },
      // 实现当前页码改变后页面数据重新加载
      currentChange() {
        this.getOptionalCoursesByPage();
      },
      // 下一页
      nextClick() {
        this.currentPage++;
        this.getOptionalCoursesByPage();
      },
      // 上一页
      preClick() {
        this.currentPage--;
        this.getOptionalCoursesByPage();
      },
      // 分页查询所有当前可选课程即也过选课时间的课程
      getOptionalCoursesByPage() {
        this.getSelectedCourses();
        axios.get('/api/course/course/getOptionalCoursesPageFromRedis?currentPage=' + this.currentPage)
          .then((response) => {
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.tableData = response.data.courseVoList.records;
              this.total = response.data.courseVoList.total;
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
      // 查询学生已选的课程couId用于对加入课程按钮的禁用
      getSelectedCourses() {
        axios.get('/api/student/student/getSelectedCoursesFromRedis')
          .then((response) => {
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.selectedCourses = response.data.courses;
            } else {
              // 给予错误信息
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
      // 如果该课程已选则禁用加入课程
      isSelectedCourse(row) {
        for (let i = 0; i < this.selectedCourses.length; i++) {
          // 返回的是一个List<String>，与js中的number做比较，所以使用==
          if (row.couId == this.selectedCourses[i]) {
            return true;
          }
        }
        return false;
      }
    },
    // 页面加载完成请求可选课程信息
    created() {
      this.getOptionalCoursesByPage();
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
