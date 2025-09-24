/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:35:45
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 09:50:30
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { describe, expect, it } from 'vitest'
import { randomLenNum, title } from 'src/utils/util'

describe('function title() 更新标题测试', () => {
  it(`正确改变浏览器标题`, () => {
    const processTitle = import.meta.env.VITE_VUE_APP_TITLE || 'SJFTVueCesium'
    title('测试标题')
    const titleText = window.document.title
    expect(titleText).toBe(processTitle + ' | 测试标题')
  })
  it(`传空字符串`, () => {
    const processTitle = import.meta.env.VITE_VUE_APP_TITLE || 'SJFTVueCesium'
    title('')
    const titleText = window.document.title
    expect(titleText).toBe(processTitle)
  })
  it(`不传参数`, () => {
    const processTitle = import.meta.env.VITE_VUE_APP_TITLE || 'SJFTVueCesium'
    title()
    const titleText = window.document.title
    expect(titleText).toBe(processTitle)
  })
})

describe('function open() 打开新页面测试', () => {
  it(`正确移除dom中的a标签`, () => {
    const url = 'https://test.com'
    open(url)
    const removedLinkElement = document.getElementById('vc-link-temp')
    expect(removedLinkElement).toBeNull()
  })
  // TODO: 测试是否正确设置vc-link-temp的属性
})

// describe('function supplementPath() 给菜单数据补充path字段数据', () => {
//   it('如果确实path字段,可以正确补充,同时有path字段不能被替换', () => {
//     const menu = [
//       {
//         id: '1',
//         component: 'MainLayout',
//         icon: 'cog',
//         islock: false,
//         hidden: false,
//         name: 'layout',
//         sort: 1000,
//         title: 'VueCesiumDemo',
//         type: 10,
//         children: [
//           {
//             id: '2',
//             component: '/index',
//             icon: 'cog',
//             islock: false,
//             hidden: false,
//             name: 'index',
//             path: '/index',
//             sort: 1000,
//             caption: '首页',
//             title: 'message.header.index',
//             type: 10,
//             children: [
//               {
//                 id: '3',
//                 component: '',
//                 icon: 'eye',
//                 islock: false,
//                 hidden: false,
//                 name: 'left-panel',
//                 sort: 100101,
//                 title: '查看左侧面板',
//                 type: 20
//               }
//             ]
//           }
//         ]
//       }
//     ]
//     const result = supplementPath(menu)
//     expect(result[0])?.toHaveProperty('path', 'vc-menu-empty-1')
//     expect(result[0].children[0].children[0]).toHaveProperty('path', 'vc-menu-empty-2')
//     expect(result[0].children[0]).toHaveProperty('path', '/index')
//   })
// })

describe('function randomLenNum() 生成随机数字字符串', () => {
  it('指定生成位数有正确返回', () => {
    const len = 6
    const result = randomLenNum(len)
    expect(result).toHaveLength(len)
    expect(Number.isNaN(Number(result))).toBe(false)
  })

  it('加时间戳返回', () => {
    const len = 8
    const result = randomLenNum(len, true)
    // 以8位数字开头，后跟时间戳
    expect(result).toMatch(/^\d{8}\d+$/)
  })

  it('默认返回4位', () => {
    const result = randomLenNum()
    expect(result).toHaveLength(4)
  })
})
