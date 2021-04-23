#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vertixCoords;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	if(vertixCoords.z >= 0.2){		/* Why are the vertixCoords around this value??	*/
		gl_FragColor = vec4(0.7, 0, 0, 1);
	} 
	else{
		gl_FragColor = vec4(color.x*0.6, color.y*0.6, color.z*0.6, 1);
	}
}


