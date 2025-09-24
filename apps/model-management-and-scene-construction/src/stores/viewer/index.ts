/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 16:27:46
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import type { Pinia } from 'pinia'
import { useOverlayStore } from './overlay'

// 组件内使用不需要传pinia，组件外使用需要传pinia
export const viewerStore = {
  useOverlayStore: (pinia?: Pinia) => useOverlayStore(pinia),
}
