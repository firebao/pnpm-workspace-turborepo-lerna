/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-09 16:21:40
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-23 14:09:25
 * @Description : 
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const createHistory = import.meta.env.SERVER
  ? createMemoryHistory
  : import.meta.env.VITE_VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(import.meta.env.VITE_VUE_ROUTER_BASE)
})

// 路由访问白名单
// const whiteList = ['/login', '/404']

/** 全局前置守卫 */
Router.beforeEach((to, from, next) => {
  NProgress.start()

  // 关闭搜索面板
  // store.system.useSearchStore(pinia).set(false)
  next()
})

/** 全局后置守卫 */
Router.afterEach(() => {
  NProgress.done()
  // util.title(i18n.global.t(to.meta.title as string))
})
export default Router
