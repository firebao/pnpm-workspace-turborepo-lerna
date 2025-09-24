/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors  : wwj 318348750@qq.com
 * @LastEditTime : 2023-08-16 15:28:46
 * @Description  : 项目配置
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
export default {
  // 注册的主题
  theme: {
    list: [
      {
        title: '经典',
        name: 'classic',
        preview: 'images/theme/classic/preview@2x.png'
      },
      {
        title: 'Element',
        name: 'element',
        preview: 'images/theme/element/preview@2x.png'
      }
    ]
  },

  // 侧边栏默认配置
  menu: {
    asideCollapse: false,
    asideTransition: true
  },

  // 快捷键，支持快捷键 例如 ctrl + shift + s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },

  // 是否默认开启页面切换动画
  transition: {
    active: true
  }
}
