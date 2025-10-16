/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-15 17:12:55
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-16 11:39:13
 * @Description : Log Store 测试
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'

const mockVersion = '1.0.0'
installQuasarPlugin()

// Mock webStorage - 更全面的模拟
vi.mock('src/utils', () => ({
  webStorage: {
    getLocalStorage: vi.fn().mockReturnValue(null),
    setLocalStorage: vi.fn(),
    removeLocalStorage: vi.fn(),
    getAllLocalStorage: vi.fn()
  }
}))

// 正确模拟quasar模块，确保包含所有必要的导出
vi.mock('quasar', async (importOriginal) => {
  const original = await importOriginal();
  return {
    // @ts-expect-error 忽略类型错误，因为 original 可能不是对象
    ...original,
    date: {
      // @ts-expect-error 忽略类型错误，因为 original.date 可能不是对象
      ...original.date,
      formatDate: vi.fn().mockReturnValue('2023-01-01 12:00:00')
    }
  };
});

vi.mock('#q-app/wrappers', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defineStore: async function(...args: any[]) {
    // 如果传入的是工厂函数（只有一个参数且为函数）
    if (args.length === 1 && typeof args[0] === 'function') {
      return args[0];
    }

    // 获取原始的defineStore
    const { defineStore: originalDefineStore } = await import('pinia')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (originalDefineStore as any).apply(this, args)
  }
}));

// Mock lodash的get函数
vi.mock('lodash', () => ({
  get: vi.fn().mockImplementation((obj, path, defaultValue) => {
    // 简单实现get函数行为，主要用于location.href的模拟
    if (obj === window && path === 'location.href') {
      return window.location.href;
    }
    return defaultValue;
  })
}));

describe('Log Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('__APP_VERSION__', mockVersion)
    setActivePinia(createPinia())
    window.__APP_VERSION__ = mockVersion

    // Mock window.location.href
    Object.defineProperty(window, 'location', {
      value: {
        href: ''
      },
      writable: true
    })
  })

  it('pushes log message', async () => {
    const { useLogStore } = await import('../log')
    const logStore = useLogStore()
    expect(logStore.length).toEqual(0)
    logStore.push(
      {
        message: 'test message',
        type: 'info',
        meta: {
          uuid: null,
          token: null,
          url: ''
        }
      }
    )
    expect(logStore.length).toEqual(1)
    expect(logStore.log).toEqual([
      {
        message: 'test message',
        type: 'info',
        time: '2023-01-01 12:00:00',
        meta: {
          uuid: null,
          token: null,
          url: ''
        }
      }
    ])
  })
  it('cleans all log messages', async () => {
    const { useLogStore } = await import('../log')
    const logStore = useLogStore()

    // 添加几条测试日志
    logStore.push(
      {
        message: 'first message',
        type: 'info',
        meta: {
          uuid: null,
          token: null,
          url: ''
        }
      }
    )
    logStore.push(
      {
        message: 'second message',
        type: 'danger',
        meta: {
          uuid: null,
          token: null,
          url: ''
        }
      }
    )

    // 验证日志已添加
    expect(logStore.length).toEqual(2)
    expect(logStore.lengthError).toEqual(1)

    // 调用clean方法
    logStore.clean()

    // 验证日志已清空
    expect(logStore.length).toEqual(0)
    expect(logStore.log).toEqual([])
    expect(logStore.lengthError).toEqual(0)
  })
})
