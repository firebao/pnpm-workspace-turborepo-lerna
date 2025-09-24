/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors  : wwj 318348750@qq.com
 * @LastEditTime : 2023-08-21 08:56:00
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import { defineStore, acceptHMRUpdate } from 'pinia'
export const useOverlayStore = defineStore('overlay', {
  // a function that returns a fresh state
  state: () => ({
    mouseOverNameOpts: {
      position: [117.186419, 45.66446, 20],
      show: false,
      text: '',
      pixelOffset: [0, 0]
    }
  }),
  // optional getters
  getters: {},
  // optional actions
  actions: {
    setMouseOverlayLabel({ position, show, text, pixelOffset }: {position: number[], show: boolean, text: string, pixelOffset: number[]}) {
      this.mouseOverNameOpts.position = position
      this.mouseOverNameOpts.show = show
      this.mouseOverNameOpts.text = text
      this.mouseOverNameOpts.pixelOffset = pixelOffset
    },
    clearMouseOverlayLabel() {
      this.mouseOverNameOpts.position = []
      this.mouseOverNameOpts.show = false
      this.mouseOverNameOpts.text = ''
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOverlayStore, import.meta.hot))
}
