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
        <!-- 选课 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-document-add"
            :disabled="isInJoinCourse(scope.row)"
            @click="open(scope.row)">加入课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="慢一点，先做道题吧"
      :visible.sync="centerDialogVisible"
      width="20%"
      destroy-on-close>
      <div style="margin: auto 65px 40px">
        <Verify @success="resSuccess" @error="resError" :type="2"></Verify>
      </div>
    </el-dialog>

    <!-- 分页条 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="current"
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
    name: "StudentElective",
    data() {
      return {
        // 验证码手动激活
        centerDialogVisible: false,
        // 课程信息（表格）
        tableData: [],
        // 搜索
        search: '',
        // 当前页码
        current: 1,
        // 总记录数
        total: 1,
        // 分页大小
        pageSize: 12,
        // 已选课程
        joinCourse: [],
        // 验证码是否通过
        flag: false,
        // 行数据
        row: {},
      }
    },
    components: {
      Verify
    },
    methods: {
      // 验证码通过
      resSuccess() {
        // 关闭模态框
        this.centerDialogVisible = false;
        // 发送请求
        this.handleAddCourse(this.row);
      },
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
        axios.post('/api/killers/killers/kill', {
          couId: row.couId,
          teaId: row.couBuilder,
          randomCode: row.randomCode
        })
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.listByTime();
              this.$message.success({
                message: '加入成功',
                center: true
              });
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
        console.log(row);
      },
      // 实现当前页码改变后页面数据重新加载
      currentChange() {
        this.listByTime();
      },
      // 下一页
      nextClick() {
        this.current++;
        this.listByTime();
      },
      // 上一页
      preClick() {
        this.current--;
        this.listByTime();
      },
      // 分页查询所有当前可选课程即也过选课时间的课程
      listByTime() {
        this.isJoin();
        axios.get('/api/course/course/list/kill?current=' + this.current)
          .then((response) => {
            // 判断返回的标志
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
      // 查询学生已选的课程couId
      isJoin() {
        axios.get('/api/student/student/isJoin')
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后展示数据
              this.joinCourse = response.data.courses;
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
      // 如果该课程已选则禁用加入课程
      isInJoinCourse(row) {
        for (let i = 0; i < this.joinCourse.length; i++) {
          if (row.couId == this.joinCourse[i]) {
            return true;
          }
        }
        return false;
      }
    },
    // 页面加载完成就请求数据
    created() {
      this.listByTime();
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
