/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-08-08 14:16:53
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-08 14:58:49
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import BgLineFs from './glsl/BgLine.fs'
import BgLineVs from './glsl/BgLine.vs'

export class BgLine {
  private uniforms: {
    time: { value: number },
    wave1: { value: number },
    wave2: { value: number },
    wave3: { value: number },
    wave4: { value: number },
  }
  public obj: THREE.Object3D | null
  constructor() {
    this.uniforms = {
      time: { value: 0 },
      wave1: { value: 0 },
      wave2: { value: 0 },
      wave3: { value: 0 },
      wave4: { value: 0 },
    };
    this.obj = null
  }
  createObj(
    radius: number,
    wave1: number,
    wave2: number,
    wave3: number,
    wave4: number
  ) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: BgLineVs,
      fragmentShader: BgLineFs,
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      glslVersion: THREE.GLSL3,
    });
    this.uniforms.wave1.value = wave1;
    this.uniforms.wave2.value = wave2;
    this.uniforms.wave3.value = wave3;
    this.uniforms.wave4.value = wave4;

    // Create Object3D
    this.obj = new THREE.Mesh(geometry, material);
  }
  render(time: number, rotateX: number, rotateY: number, rotateZ: number) {
    this.uniforms.time.value += time;
    if (!this.obj) return
    this.obj.rotation.set(rotateX, this.uniforms.time.value * rotateY, rotateZ);
  }
}
