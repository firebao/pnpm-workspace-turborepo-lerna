/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:52:26
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 15:33:21
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { defineStore } from '#q-app/wrappers'
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

export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia()
  return pinia
})


