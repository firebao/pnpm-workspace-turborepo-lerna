/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 17:33:46
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { date } from 'quasar'
import { get } from 'lodash'
import { webStorage } from 'src/utils'

interface LogItemMeta {
  uuid?: string | null;
  token?: string | null;
  url?: string;
  [key: string]: unknown;
}

interface LogItem {
  message: string;
  type: string;
  time: string;
  meta: LogItemMeta;
}

export const useLogStore = defineStore('log', {
  state: () => ({
    log: [] as LogItem[]
  }),
  getters: {
    /**
     * @description 返回现存 log (all) 的条数
     * @param {*} state vuex state
     */
    length(state) {
      return state.log.length
    },
    /**
     * @description 返回现存 log (error) 的条数
     * @param {*} state vuex state
     */
    lengthError(state) {
      return state.log.filter(log => log.type === 'danger').length
    }
  },
  actions: {
    /**
     * @description 添加一个日志
     * @param {Object} context
     * @param {String} param message {String} 信息
     * @param {String} param type {String} 类型
     * @param {Object} payload meta {Object} 附带的信息
     */
    push({ message, type = 'info', meta }: { message: string, type: string, meta: LogItemMeta }) {
      this.log.push({
        message,
        type,
        time: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        meta: {
          // 用户设置
          ...meta,
          // 当前用户信息
          // user: rootState.system.user.info,
          // 当前用户的 uuid
          uuid: webStorage.getLocalStorage('uuid'),
          // 当前的 token
          token: webStorage.getLocalStorage('token'),
          // 当前地址
          url: get(window, 'location.href', ''),
        }
      })
    },
    clean() {
      // store 赋值
      this.log = []
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
}
