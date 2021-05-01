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
    //vec2 manipulatedTexCoord = aTextureCoord + 0.0001*vec2(offset, offset);
    vec2 manipulatedTexCoord = mod( (aTextureCoord + vec2(0.0001*offset, 0.0001*offset)) / 2.0, vec2(1.0, 1.0) );
    
    aTextureCoord = manipulatedTexCoord;
    vec4 waterMapColor = texture2D(uSampler2, manipulatedTexCoord); 
    vec3 heightMultiplier = aVertexNormal * waterMapColor.b * 0.06;
    
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + heightMultiplier, 1.0);

	vTextureCoord = aTextureCoord;    // send the varying texture coords
    vTextureCoord2 = manipulatedTexCoord;
}

