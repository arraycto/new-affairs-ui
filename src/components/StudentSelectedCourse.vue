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
        prop="teaId"
        align="center">
      </el-table-column>
      <el-table-column
        label="选课时间"
        prop="electiveTime"
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
        <!-- 退选课程 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-document-remove"
            @click="abortCourse(scope.row)">退选课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
    // 学生端已选课程
    name: "StudentSelectedCourse",
    data() {
      return {
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
        // 行数据
        row: {},
      }
    },
    components: {
      Verify
    },
    methods: {
      // 实现当前页码改变后页面数据重新加载
      currentChange() {
        this.getSelectedCourses();
      },
      // 下一页
      nextClick() {
        this.currentPage++;
        this.getSelectedCourses();
      },
      // 上一页
      preClick() {
        this.currentPage--;
        this.getSelectedCourses();
      },
      // 退选课程
      abortCourse(row) {
        this.$confirm('将在未来数小时内不能再次选择该课程，确定退选吗？', '退选课程', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          axios.get('/api/student/student/abortCourse?couId=' + row.couId)
            .then((response) => {
              if (response.data.code === 200) {
                this.getSelectedCourses();
                // 请求成功后展示数据
                this.$message.success({
                  message: '退课成功！',
                  center: true
                });
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '冲动是魔鬼，控制住自己！',
            center: true
          });
        });
      },
      // 分页查询已选课程（页面展示）
      getSelectedCourses() {
        axios.get('/api/student/student/getSelectedCourseFromDataBase?currentPage=' + this.currentPage)
          .then((response) => {
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.tableData = response.data.electiveVos.records;
              this.total = response.data.electiveVos.total;
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
    },
    // 页面加载完成获取已选课程信息
    created() {
      this.getSelectedCourses();
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
