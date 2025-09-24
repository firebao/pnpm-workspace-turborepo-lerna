precision highp float;

in vec3 vPosition;

uniform float time;

out vec4 fragColor;

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


void main() {
  vec3 hsv = vec3(time * 0.1 + 0.5, 1.0, (1.0 - abs(vPosition.y / 10000.0)) * 0.08);
  vec3 rgb = convertHsvToRgb(hsv);
  fragColor = vec4(rgb, 1.0);
}
