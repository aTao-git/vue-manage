<template>
  <div class="rightset">
    <!-- 面包屑导航部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航部分结束 -->
    <el-button @click="addRoleUser" plain type="success" style="margin-bottom:13px">添加角色</el-button>
    <!-- 渲染数据表格部分开始 -->
    <el-table :data="rightlist" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row :gutter="10" :key="one.id" v-for="one in scope.row.children">
            <el-col :span="5" style="border-top: 2px solid #eee;padding-top: 5px">
              <el-tag @close="delUserRight(scope.row,one.id)" closable>{{one.authName}}</el-tag>
            </el-col>
            <el-col :span="19" style="border-top: 2px solid #eee;padding-top: 5px">
              <el-row :key="two.id" style="margin: 0 0 10px 0" v-for="two in one.children">
                <el-col :span="6">
                  <el-tag
                    @close="delUserRight(scope.row,two.id)"
                    closable
                    type="danger"
                  >{{two.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    :key="three.id"
                    @close="delUserRight(scope.row,three.id)"
                    closable
                    style="margin: 0 5px 5px 0"
                    type="info"
                    v-for="three in two.children"
                  >{{three.authName}}</el-tag>
                </el-col>
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
        <template slot-scope="scope">
          <el-tooltip class="item" content="编辑" effect="dark" placement="bottom-start">
            <el-button circle icon="el-icon-edit" type="primary"></el-button>
          </el-tooltip>
          <el-tooltip class="item" content="分配" effect="dark" placement="bottom-start">
            <el-button
              @click="rightDialog(scope.row)"
              circle
              icon="el-icon-star-off"
              type="warning"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" content="删除" effect="dark" placement="bottom-start">
            <el-button circle icon="el-icon-delete" type="danger"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 渲染数据表格部分结束 -->
    <!-- 弹出添加角色对话框 -->
    <el-dialog :visible.sync="roledialogFormVisible" title="收货地址">
      <el-form :model="roleform" ref="roleForm" :label-width="'90px'" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input autocomplete="off" v-model="roleform.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色简述">
          <el-input autocomplete="off" v-model="roleform.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="roledialogFormVisible = false">取 消</el-button>
        <el-button @click="roleformsubmit" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出添加用户对话框结束 -->
    <!-- 弹出分配用户权限对话框 -->
    <el-dialog :visible.sync="rightdialogFormVisible" title="权限分配">
      <el-tree
        :data="roleList"
        :default-checked-keys="checkArr"
        :default-expand-all="true"
        :props="defaultProps"
        node-key="id"
        ref="addRoleForm"
        show-checkbox
      ></el-tree>
      <div class="dialog-footer" slot="footer">
        <el-button @click="rightdialogFormVisible = false">取 消</el-button>
        <el-button @click="addRoleForm" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出分配用户权限对话框结束 -->
  </div>
</template>
<script>
import { getRoles } from '@/api/axios_userCtrl.js'
import { delUserRight, getAllRightList, addRole, addRoleSubmit } from '@/api/axios_right.js'
export default {
  data () {
    return {
      roledialogFormVisible: false,
      rightdialogFormVisible: false,
      roleform: {
        roleName: '',
        roleDesc: ''
      },
      rightlist: [],
      roleList: [],
      checkArr: [],
      roleid: '',
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addRoleUser () {
      this.roledialogFormVisible = true
    },
    roleformsubmit () {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          addRoleSubmit(this.roleform)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                this.roledialogFormVisible = false
                this.getRolesList()
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请合法输入角色名'
          })
        }
      })
    },
    async rightDialog (row) {
      this.rightdialogFormVisible = true
      let res = await getAllRightList('tree')
      this.roleid = row.id
      if (res.data.meta.status === 200) {
        this.roleList = res.data.data
        console.log(res.data.data)
        this.checkArr.length = 0
        if (row.children && row.children.length > 0) {
          row.children.forEach(one => {
            if (one.children && one.children.length > 0) {
              one.children.forEach(two => {
                if (two.children && two.children.length > 0) {
                  two.children.forEach(three => {
                    this.checkArr.push(three.id)
                  })
                }
              })
            }
          })
        }
      }
    },
    async addRoleForm () {
      var obj1 = this.$refs.addRoleForm.getHalfCheckedKeys()
      var obj2 = this.$refs.addRoleForm.getCheckedKeys()
      var temp = [...obj1, ...obj2]
      var tempstr = temp.join(',')
      let res = await addRole(this.roleid, tempstr)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.rightdialogFormVisible = false
        this.getRolesList()
      }
    },
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
    },
    getRolesList () {
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
  },
  mounted () {
    this.getRolesList()
  }
}
</script>
<style lang="scss" scoped>
</style>
