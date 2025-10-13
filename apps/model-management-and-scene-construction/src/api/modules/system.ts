/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-09-24 14:51:44
 * @Description : 系统接口
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { v4 as uuidv4 } from 'uuid'
import { find, assign } from 'lodash'
import qs from 'qs'
import * as webStorage from 'src/utils/web-storage'
import router from 'src/router'
import type { ApiModuleParams } from 'src/types/request'
import type { Response } from '../tools'
import type { UserLoginResponse, UserForMock, MenuForMock } from 'src/types/user'

type ApiModuleReturn = {
  login: (data?: object) => Promise<Response<UserLoginResponse>>
  getUserInfo: () => Promise<Response<unknown>>
  getAccessibleMenus: <T>(data?: object) => Promise<Response<T>>
  getCaptcha: () => Promise<Response<{ code: string; img: string }>>
}

const users: Array<UserForMock> = [
  { username: 'admin', password: 'admin', id: 'admin-uuid', name: 'Admin' },
  { username: 'editor', password: 'editor', id: 'editor-uuid', name: 'Editor' }
]

const menus: Array<MenuForMock> = [
  {
    id: uuidv4(),
    component: 'MainLayout',
    icon: 'cog',
    isLock: false,
    hidden: false,
    name: 'layout',
    path: '/',
    sort: 1000,
    title: 'TMS深化应用系统',
    type: 10,
    children: [
      {
        id: uuidv4(),
        component: '/index',
        icon: 'cog',
        isLock: false,
        hidden: false,
        name: 'index',
        path: '/index',
        sort: 1000,
        caption: '通信一张图',
        title: 'message.header.index',
        redirect: '/index/main',
        type: 10,
        children: [
          {
            id: uuidv4(),
            component: '',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'left-panel',
            path: '',
            sort: 100101,
            title: '查看左侧面板',
            type: 20
          },
          {
            id: uuidv4(),
            component: '/index/main',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'main',
            path: '/index/main',
            sort: 100102,
            caption: '首页',
            title: '首页',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/holographic-map',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'holographic-map',
            path: '/index/holographic-map',
            sort: 100102,
            caption: '全息地图',
            title: '全息地图',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/progress',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'progress',
            path: '/index/progress',
            sort: 100102,
            caption: '进度',
            title: '进度',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/safety',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'safety',
            path: '/index/safety',
            sort: 100102,
            caption: '安全',
            title: '安全',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/quality',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'quality',
            path: '/index/quality',
            sort: 100102,
            caption: '质量',
            title: '质量',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/cost',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'cost',
            path: '/index/cost',
            sort: 100102,
            caption: '造价',
            title: '造价',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/technology',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'technology',
            path: '/index/technology',
            sort: 100102,
            caption: '技术',
            title: '技术',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/index/construction',
            icon: 'eye',
            isLock: false,
            hidden: false,
            name: 'construction',
            path: '/index/construction',
            sort: 100102,
            caption: '绿色建造',
            title: '绿色建造',
            type: 10
          }
        ]
      },
      {
        id: uuidv4(),
        component: '/dynamic-render',
        icon: 'cog',
        isLock: false,
        hidden: false,
        name: 'dynamic-render',
        path: '/dynamic-render',
        sort: 1000,
        caption: '动态渲染',
        title: 'message.header.dynamicRender',
        type: 10,
        redirect: '/dynamic-render/recursive-list',
        children: [
          {
            id: uuidv4(),
            component: '/dynamic-render/recursive-list',
            icon: 'list',
            isLock: false,
            hidden: false,
            name: 'recursive-list',
            path: '/dynamic-render/recursive-list',
            sort: 1000,
            caption: 'dynamicRender',
            title: 'message.sideBar.dynamicRender.recursiveList',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/dynamic-render/stack',
            icon: 'view_module',
            isLock: false,
            hidden: false,
            name: 'stack',
            path: '/dynamic-render/stack',
            sort: 1000,
            caption: 'dynamicRender',
            title: 'message.sideBar.dynamicRender.stack',
            type: 10
          },
          {
            id: uuidv4(),
            component: '/dynamic-render/historical-track',
            icon: 'route',
            isLock: false,
            hidden: false,
            name: 'historical-track',
            path: '/dynamic-render/historical-track',
            sort: 1000,
            caption: 'dynamicRender',
            title: 'message.sideBar.dynamicRender.historicalTrack',
            type: 10
          }
        ]
      },
      {
        id: uuidv4(),
        component: '/expansion',
        icon: 'cog',
        isLock: false,
        hidden: false,
        name: 'expansion',
        path: '/expansion',
        sort: 1000,
        caption: '扩展组件',
        title: 'message.header.expansion',
        type: 10,
        redirect: '/expansion/typhoon',
        children: [
          {
            id: uuidv4(),
            component: '/expansion/typhoon',
            icon: 'timeline',
            isLock: false,
            hidden: false,
            name: 'typhoon',
            path: '/expansion/typhoon',
            sort: 1000,
            caption: '台风组件',
            title: 'message.sideBar.expansion.typhoon',
            type: 10
          }
        ]
      },
      {
        id: uuidv4(),
        component: '/other',
        icon: 'cog',
        isLock: false,
        hidden: false,
        name: 'other',
        path: '/other',
        sort: 1000,
        caption: '其他测试',
        title: 'message.header.other',
        type: 10,
        redirect: '/other/tsx',
        children: [
          {
            id: uuidv4(),
            component: '/other/tsx',
            icon: 'bug_report',
            isLock: false,
            hidden: false,
            name: 'tsx',
            path: '/other/tsx',
            sort: 1000,
            caption: 'TSX 渲染',
            title: 'message.sideBar.other.tsx',
            type: 10
          }
        ]
      }
    ]
  }
]

const apiModule: (params: ApiModuleParams) => ApiModuleReturn = ({ request, requestForMock, mock, tools }) => ({
  /**
   * @description: 登录
   * @param {Object} data 登录携带的信息
   * @returns Promise<LoginResponse>
   */
  login(data: object = {}) {
    if (import.meta.env.VITE_MOCK_ENABLED !== 'true') {
      return request({
        headers: {
          Authorization: 'Basic ---',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: '/auth/login',
        method: 'post',
        data: qs.stringify(data)
      })
    } else {
      mock.onAny<{data: {username: string, password: string}}, UserForMock>('/auth/login').reply((config: { data: unknown }) => {
        const data = tools.parse(JSON.stringify(config.data)) as {username: string, password: string}
        const user = find(users, { username: data.username, password: data.password })
        return user
          ? tools.responseSuccess({...user, token: 'f5befe1a-962c-4cdd-bf45-77ce306dbbce' }, '登录成功')
          : tools.responseError({}, '账号或密码不正确')
      })

      return requestForMock<Response<UserLoginResponse>>({
        url: '/auth/login',
        method: 'post',
        data
      })
    }
  },

  /**
   * @description: 获取用户信息
   * @returns Promise<UserInfo>
   */
  getUserInfo() {
    if (import.meta.env.VITE_MOCK_ENABLED !== 'true') {
      return request({
        url: '/user/info',
        method: 'get'
      })
    } else {
      mock.onAny('/user/info').reply(() => {
        const uuid = webStorage.getLocalStorage('uuid')
        const user = find(users, { id: uuid })
        if (user) {
          return tools.responseSuccess(assign({}, user))
        } else {
          webStorage.removeLocalStorage('token')
          webStorage.removeLocalStorage('uuid')
          router.push('/login').catch(e => { throw new Error(e)})
          return tools.responseError({}, '未授权, 请登录!')
        }
      })

      return requestForMock({
        url: '/user/info',
        method: 'post'
      })
    }
  },

  /**
   * @description 获取有权限的菜单
   * @param {Object} data
   * @returns Promise<MenuInfo>
   */
  getAccessibleMenus(data: object = {}) {
    if (import.meta.env.VITE_MOCK_ENABLED !== 'true') {
      return request({
        url: '/api/menu/accessible',
        method: 'post',
        data
      })
    } else {
      mock.onAny('/api/menu/accessible').reply(() => {
        return tools.responseSuccess(menus)
      })

      return requestForMock({
        url: '/api/menu/accessible',
        method: 'post',
        data
      })
    }
  },

  /**
   * @description: 获取验证码
   * @returns Promise<{code: string, img: string}>
   */
  getCaptcha() {
    if (import.meta.env.VITE_MOCK_ENABLED !== 'true') {
      return request({
        url: '/auth/code',
        method: 'get'
      })
    } else {
      mock.onAny('/auth/code').reply(() => {
        return tools.responseSuccess({
          code: '1234',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9Tta...'
        })
      })

      return requestForMock({
        url: '/api/captcha',
        method: 'get'
      })
    }
  }
})

export default apiModule
