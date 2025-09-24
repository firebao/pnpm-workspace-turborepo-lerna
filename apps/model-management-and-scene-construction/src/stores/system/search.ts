/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 12:52:56
 * @Description  : 搜索面板相关状态
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import setting from 'src/config/setting.js'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      // 搜索面板激活状态
      active: false,

      // 快捷键
      hotkey: {
        open: setting.hotkey.search.open,
        close: setting.hotkey.search.close
      },

      // 所有可以搜索的页面
      pool: []
    }
  },

  actions: {
    /**
     * @description 切换激活状态
     */
    toggle() {
      this.active = !this.active
    },

    /**
     * @description 设置激活模式
     * @param {Boolean} active true：激活 false：不激活
     */
    set(active: boolean) {
      this.active = active
    },

    /**
     * @description 菜单初始化
     * @param {Array} menu 菜单列表
     */
    // init(menu) {
    //   const pool: any[] = []
    //   const push = function (menu, titlePrefix = []) {
    //     menu.forEach(m => {
    //       if (m.children) {
    //         push(m.children, [...titlePrefix, m.title])
    //       } else {
    //         pool.push({
    //           ...m,
    //           fullTitle: [...titlePrefix, m.title].join(' / ')
    //         })
    //       }
    //     })
    //   }
    //   push(menu)
    //   // this.pool = pool
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
