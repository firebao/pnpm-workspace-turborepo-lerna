/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-11-06 17:06:40
 * @LastEditors : 舍海洋 318348750@qq.com
 * @LastEditTime: 2025-11-06 17:27:34
 * @Description : 安装 Pinia 测试环境
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { config } from '@vue/test-utils'
import { cloneDeep } from 'lodash-es'
import { beforeAll, afterAll, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import type { TestingOptions } from '@pinia/testing'
import type { Plugin } from 'vue'


export function installPinia(options?: Partial<TestingOptions>) {
  const globalConfigBackup = cloneDeep(config.global)

  beforeAll(() => {
    config.global.plugins.unshift(
      // This is needed because typescript will complain othwerwise
      // Probably due to this being a monorepo as this same setup inside a test project did work correctly
      createTestingPinia({
        ...options,
        createSpy: vi.fn,
      }) as unknown as Plugin,
    )
  })

  afterAll(() => {
    config.global = globalConfigBackup
  })
}
