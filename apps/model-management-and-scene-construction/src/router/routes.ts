/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:43:49
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 15:50:19
 * @Description : 路由配置
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */

// 在布局内显示
const frameIn = [
  {
    path: '/',
    name: 'layout',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue')
      },
    ],
  },
]

// 在布局之外显示
const frameOut = [
  {
    path: '/login',
    component: () => import('pages/system/LoginPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
]

export default [...frameIn, ...frameOut]
