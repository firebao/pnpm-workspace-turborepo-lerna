/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-27 16:32:28
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-13 09:12:25
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import { random } from 'lodash'
import FloatPointsFs from './glsl/floatPoints.fs'
import FloatPointsVs from './glsl/floatPoints.vs'

export class FloatPoints {
  // 着色器 uniforms （传递给GPU的全局变量）
  private uniforms: {
    time: { value: number }
  }

  // 实例数量
  private num: number

  // 最终生成的3D对象(供场景添加)
  public obj: THREE.Object3D | null

  /**
   * @description: 构造函数
   */
  constructor() {
    // 初始化uniforms（默认值）
    this.uniforms = {
      time: { value: 0 }
    }
    // 默认创建2000个实例
    this.num = 2000
    // 初始为空
    this.obj = null
  }

  /**
   * @description: 创建对象
   */
  createObj() {
    const geometry = new THREE.BufferGeometry();

    const position = new THREE.BufferAttribute(new Float32Array(this.num * 3), 3, true)
    const delay = new THREE.BufferAttribute(new Float32Array(this.num), 1, true)
    const speed = new THREE.BufferAttribute(new Float32Array(this.num), 1, true)

    for ( let i = 0, ul = this.num; i < ul; i++ ) {
      const radian1 = (random(0, 150) - 75) * (Math.PI / 180)
      const radian2 = (random(0, 360)) * (Math.PI / 180)
      const radius = random(600, 2500)
      const spherical = new THREE.Vector3().setFromSphericalCoords(radius, radian1, radian2)
      position.setXYZ(i, spherical.x, spherical.y, spherical.z)
      delay.setX(i, Math.random())
      speed.setX(i, random(5, 10, true) * (random(0, 1, false) * 2.0 - 1.0))
    }

    geometry.setAttribute('position', position)
    geometry.setAttribute('delay', delay)
    geometry.setAttribute('speed', speed)

    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: FloatPointsVs,
      fragmentShader: FloatPointsFs,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      glslVersion: THREE.GLSL3,
    })

    this.obj = new THREE.Points(geometry, material)
  }

  /**
   * @description 渲染函数
   * @param time 时间间隔
   */
  render(time: number) {
    this.uniforms.time.value += time
  }
}
