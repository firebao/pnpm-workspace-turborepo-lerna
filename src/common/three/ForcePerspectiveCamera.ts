/**
 * @description 应用胡克定律计算弹簧力
 * @param {vec3} currentPosition 当前位置向量
 * @param {vec3} acceleration 当前加速度向量（将被修改）
 * @param {vec3} anchor 弹簧锚点位置（目标位置）
 * @param {number} restLength 弹簧静止长度
 * @param {number} k 弹性系数
 */
applyHook(currentPosition: vec3, acceleration: vec3, anchor: vec3, restLength: number, k: number) {
  const hook: vec3 = [0, 0, 0]
  glMatrix.vec3.sub(hook, currentPosition, anchor) // 使用位置计算位移差
  // ...保持后续计算不变...
}
