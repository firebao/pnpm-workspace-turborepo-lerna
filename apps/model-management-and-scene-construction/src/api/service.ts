/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-15 10:38:57
 * @Description : axios封装
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Adapter from 'axios-mock-adapter'
import axios from 'axios'
import cache from 'src/utils/cache'
import router from 'src/router'
import { get } from 'lodash'
import { webStorage } from 'src/utils'
import { errorLog, errorCreate } from './tools'
import { getToken } from 'src/utils/auth'
import { transformParams } from 'src/utils/util'
import { generateAesKey, encryptBase64, encryptWithAes, decryptBase64, decryptWithAes } from 'src/utils/crypto'
import { encrypt, decrypt } from 'src/utils/jsencrypt'
import { HttpStatus } from 'src/enums/RespEnum'
import { Dialog } from 'quasar'
import { store, pinia } from 'src/stores'


const encryptHeader = 'encrypt-key'
const isReLogin = {
  show: false
}
const errorCode: {
  '401': string
  '403': string
  '404': string
  'default': string
  [key: string]: string
} = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员'
}

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

      // 判断请求是否需要添加 token, true：需要, false：不需要
      const isToken = config.headers?.['isToken'] === true

      // 是否需要防止数据重复提交, true：需要, false：不需要
      const isRepeatSubmit = config.headers?.repeatSubmit === true

      // 是否需要加密
      const isEncrypt = config.headers?.isEncrypt === true

      if (getToken() && isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
      }

      // GET请求进行params参数的处理
      if (config.method === 'get' && config.params) {
        const url = config.url + '?' + transformParams(config.params)
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
          if (sData === requestObj.data && requestObj.time - sTime < interval && sUrl === requestObj.url) {
            const message = `[${sUrl}]:数据重复提交，请稍后再试`
            errorCreate(message)
            return Promise.reject(new Error(message))
          } else {
            cache.session.setJSON('sessionObj', requestObj)
          }
        }
      }

      if (import.meta.env.VITE_APP_ENCRYPT) {
        // 当开启参数加密
        if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
          // 生成一个 AES 密钥
          const aesKey = generateAesKey()
          config.headers[encryptHeader] = encrypt(encryptBase64(aesKey))
          config.data = typeof config.data === 'object'
            ? encryptWithAes(JSON.stringify(config.data), aesKey)
            : encryptWithAes(config.data, aesKey)
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
      // 数据解密
      if (import.meta.env.VITE_APP_ENCRYPT) {
        const keyStr = response.headers[encryptHeader]
        if (keyStr != null && keyStr != '') {
          const data = response.data
          const base64Str = decrypt(keyStr)
          const aesKey = decryptBase64(base64Str.toString())
          const decryptData = decryptWithAes(data, aesKey)
          response.data = JSON.parse(decryptData)
        }
      }
      const code = response.data.code || HttpStatus.SUCCESS
      const msg = errorCode[code] || response.data.msg || errorCode['default']

      // 二进制数据则直接返回
      if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
        return response.data
      }
      const dataAxios = response.data

      // 根据 code 进行判断
      if (code === undefined) {
        return dataAxios
      }
      switch (code) {
        case 0:
          return dataAxios
        case 200:
          return dataAxios
        case 401:
          if (!isReLogin.show) {
            isReLogin.show = true
            Dialog.create({
              title: 'Confirm',
              message: '登录状态已过期，您可以继续留在该页面，或者重新登录',
              ok: {
                label: '重新登录',
                push: true,
                color: 'primary'
              },
              cancel: {
                label: '取消',
                push: true,
                color: 'white'
              },
              persistent: true
            }).onOk(() => {
              isReLogin.show = false
              store.system
                .useAccountStore(pinia)
                .logout()
                .then(() => {
                  router.replace({
                    path: '/login',
                    query: {
                      redirect: encodeURIComponent(router.currentRoute.value.fullPath || '/')
                    }
                  }).catch(err => errorLog(err.msg))
                }).catch(err => {
                  errorLog(err.msg)
                })
            }).onDismiss(() => {
              isReLogin.show = false
            })
          }
          errorCreate(`[ code: 401 ] ${msg}: ${response.config.url}`)
          return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
        case 500:
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: 500 ] ${msg}: ${response.config.url}`)
          return Promise.reject(new Error(msg))
        default:
          errorCreate(`${msg}: ${response.config.url}`)
          return Promise.reject(new Error(msg))
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
          store.system
            .useAccountStore(pinia)
            .logout()
            .then(() => {
              router.replace({
                path: '/login',
                query: {
                  redirect: encodeURIComponent(router.currentRoute.value.fullPath || '/')
                }
              }).catch(err => errorLog(err.msg))
            }).catch(err => {
              errorLog(err.msg)
            })
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
