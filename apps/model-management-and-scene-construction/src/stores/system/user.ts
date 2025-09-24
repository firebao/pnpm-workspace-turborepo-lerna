/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 16:29:38
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import type { UserInfo } from 'src/types/user'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useDBStore } from './db'

export const useUserStore = defineStore('user', {
  state: () => ({
    info: {} as UserInfo
  }),
  getters: {},
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    set(info: UserInfo) {
      // store 赋值
      this.info = info
      const dbStore = useDBStore()
      // 持久化
      dbStore.set({
        dbName: 'sys',
        path: 'user.info',
        value: JSON.stringify(info),
        user: true
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    load() {
      // store 赋值
      const dbStore = useDBStore()
      const info = dbStore.get({
        dbName: 'sys',
        path: 'user.info',
        defaultValue: '',
        user: true
      })
      this.set(info as UserInfo)
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
