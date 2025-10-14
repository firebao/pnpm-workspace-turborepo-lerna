/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:35:45
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-13 17:07:55
 * @Description : 本地存储工具类
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { LocalStorage, SessionStorage  } from 'quasar'
const webStoragePrefix = import.meta.env.VITE_VUE_APP_PREFIX

/**
 * @description: 设置获取本地存储值(LocalStorage)
 * @param {string} key 键
 * @param {string} value 值
 * @return {void}
 */
export function setLocalStorage(key = 'default', value = ''): void {
  LocalStorage.set(`${webStoragePrefix}-${__APP_VERSION__}-${key}`, value)
}

/**
 * @description: 设置获取本地存储值(SessionStorage)
 * @param {string} key 键
 * @param {string} value 值
 * @return {void}
 */
export function setSessionStorage(key = 'default', value = ''): void {
  SessionStorage.set(`${webStoragePrefix}-${__APP_VERSION__}-${key}`, value)
}

/**
 * @description: 根据键获取本地存储值(LocalStorage)
 * @param {string} key 键
 * @return {string}
 */
export function getLocalStorage(key = 'default'): string | null {
  return LocalStorage.getItem(`${webStoragePrefix}-${__APP_VERSION__}-${key}`) ?? ''
}

/**
 * @description: 根据键获取本地存储值(SessionStorage)
 * @param {string} key 键
 * @return {string}
 */
export function getSessionStorage(key = 'default'): string {
  return SessionStorage.getItem(`${webStoragePrefix}-${__APP_VERSION__}-${key}`) ?? ''
}

/**
 * @description: 获取所有本地存储的内容(LocalStorage)
 * @return {any}
 */
export function getAllLocalStorage(): Record<string, unknown> {
  return LocalStorage.getAll()
}

/**
 * @description: 获取所有本地存储的内容(SessionStorage)
 * @return {any}
 */
export function getAllSessionStorage(): Record<string, unknown> {
  return SessionStorage.getAll()
}

/**
 * @description: 删除键对应的本地存储值(LocalStorage)
 * @param {string} key 键
 * @return {void}
 */
export function removeLocalStorage(key = 'default'): void {
  LocalStorage.remove(`${webStoragePrefix}-${__APP_VERSION__}-${key}`)
}

/**
 * @description: 删除键对应的本地存储值(SessionStorage)
 * @param {string} key 键
 * @return {void}
 */
export function removeSessionStorage(key = 'default'): void {
  SessionStorage.remove(`${webStoragePrefix}-${__APP_VERSION__}-${key}`)
}
