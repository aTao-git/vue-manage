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
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-tabs
        :before-leave="beforeLeaveTab"
        :tab-position="'left'"
        @tab-click="handleClick"
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
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              :options="goods_categories"
              :props="goodsprop"
              style="width:300px"
              v-model="addform.goods_cat"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form :label-position="'right'" label-width="80px">
            <el-form-item :label="first.attr_name" v-for="first in goods_params" :key="first.attr_id">
            <el-checkbox-group style="display: inline-block;margin-right: 10px" v-for="(two,index) in first.attr_vals" v-model="first.attr_vals" :key="index">
              <el-checkbox :label="two" border></el-checkbox>
            </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <el-form :label-position="'right'" label-width="130px">
            <el-form-item :label="first.attr_name" v-for="first in attribute" :key="first.attr_id">
              <el-input :value="first.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            :file-list="fileList"
            :headers="getToken()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="handleBefore"
            action="http://localhost:8888/api/private/v1/upload"
            class="upload-demo"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quillEditor v-model="addform.goods_introduce"></quillEditor>
        </el-tab-pane>
      </el-tabs>
      <el-button @click="submitGoods" round style="margin-left: 500px;width:200px" type="primary">提交</el-button>
    </el-form>
    <!-- 左标签页部分结束 -->
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { getCategories, addGoods, getAllParameter } from '@/api/axios_goods.js'
import myemit from '@/untils/event.js'
export default {
  data () {
    return {
      active: '0',
      fileList: [],
      goods_categories: [],
      goods_params: [],
      attribute: [],
      addform: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: [],
        attrs: [],
        goods_introduce: ''
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
        ],
        goods_cat: [{ required: true, message: '必须选择分类' }]
      }
    }
  },
  methods: {
    async handleClick () {
      if (this.active === '1') {
        let res = await getAllParameter(this.addform.goods_cat[this.addform.goods_cat.length - 1], 'many')
        res.data.data.forEach(item => {
          let temp = item.attr_vals.split(',')
          item.attr_vals = temp
        })
        this.goods_params = res.data.data
      } else if (this.active === '2') {
        let res = await getAllParameter(this.addform.goods_cat[this.addform.goods_cat.length - 1], 'only')
        this.attribute = res.data.data
      }
    },
    handleRemove (file, fileList) {
      if (!file.response) {
        return
      }
      var current = file.response.data.tmp_path
      for (var i = 0; i < this.addform.pics.length; i++) {
        if (this.addform.pics[i].pic === current) {
          this.addform.pics.splice(i, 1)
          break
        }
      }
    },
    handleBefore (file) {
      if (file.type.indexOf('image/') !== 0) {
        this.$message.error('请选择图片')
        return false
      }
    },
    beforeLeaveTab () {
      return this.$refs.addForm.validate(valid => {
        if (!valid) throw new Error('取消成功！')
      })
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (res, file, fileList) {
      if (res.meta.status === 200) {
        this.addform.pics.push({ pic: res.data.tmp_path })
      }
    },
    submitGoods () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addform.pics = this.addform.pics[0]
          this.addform.goods_cat = this.addform.goods_cat.join(',')
          this.goods_params.forEach(item => {
            let id = item.attr_id
            item.attr_vals.forEach(item2 => {
              this.addform.attrs.push({ attr_id: id, attr_value: item2 })
            })
          })
          console.log(this.addform)
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
    console.log(this.$route)
    myemit.$on('sendid', (data) => {
      console.log(data)
    })
  },
  components: {
    quillEditor
  }
}
</script>
<style lang="scss" scoped>
</style>
