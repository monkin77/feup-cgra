
import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, textures) {
		super(scene);
		this.init(scene, textures);
	}
	
    init(scene, textures){
        //Initialize scene objects
        this.textures = textures;
        this.myQuad = new MyQuad(scene);
        this.initMaterials(scene);
    }

    initMaterials(scene){
        this.mineSideMaterial = new CGFappearance(scene);
        this.mineSideMaterial.setAmbient(1, 1, 1, 1);
        this.mineSideMaterial.setDiffuse(1, 1, 1, 1);
        this.mineSideMaterial.setSpecular(0, 0, 0, 1);
        this.mineSideMaterial.setShininess(10.0);
        this.mineSideMaterial.setTexture(this.textures[1]);
        this.mineSideMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.mineTopMaterial = new CGFappearance(scene);
        this.mineTopMaterial.setAmbient(1, 1, 1, 1);
        this.mineTopMaterial.setDiffuse(1, 1, 1, 1);
        this.mineTopMaterial.setSpecular(0, 0, 0, 1);
        this.mineTopMaterial.setShininess(10.0);
        this.mineTopMaterial.setTexture(this.textures[0]);
        this.mineTopMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.mineBottomMaterial = new CGFappearance(scene);
        this.mineBottomMaterial.setAmbient(1, 1, 1, 1);
        this.mineBottomMaterial.setDiffuse(1, 1, 1, 1);
        this.mineBottomMaterial.setSpecular(0, 0, 0, 1);
        this.mineBottomMaterial.setShininess(10.0);
        this.mineBottomMaterial.setTexture(this.textures[2]);
        this.mineBottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        //front
        this.scene.pushMatrix();  //push Identity Matrix
        var translateFront = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1
        ];

        this.scene.multMatrix(translateFront);

        this.mineSideMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();

        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();

        var translateBack = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.5, 1
        ];

        this.scene.multMatrix(translateBack);

        //this.mineSideMaterial.apply();
        this.myQuad.display();

        this.scene.popMatrix();

        //Right
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

        //this.mineSideMaterial.apply();
        this.myQuad.display();

        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();

        var translateLeft = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.5, 0, 0, 1
        ]
        
        this.scene.multMatrix(translateLeft);
        this.scene.multMatrix(RotateAroundY);

        //this.mineSideMaterial.apply();
        this.myQuad.display();
        
        this.scene.popMatrix();   //reset to old matrix

        //Up
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

        this.mineTopMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();

        this.scene.popMatrix();

        //down
        this.scene.pushMatrix();

        var translateDown = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -0.5, 0, 1
        ];

        this.scene.multMatrix(translateDown);
        this.scene.multMatrix(RotateAroundX);

        this.mineBottomMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();

        this.scene.popMatrix();
    }
	
}

