/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-26 17:32:20
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-08 14:44:06
 * @Description : 自定义相机控制
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as glMatrix from 'gl-matrix'
import type { vec3 } from 'gl-matrix'
import type { Vector2 } from 'three'
import type { ForcePerspectiveCamera } from './ForcePerspectiveCamera'
type FocalLength = {
  prev: number
  next: number
  time: number
}
export class CameraController {
  private camera: ForcePerspectiveCamera
  private anchorTilt: glMatrix.vec3
  private focalLength: FocalLength

  constructor(camera: ForcePerspectiveCamera, focalLength?: FocalLength) {
    this.camera = camera
    this.anchorTilt = [0, 0, 0]
    if (focalLength) {
      this.focalLength = focalLength
    } else {
      this.focalLength = {
        prev: 0,
        next: 0,
        time: 0
      }
    }
  }

  init(position: vec3, lookAt: vec3) {
    for (let i = 0; i < position.length; i++) {
      this.camera.anchor[i] = this.camera.velocity[i] = position[i] || 0
      this.camera.lookAnchor[i] = this.camera.lookVelocity[i] = lookAt[i] || 0
    }
  }
  tilt(mousemove: Vector2) {
    this.anchorTilt = [
      mousemove.x * -50,
      mousemove.y * 25,
      0
    ]
  }
  move(position: vec3, lookAt: vec3, focalLength: number) {
    for (let i = 0; i < position.length; i++) {
      this.camera.anchor[i] = position[i] || 0
      this.camera.lookAnchor[i] = lookAt[i] || 0
    }
    if (focalLength > 0 && this.focalLength.next !== focalLength) {
      this.focalLength.prev = this.focalLength.next
      this.focalLength.next = focalLength
      this.focalLength.time = 0
    }
  }
  render(_time: number, mousemove: Vector2) {
    this.tilt(mousemove)
    glMatrix.vec3.add(this.camera.velocity, this.camera.velocity, this.anchorTilt)
    this.camera.render()
  }
}
