#ifdef GL_ES
precision highp float;
#endif

varying vec4 vertixCoords;
uniform sampler2D uSampler;

void main() {
    vec4 color;
    if(vertixCoords.y >= 0.5){
        color = vec4(1, 1, 0, 1);  // output fragment color
    }
    else{
        color = vec4(0, 0, 1, 1);  // output fragment color
    }

    vec4 basedOnSepia;

	basedOnSepia.r = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	basedOnSepia.g = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	basedOnSepia.b = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
    basedOnSepia.a = 1.0;

	gl_FragColor = basedOnSepia;
}