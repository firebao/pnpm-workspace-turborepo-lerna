/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-15 10:33:36
 * @Description : API 工具模块
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { Notify } from 'quasar'
import { store, pinia } from 'src/stores/index'
import { logger } from 'src/utils'

export interface Response<T> {
  code: number
  msg: string
  data: T
  [key: string]: unknown
}

/**
 * @description 安全地解析JSON字符串
 * @template T
 * @param {String} jsonString 需要解析的 json 字符串
 * @param {Object} defaultValue 默认值
 * @returns {T}
 */
export function parse<T>(jsonString: string, defaultValue: object = {}): T {
  let result = defaultValue as T
  try {
    result = JSON.parse(jsonString) as T
  } catch (error) {
    logger.error(error)
  }
  return result
}

/**
 * @description 接口请求返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @param {Number} code 状态码
 * @return {[number, Response]}
 */
export function response<T>(data: T, msg = '', code = 0): [number, Response<T>] {
  return [200, { code, msg, data }]
}

/**
 * @description 接口请求返回 正确返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @return {[number, Response]}
 */
export function responseSuccess<T>(data: T, msg = '成功'): [number, Response<T>] {
  return response(data, msg)
}

/**
 * @description 接口请求返回 错误返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @param {Number} code 状态码
 * @return {[number, Response]}
 */
export function responseError<T>(data: T, msg = '请求失败', code = 500): [number, Response<T>] {
  return response(data, msg, code)
}

/**
 * @description 记录和显示错误
 * @param {Error} error 错误对象
 * @returns {void}
 */
export function errorLog(error: Error): void {
  // 添加到日志
  store.system.useLogStore(pinia).push({
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })

  // 打印到控制台
  if (import.meta.env.MODE === 'development') {
    logger.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }

  // 显示提示
  Notify.create({
    message: error.message,
    type: 'negative',
    timeout: 3 * 1000
  })
}

/**
 * @description 创建一个错误
 * @param {String} msg 错误信息
 * @throws {Error}
 */
export function errorCreate(msg: string) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}
