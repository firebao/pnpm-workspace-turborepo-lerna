import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} from '../web-storage'
import cache from '../cache'

describe('cache工具', () => {
  const testKey = 'testKey'
  const testValue = 'testValue'
  const testObj = { name: 'test' }

  beforeEach(() => {
    vi.mock('../web-storage', () => ({
      setLocalStorage: vi.fn(),
      getLocalStorage: vi.fn(),
      removeLocalStorage: vi.fn(),
      setSessionStorage: vi.fn(),
      getSessionStorage: vi.fn(),
      removeSessionStorage: vi.fn()
    }))
    vi.clearAllMocks()
    window.__APP_VERSION__ = '1.0.0'
  })

  describe('session缓存', () => {
    it('set方法应该调用setSessionStorage', () => {
      cache.session.set(testKey, testValue)
      expect(setSessionStorage).toHaveBeenCalledWith(testKey, testValue)
    })

    it('get方法应该调用getSessionStorage', () => {
      vi.mocked(getSessionStorage).mockReturnValue(testValue)
      const result = cache.session.get(testKey)
      expect(getSessionStorage).toHaveBeenCalledWith(testKey)
      expect(result).toBe(testValue)
    })

    it('setJSON方法应该序列化对象并调用set', () => {
      cache.session.setJSON(testKey, testObj)
      expect(setSessionStorage).toHaveBeenCalledWith(testKey, JSON.stringify(testObj))
    })

    it('getJSON方法应该解析JSON字符串', () => {
      vi.mocked(getSessionStorage).mockReturnValue(JSON.stringify(testObj))
      const result = cache.session.getJSON(testKey)
      expect(result).toEqual(testObj)
    })

    it('remove方法应该调用removeSessionStorage', () => {
      cache.session.remove(testKey)
      expect(removeSessionStorage).toHaveBeenCalledWith(testKey)
    })
  })

  describe('local缓存', () => {
    it('set方法应该调用setLocalStorage', () => {
      cache.local.set(testKey, testValue)
      expect(setLocalStorage).toHaveBeenCalledWith(testKey, testValue)
    })

    it('get方法应该调用getLocalStorage', () => {
      vi.mocked(getLocalStorage).mockReturnValue(testValue)
      const result = cache.local.get(testKey)
      expect(getLocalStorage).toHaveBeenCalledWith(testKey)
      expect(result).toBe(testValue)
    })

    it('setJSON方法应该序列化对象并调用set', () => {
      cache.local.setJSON(testKey, testObj)
      expect(setLocalStorage).toHaveBeenCalledWith(testKey, JSON.stringify(testObj))
    })

    it('getJSON方法应该解析JSON字符串', () => {
      vi.mocked(getLocalStorage).mockReturnValue(JSON.stringify(testObj))
      const result = cache.local.getJSON(testKey)
      expect(result).toEqual(testObj)
    })

    it('remove方法应该调用removeLocalStorage', () => {
      cache.local.remove(testKey)
      expect(removeLocalStorage).toHaveBeenCalledWith(testKey)
    })
  })

  describe('null/undefined处理', () => {
    it('set方法应该忽略null值', () => {
      cache.session.set(testKey, null as unknown as string)
      expect(setSessionStorage).not.toHaveBeenCalled()
    })

    it('getJSON方法应该返回null当值为null', () => {
      vi.mocked(getSessionStorage).mockReturnValue(null)
      const result = cache.session.getJSON(testKey)
      expect(result).toBeNull()
    })
  })
})