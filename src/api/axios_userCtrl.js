import axios from '@/untils/myaxios.js'
export const getUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}
