/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 11:48:23
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-09-25 10:13:07
 * @Description : 环境变量类型
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */

/// <reference lib="dom" />

interface ImportMeta {
  readonly hot?: {
    accept: <T>(callback?: (updatedModule: T) => void) => void;
  };
  readonly glob: <T = unknown>(pattern: string, config: object) => Record<string, T>
  readonly env: {
    SERVER: string
    MODE: string
    NODE_ENV: string
    BASE_URL: string
    VITE_BUILD_ENV: string
    VITE_VUE_DEFAULT_PATH: string
    VITE_VUE_ROUTER_MODE: string
    VITE_VUE_ROUTER_BASE: string
    VITE_VUE_APP_API: string
    VITE_MOCK_ENABLED: string
    VITE_VUE_APP_PREFIX: string
    VITE_VUE_APP_TITLE: string
    VITE_APP_BASE_API: string
    VITE_APP_CLIENT_ID: string
  }
}

declare const __APP_VERSION__: string
