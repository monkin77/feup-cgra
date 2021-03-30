import {CGFobject} from '../lib/CGF.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();

        this.speed = 0.0;
        this.position = [0.0, 0.0, 0.0];
        this.orientation = 0.0;
    }

    initBuffers(){
        this.vertices = [
            0.5, 0, -0.5,       // 0
            -0.5, 0, -0.5,      // 1
            0, 0, 0.5           // 2
        ]
        
        this.vertices = this.vertices.concat(this.vertices);

        //Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,            // only painted in one side
            5, 4, 3
		];

        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ]

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    update(){
        let directionVector = [0.0, 0.0, 0.0];

        directionVector[0] = Math.sin(this.orientation) * this.speed;
        directionVector[2] = Math.cos(this.orientation) * this.speed;

        this.position[0] = this.position[0] + directionVector[0];
        this.position[1] = this.position[1] + directionVector[1];
        this.position[2] = this.position[2] + directionVector[2];
    }
}