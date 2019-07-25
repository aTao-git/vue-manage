import axios from '@/untils/myaxios.js'
export const getUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
export const editUser = (id, data) => {
  return axios({
    url: `users/${id}`,
    method: 'put',
    data
  })
}
export const delUser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
export const changestate = (id, type) => {
  return axios({
    url: `users/${id}/state/${type}`,
    method: 'put'
  })
}
export const getRoles = () => {
  return axios({
    url: 'roles'
  })
}
export const setRoles = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.value }
  })
}
export const getLeftList = () => {
  return axios({
    url: 'menus'
  })
}
