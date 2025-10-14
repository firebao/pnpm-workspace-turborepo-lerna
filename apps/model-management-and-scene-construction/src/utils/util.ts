/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:35:45
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 09:01:01
 * @Description : 工具函数库
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */

import type { MenuForMock } from 'src/types/user'
import type { NoDef } from 'src/types/base'
import { uniqueId } from 'lodash'

/**
 * @description 引入动态资源
 * @param {string} name 图片名称
 */
export function getCircleImgUrl(name: string): string {
  return new URL(`../assets/circleIcon/${name}.png`, import.meta.url).href
}

/**
 * @description 动态导入glb文件
 * @param {glb} name glb文件名称
 * @returns string
 */
export function getGlbUrl(name: string): string {
  return new URL(`../assets/glb/${name}.glb`, import.meta.url).href
}

/**
 * @description 动态导入gltf文件
 * @param {glb} name gltf文件名称
 * @returns string
 */
export function getGltfUrl(name: string): string {
  return new URL(`../assets/glb/${name}.gltf`, import.meta.url).href
}

/**
 * @description 动态导入MP4文件
 * @param {glb} name MP4文件名称
 * @returns string
 */
export function getMp4Url(name: string): string {
  return new URL(`../assets/video/${name}.mp4`, import.meta.url).href
}

/**
 * @description 动态导入图例图标文件
 * @param {glb} name 图例图标名称
 * @returns string
 */
export function getLegendImgUrl(name: string): string {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href
}

/**
 * @description 动态导入纹理贴图文件
 * @param {string} name 纹理贴图名称
 * @returns string
 */
export function getTextureUrl(name: string): string {
  return new URL(`../assets/hdr/${name}`, import.meta.url).href
}

/**
 * @description 更新标题
 * @param {NoDef<string>} titleText 标题
 * @returns {void}
 */
export function title(titleText?: NoDef<string>): void {
  const processTitle = import.meta.env.VITE_VUE_APP_TITLE || ''
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
export function open(url: string): void {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'vc-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('vc-link-temp')!)
}

/**
 * @description 给菜单数据补充上 path 字段
 * @link https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
export function supplementPath(menu: Array<MenuForMock>): Array<MenuForMock> {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('vc-menu-empty-'),
    ...(e.children
      ? {
          children: supplementPath(e.children)
        }
      : {})
  }))
}

/**
 * @description: 生成随机len位数字
 * @param {NoDef<number>} len 随机数长度
 * @param {boolean} date 是否基于当前时间生成
 * @return {string} 生成的随机数
 */
export function randomLenNum(len?: NoDef<number>, date = false): string {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substring(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * @description 加工日期范围
 * @param {string} daysArr 日期范围
 * @param {string} endDay 结束日期
 * @returns {string[]} 日期数组
 */
export function computedDaysRange(daysArr: string, endDay = null) {
  let result = [daysArr]
  if (typeof endDay === 'string') {
    result = fetchDaysRange(daysArr, endDay)
  }
  return result.map(item => fetchDayDetail(item))
}

/**
 * @description 获取指定日期详细信息
 * @param {string|Date} current 日期
 * @returns {object} 日期详细信息
 */
export const fetchDayDetail = (current: string|Date) => {
  let currentDate = null
  if (typeof current === 'string') {
    currentDate = new Date(current)
  } else if (current instanceof Date) {
    currentDate = current
  }

  if (!currentDate) throw new Error('获取日期详细信息参数错误:' + current.toString())
  const weekName = ['日', '一', '二', '三', '四', '五', '六']

  return {
    year: String(currentDate.getFullYear()).padStart(4, '0'),
    month: String(currentDate.getMonth() + 1).padStart(2, '0'),
    day: String(currentDate.getDate()).padStart(2, '0'),
    week: weekName[currentDate.getDay()]
  }
}

/**
 * @description 获取指定月份每一天日期
 * @param {string} str 月份 2022-02
 * @returns {string[]} 日期数组
 */
export const fetchDays = (str: string) => {
  const month = str.replace(/\//g, '-')
  const monthArr = month.split('-').map(item => Number(item))
  if (monthArr.length !== 2) throw new Error('获取月份日期参数错误:' + str)
  const count = new Date(...(monthArr as [number, number]), 0).getDate()
  return new Array(count).fill('').map((item, index) => index + 1)
}

/**
 * @description 获取指定范围每一天的日期
 * @param {string} start 开始日期
 * @param {string} stop 结束日期
 * @returns {string[]} 日期数组
 */
export const fetchDaysRange = (start: string, stop: string) => {
  const current = new Date(start.replace(/\//g, '-'))
  const end = new Date(stop)
  const result = []
  while (end >= current) {
    const res = fetchDayDetail(current)
    result.push(`${res.year}-${res.month}-${res.day}`)
    current.setDate(current.getDate() + 1)
  }
  return result
}

/**
 * @description 范围日期按月份归类
 * @param {Array} daysArr 日期数组
 * @returns {Array} 归类后的日期数组
 */
export const splitDaysForMonth = (daysArr: {year: string, month: string}[]) => {
  const res: {[key:string]: {year: string, month: string}[]} = {}
  daysArr.forEach(item => {
    const name = item.year + '-' + item.month
    if (res[name]) {
      res[name].push(item)
    } else {
      res[name] = [item]
    }
  })
  return Object.values(res)
}

/**
 * @description 查询指定日期是否在指定范围内
 * @param {string} today
 * @param {Array} range 日期范围
 * @returns {boolean} 是否在范围内
 */
export const todayInRange = (today: string, range: [string, string]) => {
  return fetchDaysRange(...range).includes(today)
}

/**
 * @description 获取指定月份日期列表
 * @param {string} str 月份 2022-02
 * @returns {string[]} 日期数组
 */
export const fetchMonthRangeDay = (str: string) => {
  const dateList = String(str).replace('/', '-').split('-')
  return fetchDays(str).map(item => {
    return (
      String(dateList[0]).padStart(4, '0') +
      '-' +
      String(dateList[1]).padStart(2, '0') +
      '-' +
      String(item).padStart(2, '0')
    )
  })
}

/**
 * @description 获取当前日期
 * @returns {string} 日期
 */
export const fetchToday = () => {
  const now = new Date()
  const currentYear = String(now.getFullYear()).padStart(4, '0')
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0')
  const currentDay = String(now.getDate()).padStart(2, '0')
  return `${currentYear}-${currentMonth}-${currentDay}`
}

/**
 * @description 获取当前日期的前三天和后三天
 * @param {Date} now 日期
 * @returns
 */
interface ThreeDaysResult extends Array<string> {
  prev: string[]
  current: string[]
  next: string[]
}
export const fetchThreeDays = (now = new Date()): ThreeDaysResult => {
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}`
  let prevDate = ''
  if (currentMonth === 1) {
    prevDate = `${String(currentYear - 1).padStart(4, '0')}-12`
  } else {
    prevDate = `${String(currentYear).padStart(4, '0')}-${String(currentMonth - 1).padStart(2, '0')}`
  }
  let nextDate = ''
  if (currentMonth === 12) {
    nextDate = `${String(currentYear + 1).padStart(4, '0')}-01`
  } else {
    nextDate = `${String(currentYear).padStart(4, '0')}-${String(currentMonth + 1).padStart(2, '0')}`
  }

  const prev = fetchMonthRangeDay(prevDate)
  const current = fetchMonthRangeDay(currentDate)
  const next = fetchMonthRangeDay(nextDate)
  const result = [...prev, ...current, ...next] as ThreeDaysResult
  result.prev = prev
  result.current = current
  result.next = next
  return result
}

/**
 * @description 日期列表按月份归类
 * @param {Array} daysArr 日期数组
 * @returns Array
 */
export const dateSplitForValue = (data: Array<{ days: string[] }>) => {
  if (!data.length) return {}
  const start = data[0]?.days[0] || ''
  const endTime = data
    .map(item => new Date(item.days.at(-1) || '').getTime())
    .sort((a, b) => a - b)
    .at(-1)
  const endDate = fetchDayDetail(new Date(endTime!))
  const end = `${endDate.year}-${endDate.month}-${endDate.day}`
  const res: { [key: string]: number[] } = {}
  fetchDaysRange(start, end).forEach(key => {
    const current = data
      .map((item, index) => (item.days.includes(key) ? index : false))
      .filter((v): v is number => v !== false)
    if (current.length) {
      res[key] = current
    }
  })
  return res
}


export const fetchNextMonthRange = (date = new Date()) => {
  return fetchThreeDays(date).next
}

export const fetchPrevMonthRange = (date = new Date()) => {
  return fetchThreeDays(date).prev
}

export const fetchTodayMonthRange = (date = new Date()) => {
  return fetchThreeDays(date).current
}

/**
 * 日期时间格式化
 * @param {(Date|string|number)} time 时间(可以是Date对象，构造Date对象的字符串，或者时间戳)
 * @param {string} cFormat 格式和文本
 * @returns {string}
 */
export function parseTime(time: Date | string | number, cFormat: string): string {
  if (arguments.length === 0 || !time) {
    return ''
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: {
    y: number
    m: number
    d: number
    h: number
    i: number
    s: number
    a: number
  } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (match: string, key: string): string => {
    const validKey = key as keyof typeof formatObj
    const value = formatObj[validKey] ?? match
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value] || ''
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * GET请求参数处理(深层嵌套对象，空值过滤、强制编码方式)
 * @param {object} params  参数
 * @returns {string}
 */
export const transformParams = (params: object) => {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName as keyof typeof params]
    const part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result.length > 0 ? result.slice(0, -1) : ''
}
