/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-27 09:27:49
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-27 10:18:25
 * @Description : 纹理加载
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'

const texLoader = new THREE.TextureLoader()

export function loadTexs(imgs: Record<string, string>, callback: (texs: Record<string, THREE.Texture>) => void) {
  const length = Object.keys(imgs).length
  const loadedTexs: Record<string, THREE.Texture> = {}
  let count = 0

  for (const key in imgs) {
    const k = key
    if (Object.prototype.hasOwnProperty.call(imgs, k))
      if (imgs[k]) {
        texLoader.load(
          imgs[k],
          (tex: THREE.Texture) => {
            tex.repeat = new THREE.Vector2(THREE.RepeatWrapping, THREE.RepeatWrapping)
            loadedTexs[k] = tex
            count++
            if (count >= length) callback(loadedTexs)
          },
          () => {},
          (_err: unknown) => {
            throw _err
          }
        )
      } else {
        throw new Error('纹理路径不能为空')
      }
  }
}
