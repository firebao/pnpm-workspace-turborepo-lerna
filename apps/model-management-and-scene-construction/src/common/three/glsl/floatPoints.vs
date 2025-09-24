// 定义输入变量
in vec3 position;
in float delay;
in float speed;

// 定义uniform变量
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;

// 定义输出变量
out vec3 vColor1;
out vec3 vColor2;
out float vOpacity;

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

const float duration = 3.0;

void main() {
  // 计算从0到1的间隔时间，用于动画效果
  float interval = mod(time + delay * duration, duration) / duration;

  // 更新点的大小和闪烁效果
  float size = 10.0 * sin(interval * 4.0);
  float blink = max(sin(interval * 4.0) * 2.0 - 1.0, 0.0);

  // 创建旋转矩阵，使点在3个轴上旋转
  mat4 rotateMat = calcRotateMat4(vec3(
    radians(time * speed * 0.3),
    radians(time * speed),
    radians(time * speed * 0.3)
  ));

  // 计算两种HSV颜色并转换为RGB
  vec3 hsv1 = vec3(time * 0.1, 0.6, 1.0);
  vec3 rgb1 = convertHsvToRgb(hsv1);
  vec3 hsv2 = vec3(time * 0.1 + 0.2, 0.6, 1.0);
  vec3 rgb2 = convertHsvToRgb(hsv2);

  // 坐标变换：应用模型视图矩阵和旋转矩阵
  vec4 mvPosition = modelViewMatrix * rotateMat * vec4(position, 1.0);

  // 计算与相机的距离，用于控制点大小和透明度
  float distanceFromCamera = 1000.0 / length(mvPosition.xyz);

  // 设置输出变量
  vColor1 = rgb1;
  vColor2 = rgb2;
  vOpacity = blink * clamp(distanceFromCamera, 0.1, 0.8);

  // 设置顶点位置和点大小
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = distanceFromCamera * size;
}
