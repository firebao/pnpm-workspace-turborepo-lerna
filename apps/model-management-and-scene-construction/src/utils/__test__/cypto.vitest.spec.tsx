/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-14 10:33:19
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 11:24:50
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CryptoJS from 'crypto-js'
import {
  generateAesKey,
  encryptBase64,
  decryptBase64,
  encryptWithAes,
  decryptWithAes
} from '../crypto'

describe('加密工具', () => {
  const testString = 'test'
  const testWordArray = CryptoJS.lib.WordArray.create([0x12345678])
  const mockKey = CryptoJS.lib.WordArray.create([0x12345678])

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateAesKey', () => {
    it('应该调用CryptoJS.enc.Utf8.parse', () => {
      const mockParse = vi.fn()
      CryptoJS.enc.Utf8.parse = mockParse
      generateAesKey()
      expect(mockParse).toHaveBeenCalled()
    })
  })

  describe('encryptBase64', () => {
    it('应该调用CryptoJS.enc.Base64.stringify', () => {
      const mockStringify = vi.fn()
      CryptoJS.enc.Base64.stringify = mockStringify
      encryptBase64(testWordArray)
      expect(mockStringify).toHaveBeenCalledWith(testWordArray)
    })
  })

  describe('decryptBase64', () => {
    it('应该调用CryptoJS.enc.Base64.parse', () => {
      const mockDecrypted = vi.fn()
      CryptoJS.enc.Base64.parse = mockDecrypted
      decryptBase64(testString)
      expect(mockDecrypted).toHaveBeenCalledWith(testString)
    })
  })

  describe('encryptWithAes', () => {
    it('应该调用CryptoJS.AES.encrypt', () => {
      const mockEncrypt = vi.fn().mockReturnValue({
        toString: vi.fn().mockReturnValue('encrypted_string')
      })
      CryptoJS.AES.encrypt = mockEncrypt
      encryptWithAes(testString, mockKey)
      expect(mockEncrypt).toHaveBeenCalledWith(
        testString,
        mockKey,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      )
    })
  })

  describe('decryptWithAes', () => {
    it('应该调用CryptoJS.AES.decrypt', () => {
      const mockDecrypt = vi.fn().mockReturnValue({
        toString: vi.fn().mockReturnValue('decrypted_string')
      })
      CryptoJS.AES.decrypt = mockDecrypt
      decryptWithAes(testString, mockKey)
      expect(mockDecrypt).toHaveBeenCalledWith(
        testString,
        mockKey,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      )
    })
  })
})
