import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init(scene);
	}
	
    init(scene){
        //Initialize scene objects
        this.myQuad = new MyQuad(scene);
    }

    display(){
        this.scene.pushMatrix();  //push Identity Matrix

        var translateFront = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1
        ];

        this.scene.multMatrix(translateFront);

        this.myQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        var translateBack = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.5, 1
        ];

        this.scene.multMatrix(translateBack);

        this.myQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        const angleOfRotation = 90 * Math.PI / 180;

        var RotateAroundY = [
            Math.cos(angleOfRotation), 0, -Math.sin(angleOfRotation), 0,
            0, 1, 0, 0,
            Math.sin(angleOfRotation), 0, Math.cos(angleOfRotation), 0,
            0, 0, 0, 1
        ];

        var translateRight = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, 0, 0, 1
        ]

        this.scene.multMatrix(translateRight);
        this.scene.multMatrix(RotateAroundY);

        this.myQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        var translateLeft = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.5, 0, 0, 1
        ]
        
        this.scene.multMatrix(translateLeft);
        this.scene.multMatrix(RotateAroundY);

        this.myQuad.display();
        
        this.scene.popMatrix();   //reset to old matrix

        this.scene.pushMatrix();

        var RotateAroundX = [
            1, 0, 0, 0,
            0, Math.cos(angleOfRotation), Math.sin(angleOfRotation), 0,
            0, -Math.sin(angleOfRotation), Math.cos(angleOfRotation), 0,
            0, 0, 0, 1
        ];

        var translateUp = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0.5, 0, 1
        ];

        this.scene.multMatrix(translateUp);
        this.scene.multMatrix(RotateAroundX);

        this.myQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        var translateDown = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -0.5, 0, 1
        ];

        this.scene.multMatrix(translateDown);
        this.scene.multMatrix(RotateAroundX);

        this.myQuad.display();

        this.scene.popMatrix();
    }
	
}

