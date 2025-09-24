/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-27 14:51:21
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-12 17:49:43
 * @Description : beam元素对象(向远处移动的彩带)
 * Copyright (c)i 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import { random } from 'lodash'
import beamFs from './glsl/beam.fs'
import beamVs from './glsl/beam.vs'

export class Beam {
  // 着色器 uniforms （传递给GPU的全局变量）
  private uniforms: {
    time: { value: number }   // 时间变量（控制动画）
  }

  // 实例数量
  private instances: number

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
    this.instances = 2000;
    // 初始为空
    this.obj = null;
  }

  /**
   * @description: 创建beam元素对象
   */
  createObj() {
    // 实例化几何体创建
    const geometry = new THREE.InstancedBufferGeometry();

    // 共享的基础集合数据
    const baseGeometry = new THREE.BoxGeometry(100, 4000, 2, 2, 2);
    geometry.setAttribute('position', baseGeometry.attributes.position!)
    geometry.setAttribute('uv', baseGeometry.attributes.uv!)
    geometry.setIndex(baseGeometry.index)

    // 差异化实例化属性
    const instancePosition = new THREE.InstancedBufferAttribute(new Float32Array(this.instances * 3), 3);
    const delay = new THREE.InstancedBufferAttribute(new Float32Array(this.instances), 1);
    const h = new THREE.InstancedBufferAttribute(new Float32Array(this.instances), 1);

    // 实例化属性赋值
    for (let i = 0, ul = this.instances; i < ul; i++ ) {
      instancePosition.setXYZ(
        i,
        random(-5000, 5000, true),
        0,
        random(-500, 500, true) + ((Math.random() < 0.5 ? -1 : 1) * 700),
      );
      delay.setX(i, Math.random() * 2.0);
      h.setX(i, Math.random() * 0.3);
    }

    // 属性绑定
    geometry.setAttribute('instancePosition', instancePosition);
    geometry.setAttribute('delay', delay);
    geometry.setAttribute('h', h);

    // 创建原始着色器材质
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: beamVs,
      fragmentShader: beamFs,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      glslVersion: THREE.GLSL3,
    });

    // 实例化网格创建
    this.obj = new THREE.InstancedMesh(geometry, material, this.instances);
  }

  /**
   * @description 渲染函数
   * @param time 时间间隔
   */
  render(time: number) {
    this.uniforms.time.value += time;
  }
}
