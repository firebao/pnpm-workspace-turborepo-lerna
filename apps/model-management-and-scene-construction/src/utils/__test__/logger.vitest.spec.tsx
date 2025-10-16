/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-15 11:07:38
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-16 15:00:35
 * @Description : logger工具库测试
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { capsule, plain, debug } from '../logger'
import { Notify } from 'quasar'

const mockPrefix = 'testPrefix'
installQuasarPlugin({ plugins: { Notify } })

// 正确模拟quasar模块，确保包含所有必要的导出
vi.mock('quasar', async (importOriginal) => {
  const original = await importOriginal()
  return {
    // @ts-expect-error 忽略类型错误，因为 original 可能不是对象
    ...original,
    Notify: {
      create: vi.fn()
    }
  }
})


// Mock store
vi.mock('src/stores/index', () => {
  const mockPush = vi.fn()
  const mockLogStore = {
    push: mockPush
  }
  const mockUseLogStore = vi.fn(() => mockLogStore)
  return {
    store: {
      system: {
        useLogStore: mockUseLogStore
      }
    },
    pinia: {}
  }
})

describe('logger工具库', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('console', {
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    })
    vi.stubEnv('VITE_VUE_APP_PREFIX', mockPrefix)
    vi.resetModules()
  })

  describe('样式函数', () => {
    it('capsule函数应正确格式化输出', () => {
      capsule('标题', '内容', 'primary')
      expect(console.log).toHaveBeenCalled()
    })

    it('plain函数应输出默认样式', () => {
      plain('测试文本')
      expect(console.log).toHaveBeenCalled()
    })

    // 测试其他样式函数...
  })

  describe('日志函数', () => {
    it('log函数应触发通知', async () => {
      const { log } = await import('../logger.js')
      log('测试日志')
      expect(Notify.create).toHaveBeenCalledWith({
        message: `[${mockPrefix}] LOG 测试日志`,
        timeout: 3000,
        type: 'positive'
      })
    })

    it('warn函数应记录警告日志', async () => {
      const { warn } = await import('../logger.js')
      const { store, pinia } = await import('src/stores/index')
      const mockPush = vi.fn()
      store.system.useLogStore(pinia).push = mockPush
      warn('测试警告')
      expect(console.warn).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalled()
    })

    it('error函数应记录错误日志', async () => {
      const { error } = await import('../logger.js')
      const { store, pinia } = await import('src/stores/index')
      const mockPush = vi.fn()
      store.system.useLogStore(pinia).push = mockPush
      error('测试错误')
      expect(console.error).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalled()
    })

    it('debug函数在开发环境应输出日志', () => {
      import.meta.env.MODE = 'development'
      debug('测试调试')
      expect(console.log).toHaveBeenCalled()
    })

    it('debug函数在生产环境应静默', () => {
      import.meta.env.MODE = 'production'
      debug('测试调试')
      expect(console.log).not.toHaveBeenCalled()
    })
  })
})
