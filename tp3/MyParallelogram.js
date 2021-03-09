import {CGFobject} from "../lib/CGF.js";

export class MyParallelogram extends CGFobject{
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            0, 0, 0,    //0
            2, 0, 0,    //1
            1, 1, 0,    //2
            3, 1, 0     //3
        ]

        this.vertices = this.vertices.concat(this.vertices);

        //Counter-clockwise reference of vertices
        this.indices = [            // Draw the parallelogram in both directions 
            0, 2, 1,
            1, 2, 3,
            7, 6, 5,
            5, 6, 4,
        ]

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ]


        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}