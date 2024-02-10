import axios from 'axios'

const token = localStorage.getItem('auth:token')
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

api.defaults.headers['Authorization'] = `Bearer ${token}`

export default api
