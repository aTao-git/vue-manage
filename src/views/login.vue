<template>
  <div class="login">
    <div class="container">
      <img alt class="avatar" src="../assets/avatar.jpg" />
      <el-form :model="loginForm" :rules="rules" class="demo-ruleForm" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="loginForm.username" v-firstfocus prefix-icon="icon-user-tie"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" @keyup.native.enter="login" prefix-icon="icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" @click="login">
            <span class="icon-tongue2 change"></span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/axios_login.js'
import { firstfocus } from '@/untils/directives.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$router.push({ name: 'home' })
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                showClose: true,
                message: '登陆失败',
                type: 'error'
              })
            })
        } else {
          this.$message({
            showClose: true,
            message: '账号密码不合法',
            type: 'error'
          })
          return false
        }
      })
    }
  },
  directives: {
    firstfocus
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
      .change {
        color: cadetblue;
        font-size: 20px;
      }
      :hover {
        .change {
          color: pink;
        }
      }
    }
  }
}
</style>
