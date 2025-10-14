/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-14 09:36:49
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 09:47:57
 * @Description : 缓存工具类
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage
} from './web-storage'
const sessionCache = {
  set(key: string, value: string) {
    if (key != null && value != null) {
      setSessionStorage(key, value)
    }
  },

  get(key: string) {
    return getSessionStorage(key)
  },

  setJSON(key: string, jsonValue: object) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },

  getJSON(key: string) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
    return null
  },

  remove(key: string) {
    removeSessionStorage(key)
  }
}

const localCache = {
  set(key: string, value: string) {
    if (key != null && value != null) {
      setLocalStorage(key, value)
    }
  },

  get(key: string) {
    return getLocalStorage(key)
  },

  setJSON(key: string, jsonValue: object) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },

  getJSON(key: string) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
    return null
  },

  remove(key: string) {
    removeLocalStorage(key)
  }
}

export default {
  session: sessionCache,
  local: localCache
}
