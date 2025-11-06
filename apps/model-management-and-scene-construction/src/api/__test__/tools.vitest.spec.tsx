/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-15 10:32:40
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-11-06 17:43:09
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { Notify } from 'quasar'
import { parse, response, responseSuccess, responseError, errorLog, errorCreate } from '../tools'
import { store } from 'src/stores/index'
import { installPinia } from '../../../test/vitest/install-pinia'

installPinia({ stubActions: false })
vi.mock('src/stores/index', () => ({
  store: {
    system: {
      useLogStore: vi.fn(() => ({ push: vi.fn() }))
    }
  },
  pinia: {}
}))

// 添加这个模拟，覆盖 quasar 包中的 Notify 对象
vi.mock('quasar', async (importOriginal) => {
  const original = await importOriginal<typeof import('quasar')>();
  return {
    ...original,
    Notify: {
      create: vi.fn() // 提供一个模拟的 create 方法
    }
  };
});


describe('API Tools', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    installQuasarPlugin({ plugins: { Notify } })
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
      expect(() => errorCreate('test error')).toThrow('test error')
    })
  })
})
