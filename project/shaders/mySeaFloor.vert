attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float offset;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

uniform sampler2D uSampler2;

void main() {
	vec4 heightMapColor = texture2D(uSampler2, aTextureCoord); 
	vec3 heightMultiplier = aVertexNormal * heightMapColor.r * 0.1;

	vec4 position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	
	if(heightMapColor.b > 0.49){
		position += offset * 0.25;
	}

	gl_Position = position;

	vTextureCoord = aTextureCoord;    // send the varying texture coords
    vTextureCoord2 = aTextureCoord;
}

