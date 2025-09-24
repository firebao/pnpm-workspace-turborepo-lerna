/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors  : wwj 318348750@qq.com
 * @LastEditTime : 2023-08-21 08:55:05
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import setting from 'src/config/setting.js'
import { useDBStore } from './db'
export const useTransitionStore = defineStore('transition', {
  state: () => {
    return {
      // 是否开启页面过度动画
      active: setting.transition.active
    }
  },
  actions: {
    /**
     * @description 设置开启状态
     * @param {Object} context
     * @param {Boolean} active 新的状态
     */
    set(active: boolean) {
      // store 赋值
      this.active = active
      // 持久化
      const dbStore = useDBStore()
      dbStore.set({
        dbName: 'sys',
        path: 'transition.active',
        value: String(this.active),
        user: true
      })
    },
    /**
     * 从数据库读取页面过渡动画设置
     * @param {Object} context
     */
    load() {
      // store 赋值
      const dbStore = useDBStore()
      this.active = dbStore.get({
        dbName: 'sys',
        path: 'transition.active',
        defaultValue: String(setting.transition.active),
        user: true
      }) as boolean
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransitionStore, import.meta.hot))
}
