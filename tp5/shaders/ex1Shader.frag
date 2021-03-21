#ifdef GL_ES
precision highp float;
#endif

varying vec4 vertixCoords;
uniform sampler2D uSampler;

void main() {
    if(vertixCoords.y >= 0.5){
        gl_FragColor = vec4(1, 1, 0, 1);  // output fragment color
    }
    else{
        gl_FragColor = vec4(0, 0, 1, 1);  // output fragment color
    }
}