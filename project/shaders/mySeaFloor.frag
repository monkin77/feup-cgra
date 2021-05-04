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

	/* Since the colorHeightMap values don't go higher than 0.6, we can use it as the upper bound in order augment the contrast	*/
	if(filter1.r <= 0.6){
		color = color - 1.0*vec4(0.6 - filter1.r, 0.6 - filter1.r, 0.6 - filter1.r, 0);	
	}

	gl_FragColor = color;
}