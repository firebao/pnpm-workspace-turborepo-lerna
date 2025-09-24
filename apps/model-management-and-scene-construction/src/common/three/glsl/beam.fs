precision highp float;

// 定义输入变量，来自顶点着色器
in vec3 vPosition;
in vec2 vUv;
in float vDelay;
in vec3 vColor;

// 定义uniform变量
uniform float time;

// 定义输出变量
out vec4 fragColor;

// 定义动画持续时间为10秒
const float duration = 10.0;

void main() {
  // 计算归一化的当前时间
  float now = mod(time + vDelay * duration, duration) / duration;

  // 计算两端透明度（基于Y坐标）
  float opacityBothEnds = smoothstep(-2000.0, -1800.0, vPosition.y) * (1.0 - smoothstep(1800.0, 2000.0, vPosition.y));

  // 计算基于UV和时间变化的透明度
  float opacity = smoothstep(0.85, 1.0, mod(vUv.y - now, 1.0));

  fragColor = vec4(vColor, opacity * opacityBothEnds * 0.08);
}
