/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-14 18:25:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 12:56:45
 * @Description  :
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
export interface UserInfo {
  username: string
  permissions: string[]
  roles: number[]
}

// 用户登录接口返回数据类型
export type UserLoginResponse = {
  id: string
  token: string
  name: string
  uuid: string
  username: string
  permissions: Array<string>
  roles: Array<number>
}

export type UserForMock = {
  username?: string
  password?: string
  id?: string
  name?: string
  token?: string
}

export type MenuForMock = {
  id: string
  component: string
  icon: string
  isLock: boolean
  hidden: boolean
  name: string
  path?: string
  permission?: string
  sort: number
  title: string
  caption?: string
  type: number
  redirect?: string
  children?: Array<MenuForMock>
}
