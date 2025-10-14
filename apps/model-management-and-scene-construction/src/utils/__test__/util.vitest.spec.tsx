/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-10-14 09:03:07
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-10-14 09:16:50
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { describe, it, expect } from 'vitest'
import { transformParams } from '../util'

describe('tansParams函数测试', () => {
  it('应该处理简单对象', () => {
    const params = { name: 'test', age: 25 }
    const result = transformParams(params)
    expect(result).toBe('name=test&age=25')
  })

  it('应该忽略null和undefined值', () => {
    const params = { name: 'test', age: null, gender: undefined }
    const result = transformParams(params)
    expect(result).toBe('name=test')
  })

  it('应该处理嵌套对象', () => {
    const params = {
      user: {
        name: 'test',
        age: 25
      }
    }
    const result = transformParams(params)
    expect(result).toBe('user%5Bname%5D=test&user%5Bage%5D=25')
  })

  it('应该忽略嵌套对象中的null和undefined值', () => {
    const params = {
      user: {
        name: 'test',
        age: null,
        gender: undefined
      }
    }
    const result = transformParams(params)
    expect(result).toBe('user%5Bname%5D=test')
  })

  it('应该处理空对象', () => {
    const params = {}
    const result = transformParams(params)
    expect(result).toBe('')
  })

  it('应该处理包含特殊字符的值', () => {
    const params = { name: 'test@123', query: 'a=b&c=d' }
    const result = transformParams(params)
    expect(result).toBe('name=test%40123&query=a%3Db%26c%3Dd')
  })
})
