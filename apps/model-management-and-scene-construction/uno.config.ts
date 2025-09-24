/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-12 17:33:26
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 14:35:26
 * @Description : Unocss配置
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    { logo: 'i-logos-vue w-6em h-6em transform transition-800' },
  ],
  presets: [
    presetUno(),
  ]
})
