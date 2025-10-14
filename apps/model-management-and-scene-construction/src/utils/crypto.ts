/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-14 10:24:16
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 10:30:15
 * @Description : 加解密工具类
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import CryptoJS from 'crypto-js'

/**
 * @description 随机生成32位的字符串
 * @return {string}
 */
const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * 随机生成AES密钥
 * @returns {string}
 */
export const generateAesKey = () => {
  return CryptoJS.enc.Utf8.parse(generateRandomString())
}

/**
 * 加密base64
 * @returns {string}
 */
export const encryptBase64 = (str: CryptoJS.lib.WordArray) => {
  return CryptoJS.enc.Base64.stringify(str)
}

/**
 * 解密base64
 */
export const decryptBase64 = (str: string) => {
  return CryptoJS.enc.Base64.parse(str)
}

/**
 * 使用密钥对数据进行加密
 * @param message
 * @param aesKey
 * @returns {string}
 */
export const encryptWithAes = (message: string, aesKey: CryptoJS.lib.WordArray) => {
  const encrypted = CryptoJS.AES.encrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * 使用密钥对数据进行解密
 * @param message
 * @param aesKey
 * @returns {string}
 */
export const decryptWithAes = (message: string, aesKey: CryptoJS.lib.WordArray) => {
  const decrypted = CryptoJS.AES.decrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
