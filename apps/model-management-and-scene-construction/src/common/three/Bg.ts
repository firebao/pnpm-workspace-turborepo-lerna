/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-27 16:59:34
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-08 15:31:02
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import BgFs from './glsl/bg.fs'
import BgVs from './glsl/bg.vs'

export class Bg {
  // 着色器 uniforms （传递给GPU的全局变量）
  private uniforms: {
    time: { value: number }
  };

  // 最终生成的3D对象(供场景添加)
  public obj: THREE.Object3D | null

  /**
   * @description: 构造函数
   */
  constructor() {
    // 初始化uniforms（默认值）
    this.uniforms = {
      time: { value: 0 },
    };

    // 初始为空
    this.obj = null
  }

  /**
   * @description: 创建gui元素对象
   * @param textures 纹理数组
   */
  createObj() {
    // 实例化几何体创建
    const geometry = new THREE.SphereGeometry(10000, 32, 32);

    // 创建原始着色器材质
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: BgVs,
      fragmentShader: BgFs,
      side: THREE.BackSide,
      glslVersion: THREE.GLSL3,
    })

    // 网格创建
    this.obj = new THREE.Mesh(geometry, material)
  }

  /**
   * @description 渲染函数
   * @param time 时间间隔
   */
  render(time: number) {
    this.uniforms.time.value += time
  }
}
