/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-14 13:40:09
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 17:17:41
 * @Description : RSA非对称加密解密
 * @link        : 密钥对生成 http://web.chacuo.net/netrsakeypair
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { JSEncrypt } from 'jsencrypt'


// 前端不建议存放私钥 不建议解密数据 因为都是透明的意义不大
const publicKey = import.meta.env.VITE_APP_RSA_PUBLIC_KEY
const privateKey = import.meta.env.VITE_APP_RSA_PRIVATE_KEY

/**
 * @description RSA 非对称加密
 * @param {string} txt 待加密字符串
 * @return {string} 加密后的字符串
 */
export const encrypt = (txt: string) => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(txt)
}

/**
 * @description RSA 非对称解密
 * @param txt 待解密字符串
 * @returns 解密后的字符串
 */
export const decrypt = (txt: string) => {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
