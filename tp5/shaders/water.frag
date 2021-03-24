#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter1 = texture2D(uSampler2, vTextureCoord2);


	color = color - vec4(0.2*filter1.b, 0.2*filter1.b, 0.2*filter1.b, 0);
	
        
	gl_FragColor = color;
}