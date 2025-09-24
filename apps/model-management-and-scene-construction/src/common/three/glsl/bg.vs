in vec3 position;
in vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

out vec3 vPosition;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vPosition = position;
  gl_Position = projectionMatrix * mvPosition;
}
