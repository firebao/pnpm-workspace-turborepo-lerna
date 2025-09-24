precision highp float;

// 定义输入变量, 来自顶点着色器
in vec3 vColor;

// 定义输出变量
out vec4 fragColor;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float radius = length(p);
  float r = 1.0 - smoothstep(0.95, 1.0, radius);

  fragColor = vec4(vColor, r * 0.1);
}
