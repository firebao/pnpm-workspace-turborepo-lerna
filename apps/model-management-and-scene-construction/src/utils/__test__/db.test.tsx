/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-08-17 14:24:18
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 10:01:12
 * @Description  : db工具库单元测试文件
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */
import { describe, expect, it } from 'vitest'
import { database, dbGet, dbSet } from '../db'
// import db from '../db'

describe('function pathInit()函数 路径初始化函数', () => {

  // beforeEach(() => {
  //   // 每个测试用例运行前重置数据库并清空路径对应值
  //   db.setState({})
  // })

  // afterAll(() => {
  //   // 所有测试结束后清空数据库
  //   db.write()
  // })

  // it(`应当返回正确的路径当路径已经存在并通过数据校验函数`, () => {
  //   db.set('database.user.ghost-uuid.path', 'existingValue').write()
  //   expect(pathInit({
  //     dbName: 'database',
  //     path: 'path',
  //     user: true,
  //     validator: value => value === 'existingValue',
  //     defaultValue: ''
  //   })).toEqual('database.user.ghost-uuid.path')
  //   expect(db.get('database.user.ghost-uuid.path').value()).toEqual('existingValue')
  // })

  // it(`没有初始值，但没有通过验证函数，应该是初始化默认值`, () => {
  //   expect(pathInit({
  //     dbName: 'database',
  //     path: 'path',
  //     user: true,
  //     validator: value => value === 'somethingElse',
  //     defaultValue: 'bar'
  //   })).toEqual('database.user.ghost-uuid.path')
  //   expect(db.get('database.user.ghost-uuid.path').value()).toBe('bar')
  // })

  // it(`有初始值，但没有通过验证函数，应该是初始化默认值`, () => {
  //   db.set('database.user.ghost-uuid.path', 'existingValue').write()
  //   expect(pathInit({
  //     dbName: 'database',
  //     path: 'path',
  //     user: true,
  //     validator: value => value === 'somethingElse',
  //     defaultValue: 'bar'
  //   })).toEqual('database.user.ghost-uuid.path')
  //   expect(db.get('database.user.ghost-uuid.path').value()).toBe('bar')
  // })

  // it(`user为false返回正确的路径`, () => {
  //   expect(pathInit({
  //     dbName: 'database',
  //     path: 'path',
  //     user: false,
  //     validator: value => value === 'somethingElse',
  //     defaultValue: 'bar'
  //   })).toEqual('database.public.path')
  //   expect(db.get('database.public.path').value()).toBe('bar')
  // })
})

describe('function dbSet() dbGet()函数 功能测试', () => {
  it(`正确设置db数据`, () => {
    const testData = {
      dbName: 'a',
      path: 'b',
      value: '1',
      user: true
    }
    dbSet(testData)
    expect(dbGet({
      dbName: 'a',
      path: 'b',
      user: true
    })).toBe('1')
  })
  it(`默认的db设置`, () => {
    expect(dbGet({
      dbName: 'a',
      path: 'b',
      defaultValue: 'c',
      user: false
    })).toBe('c')
  })
})

describe('function dbSet() dbGet()函数 功能测试', () => {
  it(`正确设置db数据`, () => {
    const testData = {
      dbName: 'a',
      path: 'b',
      value: '1',
      user: true
    }
    dbSet(testData)
    expect(dbGet({
      dbName: 'a',
      path: 'b',
      user: true
    })).toBe('1')
  })
  it(`默认的db设置`, () => {
    expect(dbGet({
      dbName: 'a',
      path: 'b',
      defaultValue: 'c',
      user: false
    })).toBe('c')
  })
})

describe('function database()函数 功能测试', () => {
  it(`默认值正确设置`, () => {
    database()
    expect(dbGet({})).toBe('')
  })
  it('正确设置', () => {
    database({
      dbName: 'x',
      path: 'y',
      user: true,
      validator: () => true,
      defaultValue: 'z'
    })
    expect(dbGet({
      dbName: 'x',
      path: 'y',
      defaultValue: '',
      user: true
    })).toBe('z')
  })
})
