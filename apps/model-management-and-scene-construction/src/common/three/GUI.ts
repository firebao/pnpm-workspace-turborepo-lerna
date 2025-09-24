/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-27 10:23:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-12 16:53:17
 * @Description : gui元素对象(左侧6个旋转圆环)
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import guiFs from './glsl/gui.fs'
import guiVs from './glsl/gui.vs'

export class GUI {
  // 着色器 uniforms （传递给GPU的全局变量）
  private uniforms: {
    time: { value: number }                      // 时间变量（控制动画）
    texture1: { value: THREE.Texture | null }    // 纹理1
    texture2: { value: THREE.Texture | null }    // 纹理2
    texture3: { value: THREE.Texture | null }    // 纹理3
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
      time: { value: 0 },
      texture1: { value: null },
      texture2: { value: null },
      texture3: { value: null },
    };
    // 默认创建6个实例
    this.num = 6;
    // 初始为空
    this.obj = null
  }

  /**
   * @description: 创建gui元素对象
   * @param textures 纹理数组
   */
  createObj(textures: Array<THREE.Texture | undefined>) {
    // 实例化几何体创建
    const geometry = new THREE.InstancedBufferGeometry()

    // 共享的基础集合数据
    const baseGeometry = new THREE.PlaneGeometry(1200, 1200, 2, 2)
    geometry.setAttribute('position', baseGeometry.attributes.position!)
    geometry.setAttribute('uv', baseGeometry.attributes.uv!)
    geometry.setIndex(baseGeometry.index)

    // 差异化实例化属性
    const instancePosition = new THREE.InstancedBufferAttribute(new Float32Array(this.num * 3), 3)
    const rotate1 = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1)
    const rotate2 = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1)
    const rotate3 = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1)
    const h = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1)

    // 实例化属性赋值
    for ( let i = 0, ul = this.num; i < ul; i++ ) {
      // 沿Z轴等距排列（间隔-150d单位）,形成层叠效果
      instancePosition.setXYZ(i, -600, 0, (this.num - i) * -150)
      // 旋转参数，生成 -1 到 1 之间的随机数
      rotate1.setX(i, Math.random() * 2 - 1)
      rotate2.setX(i, Math.random() * 2 - 1)
      rotate3.setX(i, Math.random() * 2 - 1)
      // HSV色相偏移，生成 -0.15 到 0.15 之间的随机数
      h.setX(i, (Math.random() * 2 - 1) * 0.15)
    }

    // 属性绑定
    geometry.setAttribute('instancePosition', instancePosition)
    geometry.setAttribute('rotate1', rotate1)
    geometry.setAttribute('rotate2', rotate2)
    geometry.setAttribute('rotate3', rotate3)
    geometry.setAttribute('h', h)

    // 创建原始着色器材质
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `${guiVs}`,
      fragmentShader: `${guiFs}`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      glslVersion: THREE.GLSL3,
    })

    // 纹理赋值
    this.uniforms.texture1.value = textures[0]!
    this.uniforms.texture2.value = textures[1]!
    this.uniforms.texture3.value = textures[2]!

    // 实例化网格创建
    this.obj = new THREE.InstancedMesh(geometry, material, this.num);
  }

  /**
   * @description 渲染函数
   * @param time 时间间隔
   */
  render(time: number) {
    this.uniforms.time.value += time;
  }
}
