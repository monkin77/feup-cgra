attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float offset;
varying vec2 vTextureCoord;

uniform sampler2D uSampler2;

void main() {
    //vec2 manipulatedTexCoord = aTextureCoord + abs(sin(0.01 * timeFactor));
    vec2 manipulatedTexCoord = aTextureCoord + 0.0001*vec2(offset, offset);
    if(manipulatedTexCoord[0] > 1.0){
        manipulatedTexCoord[0] -= 1.0;
    }
    if(manipulatedTexCoord[1] > 1.0){
        manipulatedTexCoord[1] -= 1.0;
    }

    vec4 waterMapColor = texture2D(uSampler2, manipulatedTexCoord); 
    vec3 heightMultiplier = aVertexNormal * waterMapColor.b * 0.05;
    
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + heightMultiplier, 1.0);

	vTextureCoord = aTextureCoord;
}

