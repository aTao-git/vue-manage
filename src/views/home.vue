<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu :unique-opened='true' :collapse="iscollapse" :router="true" class="el-menu-vertical-demo" default-active="2">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-watermelon"></i>
              <span>用户列表</span>
            </template>
            <el-menu-item index="/home/userCtrl">
              <i class="el-icon-link"></i>
              <span>用户管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-cherry"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/rightset">
              <i class="el-icon-link"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/home/rightlist">
              <i class="el-icon-link"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span @click="iscollapse = !iscollapse" class="el-icon-s-order toggle-btn"></span>
          <span class="system-title">电商后台管理系统</span>
          <a class="welcome" href="javascrpt:;">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      iscollapse: false
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: 200px 60px;
    background-color: #b3c0d1;
  }
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    .toggle-btn {
      padding: 0 15px;
      margin-left: -20px;
      font-size: 36px;
      color: white;
      cursor: pointer;
      line-height: 60px;
      float: left;
      &:hover {
        background-color: #4292cf;
      }
    }
    .system-title {
      font-size: 28px;
      color: white;
    }
    .welcome {
      color: white;
      float: right;
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }

  .el-container {
    height: 100%;
  }
}
</style>
