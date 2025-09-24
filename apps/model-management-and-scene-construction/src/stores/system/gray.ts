/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors  : wwj 318348750@qq.com
 * @LastEditTime : 2023-08-21 08:54:09
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useGrayStore = defineStore('gray', {
  // a function that returns a fresh state
  state: () => ({
    // 灰度
    active: false
  }),
  // optional getters
  getters: {},
  // optional actions
  actions: {
    /**
     * @description 切换灰度状态
     */
    toggle() {
      this.active = !this.active
    },
    /**
     * @description 设置灰度模式
     * @param {Boolean} active active
     */
    set(active: boolean) {
      this.active = active
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGrayStore, import.meta.hot))
}
