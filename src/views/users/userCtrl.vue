<template>
  <div class="userCtrl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <!-- 查询框部分 -->
      <el-input
        @keyup.native.13="init"
        class="input-with-select"
        placeholder="请输入内容"
        style="width:400px;margin-right:20px"
        v-model="userobj.query"
      >
        <el-button @click="init" icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <!-- 查询框部分结束 -->
      <el-button @click="addUserDialog=true" type="info">添加用户</el-button>
      <!-- 添加用户对话框 -->
      <el-dialog :visible.sync="addUserDialog" title="添加用户">
        <el-form :model="addform" :rules="rules" ref="addForm">
          <el-form-item :label-width="'80px'" label="用户名:" prop="username">
            <el-input autocomplete="off" v-model="addform.username"></el-input>
          </el-form-item>
          <el-form-item :label-width="'80px'" label="密码:" prop="password">
            <el-input autocomplete="off" v-model="addform.password"></el-input>
          </el-form-item>
          <el-form-item :label-width="'80px'" label="邮箱:" prop="email">
            <el-input autocomplete="off" v-model="addform.email"></el-input>
          </el-form-item>
          <el-form-item :label-width="'80px'" label="手机号:" prop="mobile">
            <el-input @keyup.native.13="addUser" autocomplete="off" v-model="addform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button @click="addUserDialog = false">取 消</el-button>
          <el-button @click="addUser" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加用户对话框结束 -->
      <!-- 表格部分 -->
      <el-table :data="userlist" border style="width: 100%;margin-top: 15px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username" width="180"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="用户状态" prop="name" width="80">
          <template slot-scope="scope">
            <el-switch
              @change="changestate(scope.row.id,scope.row.mg_state)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.mg_state"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑" effect="dark" placement="bottom-start">
              <el-button
                @click="showEditDialog(scope.row)"
                circle
                icon="el-icon-edit"
                type="primary"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" content="分配" effect="dark" placement="bottom-start">
              <el-button @click="userstar(scope.row)" circle icon="el-icon-star-off" type="warning"></el-button>
            </el-tooltip>
            <el-tooltip class="item" content="删除" effect="dark" placement="bottom-start">
              <el-button @click="userdel(scope.row)" circle icon="el-icon-delete" type="danger"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格部分结束 -->
      <!-- 添加编辑对话框 -->
      <el-dialog :visible.sync="editUserDialog" title="编辑用户">
        <el-form :model="editform" :rules="rules" ref="editForm">
          <el-form-item :label-width="'80px'" label="用户名:" prop="username">
            <el-input autocomplete="off" disabled v-model="editform.username"></el-input>
          </el-form-item>
          <el-form-item :label-width="'80px'" label="邮箱:" prop="email">
            <el-input autocomplete="off" v-model="editform.email"></el-input>
          </el-form-item>
          <el-form-item :label-width="'80px'" label="手机号:" prop="mobile">
            <el-input @keyup.native.13="editUser" autocomplete="off" v-model="editform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button @click="editUserDialog = false">取 消</el-button>
          <el-button @click="editUser" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加编辑对话框结束 -->
      <!-- 添加分配对话框 -->
      <el-dialog :visible.sync="starUserDialog" title="编辑用户">
        <el-form :model="starform" ref="starForm">
          <el-form-item :label-width="'120px'" label="当前的用户:" v-model="starform.id">
            <span>{{starform.username}}</span>
          </el-form-item>
          <el-form-item :label-width="'120px'" label="请选择角色:">
            <el-select placeholder="请选择" v-model="starform.value">
              <el-option
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
                v-for="item in roles"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button @click="starUserDialog = false">取 消</el-button>
          <el-button @click="setRoles" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加分配对话框结束 -->
      <el-pagination
        :current-page="userobj.pagenum"
        :page-size="userobj.pagesize"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getUserList,
  addUser,
  editUser,
  delUser,
  changestate,
  getRoles,
  setRoles
} from '@/api/axios_userCtrl.js'
export default {
  data () {
    return {
      total: 20,
      addUserDialog: false,
      editUserDialog: false,
      starUserDialog: false,
      starform: {
        username: '',
        id: '',
        value: ''
      },
      roles: [],
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userlist: [],
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+[@]+\w+[.]+\w/,
            message: '请输入正确的邮箱格式',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3,4,5,6,7,8,9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.userobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.userobj.pagenum = val
      this.init()
    },
    async changestate (id, type) {
      let res = await changestate(id, type)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      } else {
        this.$message({
          message: res.data.meta.msg,
          type: 'error'
        })
      }
    },
    async userstar (row) {
      this.starUserDialog = true
      this.starform.username = row.username
      this.starform.id = row.id
      let res = await getRoles()
      if (res.data.meta.status === 200) {
        this.roles = res.data.data
      }
    },
    setRoles () {
      this.$refs.starForm.validate(valid => {
        if (valid) {
          console.log(this.starform)
          setRoles(this.starform)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                this.starUserDialog = false
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
          return false
        }
      })
    },
    userdel (row) {
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await delUser(row.id)
          if (res.data.meta.status === 200) {
            if (this.userlist.length === 1) {
              --this.userobj.pagenum
            }
            this.userobj.pagenum =
              this.userobj.pagenum < 1 ? 1 : this.userobj.pagenum
            this.init()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    init () {
      getUserList(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.userlist = res.data.data.users
            this.total = res.data.data.total
            console.log(res)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addUser () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUser(this.addform)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'success'
                })
                this.addUserDialog = false
                this.init()
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
          return false
        }
      })
    },
    async editUser () {
      let res = await editUser(this.editform.id, {
        email: this.editform.email,
        mobile: this.editform.mobile
      })
      if (res.data.meta.status === 200) {
        this.editUserDialog = false
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
        this.init()
      }
    },
    showEditDialog (row) {
      this.editUserDialog = true
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
</style>
