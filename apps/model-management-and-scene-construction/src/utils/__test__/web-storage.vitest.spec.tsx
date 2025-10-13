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
    vi.resetModules()
    window.__APP_VERSION__ = mockVersion
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('LocalStorage', () => {
    it('should call set with prefixed key', async () => {
      const { setLocalStorage } = await import('../web-storage')
      setLocalStorage(mockKey, mockValue)
      expect(LocalStorage.set).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`,
        mockValue
      )
    })

    it('should call get with prefixed key', async () => {
      const { getLocalStorage } = await import('../web-storage')
      getLocalStorage(mockKey)
      expect(LocalStorage.getItem).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })

    it('should call getAll', async () => {
      const { getAllLocalStorage } = await import('../web-storage')
      getAllLocalStorage()
      expect(LocalStorage.getAll).toHaveBeenCalled()
    })

    it('should call remove with prefixed key', async () => {
      const { removeLocalStorage } = await import('../web-storage')
      removeLocalStorage(mockKey)
      expect(LocalStorage.remove).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })
  })

  describe('SessionStorage', () => {
    it('should call set with prefixed key', async () => {
      const { setSessionStorage } = await import('../web-storage')
      setSessionStorage(mockKey, mockValue)
      expect(SessionStorage.set).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`,
        mockValue
      )
    })

    it('should call get with prefixed key', async () => {
      const { getSessionStorage } = await import('../web-storage')
      getSessionStorage(mockKey)
      expect(SessionStorage.getItem).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })

    it('should call getAll', async () => {
      const { getAllSessionStorage } = await import('../web-storage')
      getAllSessionStorage()
      expect(SessionStorage.getAll).toHaveBeenCalled()
    })

    it('should call remove with prefixed key', async () => {
      const { removeSessionStorage } = await import('../web-storage')
      removeSessionStorage(mockKey)
      expect(SessionStorage.remove).toHaveBeenCalledWith(
        `${mockPrefix}-${mockVersion}-${mockKey}`
      )
    })
  })
})
