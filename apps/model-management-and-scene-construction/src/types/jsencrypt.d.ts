/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-14 13:49:51
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 13:50:19
 * @Description : JSEncrypt 模块类型声明
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
declare module 'jsencrypt/bin/jsencrypt.min.js' {
  class JSEncrypt {
    constructor(options?: { default_key_size?: string });
    setPublicKey(pubKey: string): void
    setPrivateKey(privateKey: string): void
    getPublicKey(): string
    getPrivateKey(): string
    encrypt(plainText: string): string | false
    decrypt(cipherText: string): string | false
  }

  export = JSEncrypt
}
