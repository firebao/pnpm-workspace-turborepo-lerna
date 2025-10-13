/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-09-26 15:36:20
 * @Description : axios封装
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import Adapter from 'axios-mock-adapter'
import { get } from 'lodash'
import { webStorage } from 'src/utils'
import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { errorLog, errorCreate } from './tools'
import router from 'src/router'

/**
 * @description 创建 Axios 请求实例
 * @returns {AxiosInstance}
 */
const createService = (): AxiosInstance => {
  const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
  })

  /**
   * Axios 请求拦截器
   */
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // TODO: 国际化处理
      // config.headers['Content-Language'] = 'zh-CN'

      // 判断请求是否需要添加 token, true：需要 false：不需要
      const isToken = config.headers?.['isToken'] === true

      // 是否需要防止数据重复提交, true：需要 false：不需要
      const isRepeatSubmit = config.headers?.repeatSubmit === true

      // 是否需要加密
      const isEncrypt = config.headers?.isEncrypt === true

      if (getToken() && isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
      }

      // GET请求进行params参数的处理
      if (config.method === 'get' && config.params) {
        let url = config.url + '?' + transformParams(config.params)
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
      }

      // 防止数据重复提交
      if (isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
          url: config.url,
          data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
          time: new Date().getTime()
        }
        const sessionObj = cache.session.getJSON('sessionObj') || {}
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
          cache.session.setJSON('sessionObj', requestObj)
        } else {
          const sUrl = sessionObj.url
          const sData = sessionObj.data
          const sTime = sessionObj.time
          // 防止重复提交的间隔时间，单位ms
          const interval = 500
          if (sData === requestObj.data && requestObj.time < interval) {
            const message = `[${sUrl}]:数据重复提交，请稍后再试`
            errorCreate(message)
            return Promise.reject(new Error(message))
          } else {
            cache.session.setJSON('sessionObj', requestObj)
          }
        }
      }

      return config
    },
    (error: AxiosError) => {
      errorLog(error)
      return Promise.reject(error)
    }
  )
  /**
   * Axios 响应拦截器
   */
  service.interceptors.response.use(
    (response: AxiosResponse) => {
      const dataAxios = response.data
      const { code } = dataAxios

      // 根据 code 进行判断
      if (code === undefined) {
        return dataAxios
      }
      switch (code) {
        case 0:
          return dataAxios
        case 200:
          return dataAxios
        case 500:
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: 500 ] ${dataAxios.msg}: ${response.config.url}`)
          return Promise.reject(new Error(dataAxios.msg))
        default:
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          return Promise.reject(new Error(dataAxios.msg))
      }
    },
    (error: AxiosError) => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          webStorage.removeLocalStorage('token')
          webStorage.removeLocalStorage('uuid')
          router.push('/login').catch(e => { throw new Error(e) })
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response?.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
      errorLog(error)
      return Promise.reject(error)
    }
  )
  return service
}

/**
 * @description 创建 Axios 请求方法
 * @param {Object} service axios 实例
 */
function createRequestFunction(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = webStorage.getLocalStorage('token')
    const configDefault = {
      headers: {
        Authorization: token,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 20000,
      baseURL: config.baseURL || import.meta.env.VITE_VUE_APP_API,
      data: {}
    }
    if (token) {
      configDefault.headers.Authorization = 'Bearer ' + token
    }
    return service(Object.assign(configDefault, config))
  }
}

/**
 * 用于真实网络请求的实例和请求方法
 */
export const service = createService()
export const request = createRequestFunction(service)

/**
 * 用于模拟网络请求的实例和请求方法
 */
export const serviceForMock = createService()
export const requestForMock = createRequestFunction(serviceForMock)

/**
 * 网络请求数据模拟工具
 */
export const mock = new Adapter(serviceForMock)
