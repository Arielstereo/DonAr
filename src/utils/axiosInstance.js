import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://donar-three.vercel.app/api/'
})

export default axiosInstance
