import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('itcast_manage_tao')) {
    config.headers['Authorization'] = localStorage.getItem('itcast_manage_tao')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios
