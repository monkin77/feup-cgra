attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float offset;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec2 manipulatedTexCoord = mod( (aTextureCoord + vec2(0.00002*offset, 0.00002*offset)) / 2.0, vec2(1.0, 1.0) );

    float offsetR = texture2D(uSampler2, manipulatedTexCoord).r - 0.5;
    float offsetG = texture2D(uSampler2, manipulatedTexCoord).g - 0.5;

	vec4 position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	gl_Position = position;

    
    if (aTextureCoord.s + offsetR < 0.0 || aTextureCoord.s + offsetR > 1.0 ) {
        offsetR = 0.0;
    } 
    if (aTextureCoord.t + offsetG < 0.0 || aTextureCoord.t + offsetG > 1.0) {
        offsetG = 0.0;
    }
    vTextureCoord = vec2(aTextureCoord.s + offsetR, aTextureCoord.t + offsetG);
    
    vTextureCoord2 = aTextureCoord;
}

