/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:52:26
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-11-06 17:21:52
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
// import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'
import { systemStore } from './system/index'
import { viewerStore } from './viewer/index'

export const pinia = createPinia()

/**
 * 项目全局 store 组件内使用不需要传 pinia，组件外使用需要传 pinia。
 */
export const store = {
  system: {
    ...systemStore
  },
  viewer: {
    ...viewerStore
  }
}
// 这里导出在SSR方式中使用 pinia 的方式影响单元测试, 暂不清楚原因
// export default defineStore((/* { ssrContext } */) => {
//   const pinia = createPinia()
//   return pinia
// })

export default pinia

