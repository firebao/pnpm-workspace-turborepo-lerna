precision highp float;

// 定义输入变量, 来自顶点着色器
in vec3 vPosition;
in vec2 vUv;
in vec3 vColor;
in float vRotate1;
in float vRotate2;
in float vRotate3;

// 定义uniform变量
uniform float time;                           // 时间参数
uniform sampler2D texture1;                   // 纹理1
uniform sampler2D texture2;                   // 纹理2
uniform sampler2D texture3;                   // 纹理3

// 定义输出变量
out vec4 fragColor;

/**
 * @description 旋转矩阵
 * @param radian 旋转弧度
 */
mat3 rotateMat3(float radian) {
  return mat3(
    cos(radian), -sin(radian), 0.0,
    sin(radian), cos(radian), 0.0,
    0.0, 0.0, 1.0
  );
}

void main() {
  // 旋转纹理坐标: 将UV坐标中心移到（0， 0）, 应用旋转矩阵，再移回（0.5， 0.5）
  vec2 uv1 = ((vec3(vUv - 0.5, 1.0) * rotateMat3(time * vRotate1)).xy + 0.5);
  vec2 uv2 = ((vec3(vUv - 0.5, 1.0) * rotateMat3(time * vRotate2)).xy + 0.5);
  vec2 uv3 = ((vec3(vUv - 0.5, 1.0) * rotateMat3(time * vRotate3)).xy + 0.5);

  // 从三个纹理采样颜色
  vec4 texColor1 = texture(texture1, uv1);
  vec4 texColor2 = texture(texture2, uv2);
  vec4 texColor3 = texture(texture3, uv3);

  // 混合三个纹理颜色
  vec4 color = texColor1 + texColor2 + texColor3;

  // 丢弃透明度低的像素
  if (color.a <= 0.1) discard;

  // 设置最终片段颜色：使用顶点颜色vColor, 但保留混合纹理的透明底并乘以0.35
  fragColor = vec4(vColor, color.a * 0.35);
}
