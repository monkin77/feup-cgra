import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices) {
		super(scene);
        this.slices = slices;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAngInc = 2*Math.PI/this.slices;   // angle increment for each step
        var texCoordIncrement = 1.0 / this.slices;

        // BOTTOM BASE
        for(var i = 0; i <= this.slices; i++){
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));       // drawing anti-clockwise direction
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));        // INVESTIGATE THE NORMALS !!
            this.texCoords.push(texCoordIncrement*i, 1.0);
            ang+=alphaAngInc;
        }

        // TOP BASE
        ang = 0;
        for(var i = 0; i <= this.slices; i++){
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));       // add vertix
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));    // INVESTIGATE THE NORMALS !!
            this.texCoords.push(texCoordIncrement*i, 0.0);
            ang+=alphaAngInc;
        }

        var offset = this.slices + 1;
        for(var i = 0; i < this.slices; i++){   // connect the bottom and top base
            // this.indices.push(i, (i+1) % this.slices, i + offset);
            // this.indices.push(i, i + offset, (i + offset - 1) < offset ? offset * 2 - 2 : (i + offset - 1));     // need to check the case where the vertix before is from the bottom base (3rd arg)
            this.indices.push(i, i + 1, i + offset + 1);
            this.indices.push(i, i + offset + 1, i + offset);
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

