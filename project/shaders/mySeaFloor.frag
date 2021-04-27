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

	color = color /*- 0.5*vec4(1.0 - filter1.r, 1.0 - filter1.g, 1.0 - filter1.b, 0)*/;	
	if(filter1.r < 0.5){
		color -=  vec4(0.3, 0.3, 0.3, 0);
	}

	gl_FragColor = color;
}