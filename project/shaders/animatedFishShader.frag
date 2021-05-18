#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vertixCoords;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	if(vertixCoords.z >= 0.2){		// -1<=z<=1, logo 40% do peixe é a partir de z = 0.2
		gl_FragColor = vec4(0, 0.5, 0.6, 1);
	} 
	else{
		gl_FragColor = vec4(color.x*0.6, color.y*0.6, color.z*0.6, 1);
	}
}


