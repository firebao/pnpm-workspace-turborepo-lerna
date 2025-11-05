/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-11-05 16:14:22
 * @Description : 系统接口
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { v4 as uuidv4 } from 'uuid'
import { find } from 'lodash'
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
  getCaptcha: () => Promise<Response<{ code: string; img: string; captchaEnabled?: boolean; uuid: string }>>
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
          // return tools.responseSuccess(assign({}, user))
          return tools.responseError({}, '未授权, 请登录!')
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
        method: 'get',
        headers: {
          isToken: false
        }
      })
    } else {
      mock.onAny('/auth/code').reply(() => {
        return tools.responseSuccess({
          captchaEnabled: true,
          code: '1234',
          uuid: '1234',
          img: 'data:image/png;base64,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'
        })
      })

      return requestForMock({
        url: '/auth/code',
        method: 'get',
        headers: {
          isToken: false
        }
      })
    }
  }
})

export default apiModule
