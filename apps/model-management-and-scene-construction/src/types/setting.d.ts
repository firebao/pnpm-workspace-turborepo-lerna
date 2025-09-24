/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 10:17:12
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-23 10:18:56
 * @Description : 设置类型声明
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */

// 主题配置项类型
interface ThemeItem {
  title: string
  name: string
  preview: string
}

// 主题列表配置类型
interface ThemeConfig {
  list: ThemeItem[]
}

// 侧边栏菜单配置类型
interface MenuConfig {
  asideCollapse: boolean
  asideTransition: boolean
}

// 快捷键配置类型
interface HotkeyConfig {
  search: {
    open: string
    close: string
  }
}

// 页面切换动画配置类型
interface TransitionConfig {
  active: boolean
}

// 完整的设置配置类型
interface SettingConfig {
  // 注册的主题
  theme: ThemeConfig
  // 侧边栏默认配置
  menu: MenuConfig
  // 快捷键，支持快捷键 例如 ctrl + shift + s
  hotkey: HotkeyConfig
  // 是否默认开启页面切换动画
  transition: TransitionConfig
}

export type { SettingConfig, ThemeItem }