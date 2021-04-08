attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix; // Model-View matrix (Related to the scene and camera position)
uniform mat4 uPMatrix;  // projection matrix (Related to camera frustum)
uniform mat4 uNMatrix;

varying vec4 vertixCoords;

uniform float timeFactor;
uniform float normScale;

void main() {
    vec3 offset = vec3(0.0,0.0,0.0);

    offset = vec3(1, 0, 0) * normScale*0.5*sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vertixCoords = gl_Position;
}