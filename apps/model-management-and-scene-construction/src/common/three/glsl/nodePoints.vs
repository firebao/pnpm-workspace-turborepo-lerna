// 定义输入变量
in vec3 position;
in vec3 normal;
in vec2 uv;

// 定义uniform变量
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;

// 定义输出变量
out vec3 vPosition;                  // 顶点位置
out vec3 vColor;                     // 顶点颜色

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
  // 将UV坐标从[0,1]范围转换到[-1,1]范围
  vec2 p = uv * 2.0 - 1.0;

  // 计算旋转角度，基于UV坐标和时间变化
  float rotateX = p.x * 100.0 + time / 2.0;
  float rotateY = p.y * 200.0 + time / 2.0;
  float rotateZ = length(p.xy) * 150.0 + time / 2.0;
  
  // 创建旋转矩阵并应用旋转
  mat4 rotateMat = calcRotateMat4(vec3(rotateX, rotateY, rotateZ));
  vec3 rotatePosition = (rotateMat * vec4(vec3(sin(time * 0.1 + p.x * 10.0) * 150.0), 1.0)).xyz;

  // 创建波浪运动效果
  vec3 wavePosition = vec3(0.0, 0.0, sin(time * 0.1 + (p.x + p.y) * 5.6) * 300.0);
  
  // 组合原始位置、旋转位置和波浪位置
  vec3 updatePosition = position + rotatePosition + wavePosition;

  // 计算点的大小，基于旋转角度
  float size = (pow(sin(rotateX * 10.0), 3.0) + 1.0) * 2.0 + 3.0;

  // 创建随时间变化的HSV颜色
  vec3 hsv = vec3(time * 0.1, 0.35, 0.6);
  // 将HSV转换为RGB
  vec3 rgb = convertHsvToRgb(hsv);

  // 计算模型视图坐标
  vec4 mvPosition = modelViewMatrix * vec4(updatePosition, 1.0);

  // 设置输出变量
  vPosition = updatePosition;
  vColor = rgb;

  // 设置最终顶点位置和点大小
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size;
}