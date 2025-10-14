/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-13 18:01:52
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-13 18:15:05
 * @Description : 认证、鉴权工具类
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { getLocalStorage } from './web-storage'

const tokenKey = 'token'

/**
 * @description: 获取 token
 * @return {string | undefined} token
 */
export function getToken(): string | null {
  return getLocalStorage(tokenKey)
}
