#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vertixCoords;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	/*
	if(vertixCoords.z >= 0.6){
		color = vec4(1, 0, 0, 1);
	} */
	if(vertixCoords.z >= 25.5){		/* Why are the vertixCoords around this value??	*/
		gl_FragColor = vec4(1, 0, 0, 1);
	} 
	else{
		gl_FragColor = vec4(0, 1, 0, 1);
	}
	// gl_FragColor = color;
}


