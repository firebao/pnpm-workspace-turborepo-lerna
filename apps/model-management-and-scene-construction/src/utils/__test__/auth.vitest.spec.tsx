/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-13 18:08:52
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-13 18:16:40
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getToken } from '../auth'
import { getLocalStorage } from '../web-storage'

// Mock localStorage模块
vi.mock('../web-storage', () => ({
  getLocalStorage: vi.fn()
}))

describe('getToken', () => {
  const tokenKey = 'token'
  const mockToken = 'mock-token-123'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该从localStorage获取token', () => {
    // 模拟getLocalStorage返回mock token
    vi.mocked(getLocalStorage).mockReturnValue(mockToken)
    const result = getToken()
    expect(getLocalStorage).toHaveBeenCalledWith(tokenKey)
    expect(result).toBe(mockToken)
  })

  it('当token不存在时应返回undefined', () => {
    // 模拟getLocalStorage返回undefined
    vi.mocked(getLocalStorage).mockReturnValue(null)
    const result = getToken()
    expect(getLocalStorage).toHaveBeenCalledWith(tokenKey)
    expect(result).toBeNull()
  })
})
