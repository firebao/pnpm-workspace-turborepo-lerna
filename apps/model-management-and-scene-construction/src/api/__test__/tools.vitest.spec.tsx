/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-15 10:32:40
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-11-05 11:42:30
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { parse, response, responseSuccess, responseError, errorLog, errorCreate } from '../tools'
import { Notify } from 'quasar'
import { store } from 'src/stores/index'

const mockVersion = '1.0.0'

// Mock外部依赖
vi.mock('quasar')
vi.mock('src/stores/index')

describe('API Tools', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    window.__APP_VERSION__ = mockVersion
  })

  describe('parse函数', () => {
    it('应正确解析JSON字符串', () => {
      const jsonString = '{"name":"test","value":123}'
      const result = parse<{name: string, value: number}>(jsonString)
      expect(result).toEqual({name: 'test', value: 123})
    })

    it('解析失败时应返回默认值', () => {
      const invalidJson = 'invalid-json'
      const defaultValue = { default: 'value' }
      const result = parse(invalidJson, defaultValue)
      expect(result).toEqual(defaultValue)
    })
  })

  describe('response函数', () => {
    it('应返回正确的响应结构', () => {
      const data = { id: 1 }
      const [status, res] = response(data, 'success', 200)
      expect(status).toBe(200)
      expect(res.code).toBe(200)
      expect(res.msg).toBe('success')
      expect(res.data).toEqual(data)
    })
  })

  describe('responseSuccess函数', () => {
    it('应返回成功响应', () => {
      const data = { id: 1 }
      const [status, res] = responseSuccess(data)
      expect(status).toBe(200)
      expect(res.code).toBe(0)
      expect(res.msg).toBe('成功')
      expect(res.data).toEqual(data)
    })
  })

  describe('responseError函数', () => {
    it('应返回错误响应', () => {
      const data = { error: 'message' }
      const [status, res] = responseError(data, 'failed', 500)
      expect(status).toBe(200)
      expect(res.code).toBe(500)
      expect(res.msg).toBe('failed')
      expect(res.data).toEqual(data)
    })
  })

  describe('errorLog函数', () => {
    it('应记录错误到日志', () => {
      const mockError = new Error('test error')
      const mockPush = vi.fn()
      // @ts-expect-error 类型问题
      vi.mocked(store.system.useLogStore).mockReturnValue({ push: mockPush })
      errorLog(mockError)
      expect(mockPush).toHaveBeenCalledWith({
        message: '数据请求异常',
        type: 'danger',
        meta: { error: mockError }
      })
      expect(Notify.create).toHaveBeenCalledWith({
        message: 'test error',
        type: 'negative',
        timeout: 3000
      })
    })
  })

  describe('errorCreate函数', () => {
    it('应创建并抛出错误', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(() => errorCreate('test error')).toThrow('test error')
      expect(errorSpy).toHaveBeenCalled()
      errorSpy.mockRestore()
    })
  })
})
