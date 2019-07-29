import axios from '@/untils/myaxios.js'
export const getAllGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}
export const getCategories = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
export const getAllParameter = (id, type) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel: type }
  })
}
