/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:53:01
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-23 11:30:02
 * @Description : 主题类型声明
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */

// 定义全局主题配置类型
interface GlobalThemeConfig {
  themeBGColor: string
  themeBGMaskColor: string
  themeColor: string
  themeColorAlpha: string
  themeColorActive: string
  themeScrollTopBackgroundColor: string
  themeQInputColor: string
  themeQInputBorderColor: string
  themeQCheckboxTruthyColor: string
  themeQMenuColor: string
  themeQMenuBackgroundColor: string
  themeQCardColor: string
  themeQCardHeaderBackgroundColor: string
  themeQCardBackgroundColor: string
  themeQScrollAreaColor: string
}

// 定义 commonPanel 主题配置类型
interface CommonPanelThemeConfig {
  themeCommonPanelHeaderColor: string
  themeCommonPanelHeaderBackgroundColor: string
  themeCommonPanelContentColor: string
  themeCommonPanelContentBackgroundColor: string
  themeCommonPanelListColor: string
  themeCommonPanelListBorderColor: string
}

// 定义 navigation 主题配置类型
interface NavigationThemeConfig {
  themeVcCompassOuterIcon: string
  themeVcCompassOuterColor: string
  themeVcCompassInnerIcon: string
  themeVcCompassInnerColor: string
  themeVcCompassInnerBackgroundColor: string
  themeVcZoomControlBackgroundColor: string
  themeVcPrintBackgroundColor: string
  themeVcStatusBarBackgroundColor: string
  themeVcDistanceLegendBackgroundColor: string
}

// 定义 pageLogin 主题配置类型
interface PageLoginThemeConfig {
  themePageLoginColor: string
  themePageLoginBackground: string
}

// 定义 menu 主题配置类型
interface MenuThemeConfig {
  themeMenuColor: string
  themeMenuActiveColor: string
  themeMenuActiveBackgroundColor: string
}

// 定义 header 主题配置类型
interface HeaderThemeConfig {
  themeHeaderColor: string
  themeHeaderTitleColor: string
  themeHeaderLogoBackgroundColor: string
  themeHeaderBackgroundColor: string
  themeHeaderContentBackgroundColor: string
}

// 定义完整的主题配置类型
interface ThemeConfig {
  themeName: string
  global: GlobalThemeConfig
  commonPanel: CommonPanelThemeConfig
  navigation: NavigationThemeConfig
  pageLogin: PageLoginThemeConfig
  menu: MenuThemeConfig
  header: HeaderThemeConfig
}

export type { ThemeConfig, GlobalThemeConfig }
