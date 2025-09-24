precision highp float;

// 定义输入变量, 来自顶点着色器
in vec3 vPosition;
in vec3 vColor;

// 定义uniform变量
uniform float time;

// 定义输出变量
out vec4 fragColor;

void main() {
  vec3 light = normalize(vec3(0.0, 1.0, 1.0));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float diff = pow((dot(normal, light) + 1.0) / 2.0, 10.0);
  fragColor = vec4(vColor, diff * 0.4 + 0.03);
}