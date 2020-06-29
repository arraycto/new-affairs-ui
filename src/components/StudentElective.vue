<template>
  <div>
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
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-document-add"
            @click="handleEdit(scope.$index, scope.row)">加入课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "StudentElective",
    data() {
      return {
        tableData: [{
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        },{
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        },{
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        },{
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        },{
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        }, {
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        }, {
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        }, {
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        }, {
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        }, {
          couId: '073356.1',
          couName: 'CET6',
          couBuilder: '小李老师',
          couCount: '40'
        },],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
  .el-table {
    margin: auto;
    width: 1200px;
    height: 680px;
  }

  .el-pagination{
    width: 400px;
    margin: 30px auto;
  }
</style>
