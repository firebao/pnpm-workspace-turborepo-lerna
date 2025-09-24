in vec3 position;
in vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

out vec3 vPosition;
out vec2 vUv;

void main(void) {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * mvPosition;
}
