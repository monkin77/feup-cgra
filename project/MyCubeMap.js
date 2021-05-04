import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyQuad } from './MyQuad.js';
/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
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

    updateTextures(newTextures){
        this.textures = newTextures;
    }

    initMaterials(scene){
        this.cubeMapMaterial = new CGFappearance(scene);
        this.cubeMapMaterial.setAmbient(0, 0, 0, 1);
        this.cubeMapMaterial.setDiffuse(0, 0, 0, 1);
        this.cubeMapMaterial.setSpecular(0, 0, 0, 1);
        this.cubeMapMaterial.setShininess(10.0);
        this.cubeMapMaterial.setEmission(1, 1, 1, 1);
        // this.cubeMapMaterial.setTexture(this.textures[0]);
        this.cubeMapMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    display(){
        // front
        this.scene.pushMatrix();  //push Identity Matrix

        var translateFront = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1
        ];

        this.cubeMapMaterial.setTexture(this.textures[5]);
        this.scene.multMatrix(translateFront);

        this.cubeMapMaterial.apply();

        this.myQuad.display();

        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();

        const rotate180Angle = 180 * Math.PI / 180;
        
        var rotateAroundY180 = [
            Math.cos(rotate180Angle), 0, -Math.sin(rotate180Angle), 0,
            0, 1, 0, 0,
            Math.sin(rotate180Angle), 0, Math.cos(rotate180Angle), 0,
            0, 0, 0, 1
        ];

        var translateBack = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.5, 1
        ];

        this.scene.multMatrix(translateBack);
        this.scene.multMatrix(rotateAroundY180);

        this.cubeMapMaterial.setTexture(this.textures[2]);
        this.cubeMapMaterial.apply();

        this.myQuad.display();

        this.scene.popMatrix();

        // RIGHT
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

        this.cubeMapMaterial.setTexture(this.textures[3]);
        this.cubeMapMaterial.apply();

        this.myQuad.display();

        this.scene.popMatrix();

        // LEFT
        this.scene.pushMatrix();


        var translateLeft = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.5, 0, 0, 1
        ]
        
        this.scene.multMatrix(translateLeft);
        this.scene.multMatrix(rotateAroundY180);        // To make normals point to the center of cube
        this.scene.multMatrix(RotateAroundY);

        this.cubeMapMaterial.setTexture(this.textures[0]);
        this.cubeMapMaterial.apply();

        this.myQuad.display();
        
        this.scene.popMatrix();   // reset to old matrix

        // Up
        this.scene.pushMatrix();

        var rotateAroundX180 = [
            1, 0, 0, 0,
            0, Math.cos(rotate180Angle), Math.sin(rotate180Angle), 0,
            0, -Math.sin(rotate180Angle), Math.cos(rotate180Angle), 0,
            0, 0, 0, 1
        ]

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
        this.scene.multMatrix(rotateAroundX180);
        this.scene.multMatrix(RotateAroundX);
        
        this.cubeMapMaterial.setTexture(this.textures[4]);
        this.cubeMapMaterial.apply();
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
        
        this.cubeMapMaterial.setTexture(this.textures[1]);
        this.cubeMapMaterial.apply();

        this.myQuad.display();

        this.scene.popMatrix();
    }
	
}

