/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-26 14:34:23
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-08 14:43:03
 * @Description : 自定义平滑相机
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import type { vec3 } from 'gl-matrix'
import * as glMatrix from 'gl-matrix'

export class ForcePerspectiveCamera extends THREE.PerspectiveCamera {
  public anchor: vec3            // 相机位置
  public velocity: vec3          // 当前速度
  public lookAnchor: vec3        // 目标点位置
  public lookVelocity: vec3      // 目标点速度

  private k: number               // 弹簧劲度系数
  private d: number               // 阻尼系数
  private acceleration: vec3      // 当前加速度
  private lookK: number           // 目标点弹簧劲度系数
  private lookD: number           // 目标点阻尼系数
  private lookAcceleration: vec3  // 目标点加速度
  constructor(fov?: number, aspect?: number, near?: number, far?: number) {
    super(fov, aspect, near, far)
    this.k = 0.02
    this.d = 0.2
    this.velocity = [0, 0, 0]
    this.acceleration = [0, 0, 0]
    this.anchor = [0, 0, 0]
    this.lookK = 0.02
    this.lookD = 0.2
    this.lookVelocity = [0, 0, 0]
    this.lookAcceleration = [0, 0, 0]
    this.lookAnchor = [0, 0, 0]
  }

  /**
   * @description 更新相机位置物理计算
   */
  updatePosition() {
    this.applyHook(this.velocity, this.acceleration, this.anchor, 0, this.k)
    this.applyDrag(this.acceleration, this.d)
    this.updateVelocity(this.velocity, this.acceleration, 1)
  }

  /**
   * @description 更新观察点物理计算
   */
  updateLook() {
    this.applyHook(this.lookVelocity, this.lookAcceleration, this.lookAnchor, 0, this.lookK)
    this.applyDrag(this.lookAcceleration, this.lookD)
    this.updateVelocity(this.lookVelocity, this.lookAcceleration, 1)
  }

  /**
   * @description 执行相机位置和观察点的最终渲染
   * 1. 更新相机位置物理计算
   * 2. 更新观察点物理计算
   * 3. 将计算结果应用到Three.js相机对象
   */
  render() {
    this.updatePosition()
    this.updateLook()
    this.position.set(
      this.velocity[0],
      this.velocity[1],
      this.velocity[2]
    )
    this.lookAt(
      this.lookVelocity[0],
      this.lookVelocity[1],
      this.lookVelocity[2]
    )
  }

  /**
   * @description 更新速度向量
   * @param {vec3} velocity 当前速度向量（将被修改）
   * @param {vec3} acceleration 当前加速度向量（将被修改）
   * @param {number} mass 质量（单位：kg，用于牛顿第二定律计算）
   * @returns void
   */
  updateVelocity(velocity: vec3, acceleration: vec3, mass: number) {
    glMatrix.vec3.scale(acceleration, acceleration, 1 / mass);
    glMatrix.vec3.add(velocity, velocity, acceleration);
  }

  /**
   * @description 应用流体阻力到加速度向量
   * @param {vec3} acceleration 当前加速度向量
   * @param {number} value 阻力系数（建议取值范围0.1-0.5）
   * @returns void
   */
  applyDrag(acceleration: vec3, value: number) {
    const drag: glMatrix.vec3 = [0, 0, 0]
    glMatrix.vec3.scale(drag, acceleration, -1)
    glMatrix.vec3.normalize(drag, drag)
    glMatrix.vec3.scale(drag, drag, glMatrix.vec3.length(acceleration) * value)
    glMatrix.vec3.add(acceleration, acceleration, drag)
  }

  /**
   * @description 应用胡克定律计算弹簧力
   * @param {vec3} velocity 当前速度向量（基于相机位置）
   * @param {vec3} acceleration 当前加速度向量（将被修改）
   * @param {vec3} anchor 弹簧锚点位置（目标位置）
   * @param {number} rest_length 弹簧静止长度（未拉伸时的长度）
   * @param {number} k 弹性系数（控制弹簧强度）
   * @returns void
   */
  applyHook(velocity: vec3, acceleration: vec3, anchor: vec3, rest_length: number, k: number) {
    const hook: glMatrix.vec3 = [0, 0, 0]
    glMatrix.vec3.sub(hook, velocity, anchor)
    const distance = glMatrix.vec3.length(hook) - rest_length
    glMatrix.vec3.normalize(hook, hook)
    glMatrix.vec3.scale(hook, hook, -1 * k * distance)
    glMatrix.vec3.add(acceleration, acceleration, hook)
  }
}
