/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 16:50:51
 * @Description  : Store.system
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import type { Pinia } from 'pinia'
import { useAccountStore } from './account'
import { useDBStore } from './db'
import { useFullscreenStore } from './fullscreen'
import { useGrayStore } from './gray'
import { useLayoutStore } from './layout'
import { useLogStore } from './log'
import { useMenuStore } from './menu'
// import { usePermissionStore } from './permission'
import { useSearchStore } from './search'
import { useThemeStore } from './theme'
import { useTransitionStore } from './transition'
import { useUserStore } from './user'
// import { useThreeStore } from './three'

export const systemStore = {
  useAccountStore: (pinia?: Pinia) => useAccountStore(pinia),
  useDBStore: (pinia?: Pinia) => useDBStore(pinia),
  useFullscreenStore: (pinia?: Pinia) => useFullscreenStore(pinia),
  useGrayStore: (pinia?: Pinia) => useGrayStore(pinia),
  useLayoutStore: (pinia?: Pinia) => useLayoutStore(pinia),
  useLogStore: (pinia?: Pinia) => useLogStore(pinia),
  useMenuStore: (pinia?: Pinia) => useMenuStore(pinia),
  // usePermissionStore: (pinia?: Pinia) => usePermissionStore(pinia),
  useSearchStore: (pinia?: Pinia) => useSearchStore(pinia),
  useThemeStore: (pinia?: Pinia) => useThemeStore(pinia),
  useTransitionStore: (pinia?: Pinia) => useTransitionStore(pinia),
  useUserStore: (pinia?: Pinia) => useUserStore(pinia),
  // useThreeStore: (pinia?: Pinia) => useThreeStore(pinia)
}
