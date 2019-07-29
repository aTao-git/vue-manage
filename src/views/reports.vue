<template>
  <div class="reports">
    <v-chart :options="option"></v-chart>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import { getReports } from '@/api/axios_reports.js'
export default {
  data () {
    return {
      option: {}
    }
  },
  mounted () {
    getReports()
      .then(res => {
        this.option = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    'v-chart': ECharts
  }
}
</script>
<style lang="scss" scoped>

</style>
