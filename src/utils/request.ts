import router from '@/router/index'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showFailToast } from 'vant'
import {
  API_PREFIX_DAILY,
  API_PREFIX_DEV,
  API_PREFIX_PRO,
  OPERATION_API_PREFIX_DAILY,
  OPERATION_API_PREFIX_DEV,
  OPERATION_API_PREFIX_PRO
} from '../../config/constant'

const mode = import.meta.env.MODE
// baseURL
const BASE_URL =
  mode === 'production' ? API_PREFIX_PRO : mode === 'daily' ? API_PREFIX_DAILY : API_PREFIX_DEV

const OPERATION_BASE_URL =
  mode === 'production'
    ? OPERATION_API_PREFIX_PRO
    : mode === 'daily'
    ? OPERATION_API_PREFIX_DAILY
    : OPERATION_API_PREFIX_DEV

const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Client: 'mobile'
  }
})

interface BaseInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requestBaseUrl: 'operation'
}
/* 请求拦截器 */
service.interceptors.request.use(
  (config: BaseInternalAxiosRequestConfig) => {
    if (!config.requestBaseUrl) return config
    switch (config.requestBaseUrl) {
      case 'operation':
        config.baseURL = OPERATION_BASE_URL
        return config
      default:
        return config
    }
  },
  (error: AxiosError) => {
    showFailToast(error.message)
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response
    if (status == 200) {
      return response.data
    }
    return undefined
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        router.push('/login')
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    showFailToast(message)
    return Promise.reject(error)
  }
)

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = any>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  }
}

export default service
