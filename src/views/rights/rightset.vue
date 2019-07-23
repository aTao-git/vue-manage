<template>
  <div class="rightset">
    <!-- 面包屑导航部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航部分结束 -->
    <!-- 渲染数据表格部分开始 -->
    <el-table :data="rightlist" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row :key="one.id" v-for="one in scope.row.children" :gutter="10">
            <el-col style="border-top: 2px solid #eee;padding-top: 5px" :span="5">
              <el-tag closable>{{one.authName}}</el-tag>
            </el-col>
            <el-col style="border-top: 2px solid #eee;padding-top: 5px" :span="19">
              <el-row style="margin: 0 0 10px 0" :key="two.id" v-for="two in one.children" >
                <el-col :span="6"><el-tag closable type="danger">{{two.authName}}</el-tag></el-col>
                <el-col :span="18"><el-tag @close="delUserRight(scope.row,three.id)" style="margin: 0 5px 5px 0" :key="three.id" v-for="three in two.children" closable type="info">{{three.authName}}</el-tag></el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">此角色没有任何权限!</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <el-tooltip class="item" content="编辑" effect="dark" placement="bottom-start">
            <el-button circle icon="el-icon-edit" type="primary"></el-button>
          </el-tooltip>
          <el-tooltip class="item" content="分配" effect="dark" placement="bottom-start">
            <el-button circle icon="el-icon-star-off" type="warning"></el-button>
          </el-tooltip>
          <el-tooltip class="item" content="删除" effect="dark" placement="bottom-start">
            <el-button circle icon="el-icon-delete" type="danger"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 渲染数据表格部分结束 -->
  </div>
</template>
<script>
import { getRoles } from '@/api/axios_userCtrl.js'
import { delUserRight } from '@/api/axios_right.js'
export default {
  data () {
    return {
      rightlist: []
    }
  },
  methods: {
    async delUserRight (row, rightId) {
      let roleId = row.id
      let res = await delUserRight(roleId, rightId)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        row.children = res.data.data
      }
    }
  },
  mounted () {
    getRoles()
      .then(res => {
        if (res.data.meta.status === 200) {
          this.rightlist = res.data.data
          console.log(res)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="scss" scoped>
</style>
