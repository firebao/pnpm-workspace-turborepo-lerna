import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('RSA加密模块', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mock('jsencrypt', () => {
      const MockJsEncrypt = class {
        version = '3.5.4'
        publicKey = 'mock_public_key'
        privateKey = ''
        setPublicKey = vi.fn().mockImplementation((key: string) => {
          this.publicKey = key
        })
        
        encrypt = vi.fn().mockImplementation((text: string) => {
          if (!this.publicKey) throw new Error('Public key not set')
          return `encrypted_${text}`
        })
        
        setPrivateKey = vi.fn().mockImplementation((key: string) => {
          this.privateKey = key
        })
        decrypt = vi.fn().mockImplementation((text: string) => {
          if (!this.privateKey) throw new Error('Private key not set')
          return `decrypted_${text}`
        })
        getKey = vi.fn()
      }
      return {
        JSEncrypt: MockJsEncrypt,
        default: MockJsEncrypt,
        __esModule: true
      }
    })
    vi.stubEnv('VITE_APP_RSA_PUBLIC_KEY', 'test_public_key')
    vi.stubEnv('VITE_APP_RSA_PRIVATE_KEY', 'test_public_key')
    vi.resetModules()
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('encrypt', () => {
    it('应该调用encrypt方法并返回加密结果', async () => {
      const testText = 'test_text'
      const { encrypt } = await import('../jsencrypt')
      const result = encrypt(testText)
      expect(result).toBe('encrypted_test_text')
    })
  })

  describe('decrypt', () => {
    it('应该调用decrypt方法并返回解密结果', async () => {
      const testText = 'test_text'
      const { decrypt } = await import('../jsencrypt')
      const result = decrypt(testText)
      expect(result).toBe('decrypted_test_text')
    })
  })
})