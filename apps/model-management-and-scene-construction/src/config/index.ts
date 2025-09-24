/*
 * @Author       : wwj 318348750@qq.com
 * @Date         : 2023-04-12 16:21:34
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-23 13:34:35
 * @Description  : 配置集合
 *
 * Copyright (c) 2023 by sjft, All Rights Reserved.
 */

// 场景配置
import sceneConfigJson from './sceneConfig.json'
export const sceneConfig = sceneConfigJson

// 渲染器配置
import rendererConfigJson from './rendererConfig.json'
export const rendererConfig = rendererConfigJson

// 相机配置
import cameraConfigJson from './cameraConfig.json'
export const cameraConfig = cameraConfigJson

// 控制器配置
import controlsConfigJson from './controlsConfig.json'
export const controlsConfig = controlsConfigJson

// 灯光配置
import lightConfigJson from './lightConfig.json'
export const lightConfig = lightConfigJson

// 效果合成器配置
import effectComposerConfigJson from './effectComposerConfig.json'
export const effectComposerConfig = effectComposerConfigJson

export const defaultSize: { width: number; height: number } = {
  width: 1920,
  height: 1080
}

interface WebConfig {
  // 系统title
  title: string
  // debug模式是否开启
  debug: boolean
  // 请求Url
  requestUrl: {
    // 地图请求url
    mapUrl: string
  }
}

export const webConfig: WebConfig = {
  title: 'TMS深化应用系统',
  debug: false,
  requestUrl: {
    // 正式服务器地图请求地址
    mapUrl: 'http://25.215.132.151:8098/roadmap/{z}/{x}/{y}.jpg'
    // 测试服务器地图请求地址
    // mapUrl: 'http://192.168.1.60:8098/roadmap/{z}/{x}/{y}.jpg'
    // 开发环境地图请求地址
    // mapUrl: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
  }
}

interface AuthConfig {
  requestUrl: string
  redirectUrl: string
}

/**
 * stats配置
 */
enum StatsMode {
  fps = 0,
  ms = 1,
  mb = 2,
  custom = 3
}
export const authConfig: AuthConfig = {
  requestUrl:
    'http://10.212.209.110:17001/isc_sso/oauth2.0/authorize?response_type=token&client_id=ff808081892b92ce01894cd889d97eb3&redirect_uri=',
  redirectUrl: 'http://25.215.132.136:8099/picture'
}

interface StatsConfig {
  statsMode: StatsMode
}

export const statsConfig: StatsConfig = {
  statsMode: StatsMode.fps
}
