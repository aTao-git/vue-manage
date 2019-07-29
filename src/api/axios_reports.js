import axios from '@/untils/myaxios.js'
export const getReports = () => {
  return axios({
    url: `reports/type/1`
  })
}
