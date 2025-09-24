/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:52:26
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 15:21:42
 * @Description : 
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import screenfull from 'screenfull'

export const useFullscreenStore = defineStore('fullscreen', {
  state: () => ({
    // 全屏激活
    active: false
  }),
  getters: {
  },
  actions: {
    /**
     * @description 初始化监听
     */
    listen() {
      if (screenfull.isEnabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            this.active = false
          }
        })
      }
    },
    /**
     * @description 切换全屏
     */
    toggle() {
      if (screenfull.isFullscreen) {
        screenfull.exit().catch(e => {throw new Error(e)})
        this.active = false
      } else {
        screenfull.request().catch(e => {throw new Error(e)})
        this.active = true
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFullscreenStore, import.meta.hot))
}
