<template>
  <div class="goodsList">
    <!-- 面包屑导航部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航部分开始 -->
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
    <el-button @click="$router.push({name: 'addGood'})" type="info">添加商品</el-button>
    <!-- 查询框部分结束 -->
    <!-- 渲染数据表格部分开始 -->
    <el-table :data="goodslist" border style="width: 100%;margin-top: 15px">
      <el-table-column label="序号" prop="date" type="index" width="80"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name" width="500"></el-table-column>
      <el-table-column label="商品价格" prop="goods_price" width="120"></el-table-column>
      <el-table-column label="商品状态" prop>
        <template slot-scope="scope">{{scope.row.goods_state | stateFilter}}</template>
      </el-table-column>
      <el-table-column label="商品质量" prop="goods_weight" width="120"></el-table-column>
      <el-table-column label="创建时间" width="380">
        <template slot-scope="scope">{{scope.row.upd_time | timeFilter}}</template>
      </el-table-column>
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
    <!-- 分页结构部分开始 -->
    <el-pagination
      :current-page="userobj.pagenum"
      :page-size="userobj.pagesize"
      :page-sizes="[5, 10, 15, 20]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 分页结构部分结束 -->
  </div>
</template>
<script>
import { getAllGoodsList } from '@/api/axios_goods.js'
export default {
  data () {
    return {
      goodslist: [],
      total: 0,
      userobj: {
        query: '',
        pagesize: 10,
        pagenum: 1
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
    init () {
      getAllGoodsList(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            console.log(res)
            this.goodslist = res.data.data.goods
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    stateFilter (data) {
      if (data === 2) {
        return '已审核'
      } else if (data === 1) {
        return '未审核'
      } else {
        return '未知'
      }
    },
    timeFilter (data) {
      // 获取时间
      var now = new Date(data * 1000)
      // 将年份赋值给year
      var year = now.getFullYear()
      // 将月份赋值给mon
      var mon = now.getMonth() + 1
      // 将日期赋值给dat
      var dat = now.getDate()
      // 将周几赋值给day
      var day = now.getDay()
      // 将小时赋值给hour
      var hour = now.getHours()
      // 将分钟赋值给min
      var min = now.getMinutes()
      // 将秒赋值给min
      var sec = now.getSeconds()
      // 当min的值小于10的时候，min的值前加上0
      if (min < 10) {
        min = '0' + min
      }
      // 当sec的值小于10的时候，sec的值前面加上0
      if (sec < 10) {
        sec = '0' + sec
      }
      var week = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      week = week[day]
      return (
        year +
        '年' +
        mon +
        '月' +
        dat +
        '日' +
        '\n' +
        week +
        '\n' +
        hour +
        '时' +
        min +
        '分' +
        sec +
        '秒'
      )
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
