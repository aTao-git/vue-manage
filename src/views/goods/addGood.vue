<template>
  <div class="addGood">
    <!-- 面包屑导航部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航部分开始 -->
    <!-- 步骤条部分开始 -->
    <el-steps :active="active-0" finish-status="success" style="margin-top: 30px">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 步骤条部分结束 -->
    <!-- 左标签页部分开始 -->
    <el-form :rules="rules" ref="addForm" :model="addform">
      <el-tabs
        :tab-position="'left'"
        style="height: 200px;margin-top:30px;height: 100%"
        v-model="active"
      >
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addform.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="goods_categories"
              :props="goodsprop"
              style="width:300px"
              v-model="addform.goods_cat"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            :file-list="fileList"
            :headers="getToken()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            action="http://localhost:8888/api/private/v1/upload"
            class="upload-demo"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
      </el-tabs>
      <el-button style="margin-left: 250px;width:200px" type="primary" round @click="next">下一步</el-button>
      <el-button style="margin-left: 350px;width:200px" type="primary" round @click="submitGoods">提交</el-button>
    </el-form>
    <!-- 左标签页部分结束 -->
  </div>
</template>
<script>
import { getCategories, addGoods } from '@/api/axios_goods.js'
export default {
  data () {
    return {
      active: '0',
      fileList: [],
      goods_categories: [],
      addform: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: []
      },
      goodsprop: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      var current = file.response.data.tmp_path
      for (var i = 0; i < this.addform.pics.length; i++) {
        if (this.addform.pics[i].pic === current) {
          this.addform.pics.splice(i, 1)
          break
        }
      }
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (res, file, fileList) {
      if (res.meta.status === 200) {
        this.addform.pics.push({ pic: res.data.tmp_path })
      }
    },
    next () {
      var number = Number(this.active)
      number++
      this.active = number.toString()
    },
    submitGoods () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addform.pics = this.addform.pics[0]
          this.addform.goods_cat = this.addform.goods_cat.join(',')
          addGoods(this.addform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'success'
                })
                this.$router.push({ name: 'goods' })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            message: '请合法输入商品内容',
            type: 'error'
          })
          return false
        }
      })
    },
    getToken () {
      var token = localStorage.getItem('itcast_manage_tao')
      return { Authorization: token }
    }
  },
  mounted () {
    getCategories([1, 2, 3])
      .then(res => {
        if (res.data.meta.status === 200) {
          this.goods_categories = res.data.data
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
