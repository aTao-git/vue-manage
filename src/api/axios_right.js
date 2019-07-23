import axios from '@/untils/myaxios.js'
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
export const delUserRight = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
