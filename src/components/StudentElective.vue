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
            @click="handleAddCourse(scope.row)">加入课程
          </el-button>
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
      @next-click="nextClick">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "StudentElective",
    data() {
      return {
        // 课程信息（表格）
        tableData: [],
        // 搜索
        search: '',
        // 当前页码
        current: 1,
        // 总记录数
        total: 1,
        // 分页大小
        pageSize: 12
      }
    },
    methods: {
      // 加入课程
      handleAddCourse(row) {
        // row为当前行的数据
        axios.post('http://localhost:88/api/student/student/saveElective', {
          couId: row.couId,
          teaId: row.couBuilder
        })
          .then((response) => {
            // 判断返回的标志
            if (response.data.code === 200) {
              // 请求成功后展示数据
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
        nn
      },
      // 分页查询所有当前可选课程即也过选课时间的课程
      listByTime() {
        axios.get('http://localhost:88/api/course/course/list/time?current=' + this.current)
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
