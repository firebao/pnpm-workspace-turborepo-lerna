// 设置浮点数精度为高精度
precision highp float;

// 定义输入变量
in vec3 position;                   // 顶点位置
in vec3 normal;                     // 法线
in vec2 uv;                         // UV坐标

// 定义uniform变量
uniform mat4 projectionMatrix;      // 投影矩阵
uniform mat4 modelViewMatrix;       // 模型视图矩阵
uniform float time;                 // 时间参数

// 定义输出变量
out vec3 vPosition;                  // 顶点位置
out vec3 vColor;                     // 顶点颜色
out float vOpacity;                  // 顶点透明度


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

/**
 * @description: 环绕x轴旋转矩阵
 * @param {float} angle 旋转度数
 * @return {mat4} 变换后的矩阵
 */
mat4 rotateX(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, c,   -s,  0.0,
    0.0, s,   c,   0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

/**
 * @description: 环绕y轴旋转矩阵
 * @param {float} angle 旋转度数
 * @return {mat4} 变换后的矩阵
 */
mat4 rotateY(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat4(
    c,   0.0, s,   0.0,
    0.0, 1.0, 0.0, 0.0,
    -s,  0.0, c,   0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

/**
 * @description: 环绕z轴旋转矩阵
 * @param {float} angle 旋转度数
 * @return {mat4} 变换后的矩阵
 */
mat4 rotateZ(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat4(
    c,   -s,  0.0, 0.0,
    s,   c,   0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

/**
 * @description: 组合三个旋转轴进行旋转
 * @param {vec3} angle 旋转度数向量
 * @return {mat4} 变换后的矩阵
 */
mat4 calcRotateMat4(vec3 angles) {
  return rotateZ(angles.z) * rotateY(angles.y) * rotateX(angles.x);
}


void main() {
  // 将UV坐标从[0,1]映射到[-1,1]
  vec2 resolution = uv * 2.0 - 1.0;

  // 基于时间和UV坐标计算旋转角度
  float rotateX = resolution.x * 100.0 + time / 2.0;
  float rotateY = resolution.y * 200.0 + time / 2.0;
  float rotateZ = length(resolution.xy) * 150.0 + time / 2.0;

  // 应用旋转矩阵
  mat4 rotateMat = calcRotateMat4(vec3(rotateX, rotateY, rotateZ));
  vec3 rotatePosition = (rotateMat * vec4(vec3(sin(time * 0.1 + resolution.x * 10.0) * 150.0), 1.0)).xyz;

  // 添加波浪运行
  vec3 wavePosition = vec3(0.0, 0.0, sin(time * 0.1 + (resolution.x + resolution.y) * 5.6) * 300.0);
  vec3 updatePosition = position + rotatePosition + wavePosition;

  // 计算岁时间变化的HSV颜色并转换为RGB
  vec3 hsv = vec3(time * 0.1 + 0.5, 0.35, 0.6);
  vec3 rgb = convertHsvToRgb(hsv);

  // 坐标变换
  vec4 mvPosition = modelViewMatrix * vec4(updatePosition, 1.0);

  // 设置输出变量
  vPosition = updatePosition;
  vColor = rgb;

  // 最终顶点位置计算
  gl_Position = projectionMatrix * mvPosition;
}
