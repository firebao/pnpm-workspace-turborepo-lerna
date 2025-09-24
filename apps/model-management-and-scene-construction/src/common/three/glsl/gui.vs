// 定义输入变量
in vec3 position;                     // 顶点位置
in vec2 uv;                           // UV坐标
in vec3 instancePosition;             // 实例位置
in float rotate1;                     // 旋转参数1
in float rotate2;                     // 旋转参数2
in float rotate3;                     // 旋转参数3
in float h;                           // HSV基础色相

// 定义uniform变量
uniform mat4 projectionMatrix;        // 投影矩阵
uniform mat4 modelViewMatrix;         // 模型视图矩阵
uniform float time;                   // 时间参数

// 定义输出变量
out vec3 vPosition;                   // 顶点位置
out vec2 vUv;                         // UV坐标
out vec3 vColor;                      // 颜色值
out float vRotate1;                   // 旋转参数1
out float vRotate2;                   // 旋转参数2
out float vRotate3;                   // 选装参数3


/**
 * @description: 实现 HSV 转 RGB 函数
 * @param {vec3} hsv HSV颜色向量
 * @return {vec3} RGB颜色向量
 */
vec3 convertHsvToRgb(vec3 hsv) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
  return hsv.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), hsv.y);
}

void main(void) {
  // 计算HSV颜色值, h是基础色相, 随时间变化
  vec3 hsv = vec3(h + time * 0.1 + 0.5, 0.4, 1.0);
  vec3 rgb = convertHsvToRgb(hsv);

  // 顶点坐标变换: 将模型坐标与实例位置相加，再应用模型视图矩阵
  vec4 mvPosition = modelViewMatrix * vec4(position + instancePosition, 1.0);

  // 设置输出变量
  vPosition = position;
  vUv = uv;
  vColor = rgb;
  vRotate1 = rotate1;
  vRotate2 = rotate2;
  vRotate3 = rotate3;

  // 计算最终顶点位置
  gl_Position = projectionMatrix * mvPosition;
}
