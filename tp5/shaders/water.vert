attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;

void main() {
    vec4 waterMapColor = texture2D(uSampler2, aTextureCoord); 
    vec3 heightMultiplier = aVertexNormal * waterMapColor.b * 0.075;
    
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + heightMultiplier, 1.0);

	vTextureCoord = aTextureCoord;
}

