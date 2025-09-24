/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 16:53:32
 * @Description  : 全局页面布局
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
// import { isBoolean } from 'lodash'
// import { isPlainObject } from 'vue-cesium/es/utils/util'

/** 布局参数 */
export type GlobalLayoutOpts = {
  header?: boolean
  leftDrawerMini?: boolean
  content?: boolean
  footer?: boolean
  layerManager?: boolean
  navigation?: boolean
  featureInfo?: boolean
  videoPlayer?: boolean
}

/** 动态渲染页面布局参数 */
export type DynamicRenderLayoutOpts = {
  datasource: {
    // 是否显示工作台
    workBench?: boolean
  }
}

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    global: {
      header: false,
      // 左侧抽屉是否折叠
      leftDrawerMini: true,
      content: false,
      footer: false,
      layerManager: false,
      navigation: false,
      featureInfo: false,
      videoPlayer: false
    },

    /**
     * 动态渲染页面布局参数
     */
    dynamicRender: {
      datasource: {
        workBench: false
      }
    }
  }),

  actions: {
    /**
     * @description 切换全局布局
     * @param {GlobalLayoutOpts} layoutOpts 布局参数
     */
    // toggleGlobalLayout(layoutOpts: GlobalLayoutOpts) {
    //   const optsArray = Object.keys(layoutOpts)
    //   optsArray.forEach(opt => {
    //     isBoolean(layoutOpts[opt]) && (this.global[opt] = layoutOpts[opt])
    //   })
    // },

    /**
     * @description 切换 DynamicRender 页面布局
     * @param {*} layoutOpts
     */
    // toggleDynamicRenderPageLayout(layoutOpts: DynamicRenderLayoutOpts) {
    //   const fn = (opts: DynamicRenderLayoutOpts, layout: DynamicRenderLayoutOpts) => {
    //     const optsArray = Object.keys(opts)
    //     optsArray.forEach(opt => {
    //       if (isPlainObject(opts[opt])) {
    //         fn(opts[opt], layout[opt])
    //       } else {
    //         isBoolean(opts[opt]) && (layout[opt] = opts[opt])
    //       }
    //     })
    //   }

    //   fn(layoutOpts, this.dynamicRender)
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
