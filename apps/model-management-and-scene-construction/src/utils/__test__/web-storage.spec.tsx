import {
  setLocalStorage,
  getLocalStorage,
  getAllLocalStorage,
  removeLocalStorage,
  setSessionStorage,
  getSessionStorage,
  getAllSessionStorage,
  removeSessionStorage
} from '../web-storage'
import { LocalStorage, SessionStorage } from 'quasar'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

const mockKey = 'testKey'
const mockValue = 'testValue'
const mockPrefix = 'testPrefix'
const mockVersion = '1.0.0'

describe('web-storage utils', () => {
  beforeEach(() => {
    vi.mock('quasar', () => ({
      LocalStorage: {
        set: vi.fn(),
        getItem: vi.fn(),
        getAll: vi.fn(),
        remove: vi.fn()
      },
      SessionStorage: {
        set: vi.fn(),
        getItem: vi.fn(),
        getAll: vi.fn(),
        remove: vi.fn()
      }
    }))

    vi.stubEnv('VITE_VUE_APP_PREFIX', mockPrefix)
    window.__APP_VERSION__ = mockVersion
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('LocalStorage', () => {
    it('should call set with prefixed key', () => {
      setLocalStorage(mockKey, mockValue)
      expect(LocalStorage.set).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`,
        mockValue
      )
    })

    it('should call get with prefixed key', () => {
      getLocalStorage(mockKey)
      expect(LocalStorage.getItem).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })

    it('should call getAll', () => {
      getAllLocalStorage()
      expect(LocalStorage.getAll).toHaveBeenCalled()
    })

    it('should call remove with prefixed key', () => {
      removeLocalStorage(mockKey)
      expect(LocalStorage.remove).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })
  })

  describe('SessionStorage', () => {
    it('should call set with prefixed key', () => {
      setSessionStorage(mockKey, mockValue)
      expect(SessionStorage.set).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`,
        mockValue
      )
    })

    it('should call get with prefixed key', () => {
      getSessionStorage(mockKey)
      expect(SessionStorage.getItem).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })

    it('should call getAll', () => {
      getAllSessionStorage()
      expect(SessionStorage.getAll).toHaveBeenCalled()
    })

    it('should call remove with prefixed key', () => {
      removeSessionStorage(mockKey)
      expect(SessionStorage.remove).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })
  })
})
