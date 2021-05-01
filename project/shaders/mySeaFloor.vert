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
	
	float heightMultiplier = heightMapColor.b * offset;

	vec4 position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	position += vec4(0, heightMultiplier, 0, 0);

	/*	
	if(heightMapColor.b > 0.49){
		position += vec4(0, offset * 0.5, 0, 0);
	} */

	gl_Position = position;

	vTextureCoord = aTextureCoord;    // send the varying texture coords
    vTextureCoord2 = aTextureCoord;
}


