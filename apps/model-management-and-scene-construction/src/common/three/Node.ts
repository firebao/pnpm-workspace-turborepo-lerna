/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-27 16:16:35
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-13 17:33:22
 * @Description : 添加中间的三角面、以及三角面顶点、三角面颜色渲染
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import nodeFs from './glsl/node.fs'
import nodeVs from './glsl/node.vs'
import nodeWireFs from './glsl/nodeWire.fs'
import nodePointsFs from './glsl/nodePoints.fs'
import nodePointsVs from './glsl/nodePoints.vs'

export class Node {
  // 着色器 uniforms （传递给GPU的全局变量）
  private uniforms: {
    time: { value: number }               // 时间变量（控制动画）
  }

  public obj: THREE.Object3D | null
  public objWire: THREE.Object3D | null
  public objPoints: THREE.Object3D | null

  /**
   * @description: 构造函数
   */
  constructor() {
    // 初始化uniforms（默认值）
    this.uniforms = {
      time: { value: 0 }
    }
    this.obj = null
    this.objWire = null
    this.objPoints = null
  }

  /**
   * @description: 创建node元素对象
   */
  createObj() {
    // 创建一个环形几何体，参数分别为：内半径1550，外半径1600，分段数36，环数2，起始角度135度(转换为弧度)，结束角度270度(转换为弧度)
    const geometry = new THREE.RingGeometry(1550, 1600, 36, 2, 135 * Math.PI / 180, 270 * Math.PI / 180)

    // 创建主材质，使用原始着色器材质(RawShaderMaterial)
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,            // 使用类中定义的uniform变量
      vertexShader: nodeVs,               // 顶点着色器
      fragmentShader: nodeFs,             // 片段着色器
      depthWrite: false,                  // 禁用深度写入
      transparent: true,                  // 启用透明度
      blending: THREE.AdditiveBlending,   // 使用加法混合模式
      defines: {},                        // 着色器宏定义
      glslVersion: THREE.GLSL3            // 使用GLSL 3.0版本
    })

    // 创建线框材质
    const materialWire = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: nodeVs,
      fragmentShader: nodeWireFs,         // 使用线框专用的片段着色器
      depthWrite: false,
      transparent: true,
      wireframe: true,                    // 启用线框模式
      blending: THREE.AdditiveBlending,
      defines: {},
      glslVersion: THREE.GLSL3
    })

    // 创建点材质
    const materialPoints = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: nodePointsVs,         // 点专用的顶点着色器
      fragmentShader: nodePointsFs,       // 点专用的片段着色器
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
      defines: {},
      glslVersion: THREE.GLSL3
    })

    // 使用主材质创建网格对象
    this.obj = new THREE.Mesh(geometry, material)
    // 使用线框材质创建网格对象
    this.objWire = new THREE.Mesh(geometry, materialWire)
    // 使用点材质创建点对象
    this.objPoints = new THREE.Points(geometry, materialPoints)

    // 设置所有对象的位置为(0,0,-1200)
    this.obj.position.set(0, 0, -1200)
    this.objWire.position.set(0, 0, -1200)
    this.objPoints.position.set(0, 0, -1200)
  }

  /**
   * @description 渲染函数
   * @param time 时间间隔
   */
  render(time: number) {
    this.uniforms.time.value += time
    const rotation: [number, number, number] = [
      (Math.sin(this.uniforms.time.value * 0.1) * 20 + 90) * (Math.PI / 180),
      (Math.sin(this.uniforms.time.value * 0.05) * 20) * (Math.PI / 180),
      0,
    ]
    this.obj!.rotation.set(rotation[0], rotation[1], rotation[2])
    this.objWire!.rotation.set(rotation[0], rotation[1], rotation[2])
    this.objPoints!.rotation.set(rotation[0], rotation[1], rotation[2])
  }
}
