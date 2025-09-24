/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:52:26
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 10:04:40
 * @Description : 账号
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { Notify, Dialog } from 'quasar'
import * as webStorage from 'src/utils/web-storage'
import router from 'src/router'
import * as api from 'src/api'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUserStore } from './user'
import { useMenuStore } from './menu'
import { useGrayStore } from './gray'
import { useThemeStore } from './theme'
import { useTransitionStore } from './transition'
// import { usePermissionStore } from './permission'

interface UserData {
  username: string
  password: string
}
export const useAccountStore = defineStore('account', {
  state: () => ({}),

  getters: {},

  actions: {
    /**
     * 登录
     * @param {UserData} data
     * @param {UserData} payload username {String} 用户账号
     * @param {UserData} payload password {String} 密码
     */
    async login(data: UserData) {
      const res = await api.system.login(data)
      const userInfo = res.data
      webStorage.setLocalStorage('token', userInfo.token)
      webStorage.setLocalStorage('uuid', userInfo.id)
      const userStore = useUserStore()
      userStore.set({ ...userInfo })

      // 用户登录后从持久化数据加载一系列的设置
      this.load()
    },

    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     * @return {Promise<boolean>}
     */
    logout({ confirm = false } = {}) {
      return new Promise((resolve, reject) => {
        /**
         * @description 注销
         */
        const logout = () => {
          // 删除 storage
          webStorage.removeLocalStorage('token')
          webStorage.removeLocalStorage('uuid')
          // 清空 pinia 用户信息
          // const userStore = useUserStore()
          // userStore.set({}).catch(e => reject(new Error(e)))

          // 清空权限信息
          // const permissionStore = usePermissionStore()
          // permissionStore.clear()

          // 清空菜单信息
          const menuStore = useMenuStore()
          menuStore.clear()
          // 跳转路由
          router.push({ name: 'login' }).catch(e => {
            reject(new Error(e))
          })
          resolve(true)
        }

        // 判断是否需要确认
        if (confirm) {
          const grayStore = useGrayStore()
          grayStore.set(true)
          Dialog.create({
            title: '注销用户',
            message: '确定要注销当前用户吗？',
            cancel: true
          })
            .onOk(() => {
              grayStore.set(false)
              logout()
            })
            .onCancel(() => {
              grayStore.set(false)
              Notify.create({
                message: '取消注销操作'
              })
              resolve(false)
            })
        } else {
          logout()
        }
      })
    },

    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     */
    load() {
      // 加载用户名
      const userStore = useUserStore()
      userStore.load()

      // 加载主题
      const themeStore = useThemeStore()
      themeStore.load()

      // 加载页面过渡效果设置
      const transitionStore = useTransitionStore()
      transitionStore.load()

      // 持久化数据加载侧边栏配置
      const menuStore = useMenuStore()
      menuStore.asideLoad()

      // 持久化数据加载全局尺寸
      // await dispatch('system/size/load', null, { root: true })

      // 持久化数据加载颜色设置
      // await dispatch('system/color/load', null, { root: true })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
