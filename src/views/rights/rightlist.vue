<template>
  <div class="rightlist">
    <!-- 面包屑导航部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航部分开始 -->
    <!-- 渲染数据表格部分开始 -->
    <el-table :data="rolelist" :row-class-name="tableRowClassName" style="width: 100%" border>
      <el-table-column type="index" label="序号" prop="date" width="80"></el-table-column>
      <el-table-column label="权限名称" prop="authName" width="180"></el-table-column>
      <el-table-column label="路径" prop="path" width="180"></el-table-column>
      <el-table-column label="层级" prop="">
        <template slot-scope="scope">
          {{scope.row.level | levelfilter}}
        </template>
      </el-table-column>
    </el-table>
    <!-- 渲染数据表格部分结束 -->
  </div>
</template>
<script>
import { getAllRightList } from '@/api/axios_right.js'
export default {
  data () {
    return {
      rolelist: []
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 4 === 1) {
        return 'warning-row'
      } else if (rowIndex % 4 === 3) {
        return 'success-row'
      }
      return ''
    }
  },
  filters: {
    levelfilter (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      } else {
        return ''
      }
    }
  },
  mounted () {
    getAllRightList('list')
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rolelist = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
