/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:35:45
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-16 11:47:02
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { LowSync } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'
import * as webStorage from './web-storage'
import { cloneDeep, chain } from 'lodash'

class LowWithLodash<T> extends LowSync<T> {
  private _chain = chain(this.data as Record<string, unknown>)

  get(path: string) {
    return this._chain.get(path).value()
  }

  // 添加 set 方法保持链式调用
  set(path: string, value: unknown) {
    this.data = this._chain.set(path, value).value() as unknown as T
    this.write()
    return this
  }
}

// 定义统一的数据库结构类型
interface DatabaseSchema {
  sys: Record<string, unknown>
  database: Record<string, unknown>
}
const webStoragePrefix = import.meta.env.VITE_VUE_APP_PREFIX
const adapter = new LocalStorage<DatabaseSchema>(`${webStoragePrefix || 'VueCesiumDemo'}-${__APP_VERSION__}`)
const db = new LowWithLodash(adapter, {
  sys: {},
  database: {}
} as DatabaseSchema)
db.write()
export default db


/**
 * @description 检查路径是否存在 不存在的话初始化
 * @param {String} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 路径
 * @param {Object} payload user {Boolean} 区分用户
 * @param {Object} payload validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param {Object} payload defaultValue {*} 初始化默认值
 * @returns {String} 可以直接使用的路径
 */
export function pathInit({
  dbName = 'database',
  path = '',
  user = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validator = (_value) => true,
  defaultValue = ''
}: {
  dbName?: string
  path?: string
  user?: boolean
  validator?: (value: unknown) => boolean
  defaultValue?: string
}) {
  const uuid = webStorage.getLocalStorage('uuid') || 'ghost-uuid'
  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  const value = db.get(currentPath)
  if (!(value !== undefined && validator(value))) {
    db.set(currentPath, defaultValue).write()
  }
  return currentPath
}

/**
 * @description 将数据存储到指定位置 | 路径不存在会自动初始化
 * @description 效果类似于取值 dbName.path = value
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload value {*} 需要存储的值
 * @param {Object} payload user {Boolean} 是否区分用户
 * @returns {void}
 */
export function dbSet({ dbName = 'database', path = '', value = '', user = false }) {
  db.set(
    pathInit({
      dbName,
      path,
      user
    }),
    value
  ).write()
}

/**
 * @description 获取数据
 * @description 效果类似于取值 dbName.path || defaultValue
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload defaultValue {*} 取值失败的默认值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbGet({ dbName = 'database', path = '', defaultValue = '', user = false }) {
  return cloneDeep(
    db
      .get(
        pathInit({
          dbName,
          path,
          user,
          defaultValue
        })
      )
  )
}

/**
 * @description 获取存储数据库对象
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function database({
  dbName = 'database',
  path = '',
  user = false,
  validator = () => true,
  defaultValue = ''
} = {}) {
  return db.get(
    pathInit({
      dbName,
      path,
      user,
      validator,
      defaultValue
    })
  )
}
