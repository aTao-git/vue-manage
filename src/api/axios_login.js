import axios from '@/untils/myaxios.js'
export const login = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
