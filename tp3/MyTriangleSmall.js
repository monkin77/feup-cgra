import {CGFobject} from "../lib/CGF.js";

export class MyTriangleSmall extends CGFobject{
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            -1, 0, 0,   //0
            0, 1, 0,    //1
            1, 0, 0     //2
        ]

        //Counter-clockwise reference of vertices
        this.indices = [            // Draw the parallelogram in both directions 
            0, 2, 1,
            1, 2, 0,
        ]

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}