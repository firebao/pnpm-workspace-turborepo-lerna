// 定义输入变量, 来自顶点着色器
in vec3 position;
in vec2 uv;
in vec3 instancePosition;
in float delay;
in float h;

// 定义uniform变量
uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

// 定义输出变量
out vec3 vPosition;
out vec2 vUv;
out float vDelay;
out vec3 vColor;

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

void main(void) {
  // 更新顶点位置：将原始位置与实例位置相加
  vec3 updatePosition = position + instancePosition;
  // 创建旋转矩阵：绕X轴旋转90度，绕Z轴旋转180度
  mat4 rotateMat = calcRotateMat4(vec3(radians(90.0), 0.0, radians(180.0)));

  // 计算HSV颜色值, h是基础色相, 随时间变化
  vec3 hsv = vec3(h + time * 0.1, 0.35, 0.6);
  vec3 rgb = convertHsvToRgb(hsv);

  // 应用旋转矩阵，再应用模型视图矩阵
  vec4 mvPosition = modelViewMatrix * rotateMat * vec4(updatePosition, 1.0);

  // 设置输出变量
  vPosition = position;
  vUv = uv;
  vDelay = delay;
  vColor = rgb;

  gl_Position = projectionMatrix * mvPosition;
}
