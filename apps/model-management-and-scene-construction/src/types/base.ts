/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-16 18:46:34
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-13 16:29:33
 * @Description  : 基本类型定义
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
declare global {
  interface Window {
    __APP_VERSION__: string
  }
}

export type Nullable<T> = T | null
export type NoDef<T> = T | undefined
export type NullOrNoDef<T> = T | null | undefined
export type CostPie3DData = {
  name: string
  value: number
  itemStyle: {
    color: string
    opacity?: number
    isSelected?: boolean
    isHover?: boolean
  }
  startRatio?: number
  endRatio?: number
}
export type CostPie3DDataSet = Array<CostPie3DData>
