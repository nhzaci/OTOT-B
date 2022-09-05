import axios from 'axios'

const customAxios = axios.create({
  baseURL: process.env.API_ENDPOINT ?? 'http://localhost:8000',
})

customAxios.defaults.withCredentials = true

export default customAxios
