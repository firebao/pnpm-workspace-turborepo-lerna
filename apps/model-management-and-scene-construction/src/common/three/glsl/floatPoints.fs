precision highp float;

// 定义输入变量, 来自顶点着色器
in vec3 vColor1;
in vec3 vColor2;
in float vOpacity;

// 定义uniform变量
uniform sampler2D texture;

// 定义输出变量
out vec4 fragColor;

void main() {
  // 将PointCoord从[0,1]范围转换到[-1,1]范围
  vec2 p = gl_PointCoord * 2.0 - 1.0;

  // 计算当前点到中心的距离
  float radius = length(p);

  // 计算外圆环(0.95-1.0范围)的透明度过渡
  float r1 = (1.0 - smoothstep(0.95, 1.0, radius));

  // 计算内圆环(0.45-0.5范围)的透明度过渡
  float r2 = (1.0 - smoothstep(0.45, 0.5, radius));

  // 计算外圆环颜色(使用vColor1)
  vec3 color1 = vColor1 * (r1 - r2);

  // 计算内圆环颜色(使用vColor2)
  vec3 color2 = vColor2 * r2;

  // 混合两种颜色
  vec3 color = color1 + color2;

  // 计算最终透明度(外环0.25透明度，内环0.5透明度)
  float opacity = ((r1 - r2) * 0.25 + r2 * 0.5) * vOpacity;

  // 输出最终颜色
  fragColor = vec4(color, opacity);
}
