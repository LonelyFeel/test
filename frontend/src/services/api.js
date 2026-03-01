import axios from 'axios'

const api = axios.create({
  baseURL: ''
})

export const fetchMe = () => api.get('/api/me')
export const fetchMetrics = (params) => api.get('/api/metrics/fault-ready', { params })
export const searchDetectors = (params) => api.get('/api/detectors/search', { params })
export const exportDetectors = (params) => api.get('/api/export/detectors', { params, responseType: 'blob' })

export default api
