<template>
  <div class="userCtrl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input
        class="input-with-select"
        placeholder="请输入内容"
        style="width:400px;margin-right:20px"
        v-model="userobj.query"
      >
        <el-button icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <el-button type="info">添加用户</el-button>
      <el-table :data="userlist" border style="width: 100%;margin-top: 15px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username" width="180"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="用户状态" prop="name" width="80">
          <template slot-scope="scope">
            <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑" effect="dark" placement="bottom-start">
              <el-button @click="useredit(scope.row)" circle icon="el-icon-edit" type="primary"></el-button>
            </el-tooltip>
            <el-tooltip class="item" content="点赞" effect="dark" placement="bottom-start">
              <el-button @click="userstar(scope.row)" circle icon="el-icon-star-off" type="warning"></el-button>
            </el-tooltip>
            <el-tooltip class="item" content="删除" effect="dark" placement="bottom-start">
              <el-button @click="userdel(scope.row)" circle icon="el-icon-delete" type="danger"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getUserList } from '@/api/axios_userCtrl.js'
export default {
  data () {
    return {
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userlist: []
    }
  },
  methods: {
    useredit (row) {
      console.log(row)
    },
    userstar (row) {
      console.log(row)
    },
    userdel (row) {
      console.log(row)
    }
  },
  mounted () {
    getUserList(this.userobj)
      .then(res => {
        if (res.data.meta.status === 200) {
          this.userlist = res.data.data.users
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
