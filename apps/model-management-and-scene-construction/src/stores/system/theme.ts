/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:52:26
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-23 11:44:06
 * @Description : 
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import type { ThemeConfig } from 'src/types/theme'
import type { ThemeItem } from 'src/types/setting'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { themeClassic as classic, themeElement as element } from 'src/config/theme'
import { useDBStore } from './db'
import { get } from 'lodash'
import setting from 'src/config/setting'

interface ThemeState {
  list: ReturnType<typeof get>
  activeName: string
  themeConfig: {
    classic: ThemeConfig
    element: ThemeConfig
  }
}

let oldThemeName = ''
export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      list: get(setting, 'theme.list', []),
      activeName: get(setting, 'theme.list[0].name', 'h2o'),
      themeConfig: {
        classic,
        element
      }
    }
  },

  getters: {
    /**
     * @description 返回当前的主题信息,不是一个名字,而是当前激活主题的所有数据
     * @param {ThemeState} state state
     * @returns {ThemeOptions}
     */
    activeSetting(state: ThemeState): ThemeItem {
      return state.list.find((theme: ThemeItem) => theme.name === state.activeName)
    }
  },

  actions: {
    /**
     * @description 将 vuex 中的主题应用到 dom
     * @returns void
     */
    dom() {
      const oldThemeClass = `theme-${oldThemeName}`
      const themeClass = `theme-${this.activeName}`
      if (document.body.className.includes(oldThemeClass)) {
        document.body.className = document.body.className.replace(oldThemeClass, themeClass)
      } else {
        document.body.className += ' ' + themeClass
      }

      let theme: ThemeConfig
      if (this.activeName in this.themeConfig) {
        theme = this.themeConfig[this.activeName as keyof typeof this.themeConfig]
      } else {
        theme = this.themeConfig.classic
      }

      const keys = Object.keys(theme.global)
      keys.forEach((key: string) => {
        document.body.style.setProperty(`--${key}`, theme.global[key as keyof typeof theme.global])
      })
    },

    /**
     * @description 激活一个主题
     * @param {String} themeValue 需要激活的主题名称
     * @returns void
     */
    set(themeName: string) {
      oldThemeName = this.activeName
      this.activeName = this.list.find((e: ThemeItem) => e.name === themeName)
        ? themeName
        : this.list[0].name
      this.dom()

      // 持久化
      const dbStore = useDBStore()
      dbStore.set({
        dbName: 'sys',
        path: 'theme.activeName',
        value: this.activeName,
        user: true
      })
    },

    /**
     * @description 从持久化数据加载主题设置
     * @returns void
     */
    load() {
      oldThemeName = this.activeName
      const dbStore = useDBStore()
      const activeName = dbStore.get({
        dbName: 'sys',
        path: 'theme.activeName',
        defaultValue: this.list[0].name,
        user: true
      })

      if (this.list.find((e: ThemeItem) => e.name === activeName)) {
        this.activeName = activeName as string
      } else {
        this.activeName = this.list[0].name
        dbStore.set({
          dbName: 'sys',
          path: 'theme.activeName',
          value: this.activeName,
          user: true
        })
      }
      this.dom()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
