#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vertixCoords;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	if(abs(vertixCoords.x) >= 0.8){		
		gl_FragColor = vec4(0, 0, 0, 1);
	} 
	else{
		gl_FragColor = vec4(1, 1, 1, 1);
	}
}


