import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
    constructor(scene){
        super(scene);
        this.init(scene);
        this.initTextures(scene);
        this.initMaterials(scene);
        this.initShaders(scene);

        this.speed = 0.0;
        this.speedFactor = 1.0;
        this.position = [0.0, 0.0, 0.0];
        this.orientation = 0.0;
    }

    init(scene){
        this.body = new MySphere(scene, 32, 16);
        this.rightEye = new MySphere(scene, 32, 16);
        this.leftEye = new MySphere(scene, 32, 16);
        this.tail = new MyTriangleSmall(scene);
        this.rightFin = new MyTriangleSmall(scene);
        this.leftFin = new MyTriangleSmall(scene);
        this.dorsalFin = new MyTriangleSmall(scene);
        console.log("scene: ", this.scene);
    }

    initTextures(scene){
        this.bodyTexture = new CGFtexture(scene, 'images/fish_img/fishScales1.jpg');
    }

    initMaterials(scene){
        this.eyeTexture = new CGFtexture(scene, 'images/earth.jpg');

        this.eyeMaterial = new CGFappearance(scene);
        this.eyeMaterial.setAmbient(1, 1, 1, 1.0);
        this.eyeMaterial.setDiffuse(1, 1, 1, 1.0);
        this.eyeMaterial.setSpecular(0, 0, 0, 1.0);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.setTexture(this.eyeTexture);
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.redMaterial = new CGFappearance(scene);
        this.redMaterial.setAmbient(1, 0, 0, 1.0);
        this.redMaterial.setDiffuse(0.7, 0, 0, 1.0);
        this.redMaterial.setSpecular(0, 0, 0, 1.0);
        this.redMaterial.setShininess(10.0);

        this.bodyMaterial = new CGFappearance(scene);
        this.bodyMaterial.setAmbient(0.7, 0.7, 0.7, 1.0);
        this.bodyMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.bodyMaterial.setSpecular(0, 0, 0, 1.0);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.setTexture(this.bodyTexture);
    }

    initShaders(scene){
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fishBodyShader.vert", "shaders/fishBodyShader.frag");
        this.eyeShader = new CGFshader(this.scene.gl, "shaders/fishEyeShader.vert", "shaders/fishEyeShader.frag");
    }

    display(){
        // Draw Body
        this.scene.pushMatrix();  //push Identity Matrix

        this.bodyMaterial.apply();
        this.scene.setActiveShader(this.bodyShader);
        
        let xScaleBody = 0.6;
        let yScaleBody = 0.8;

        let scaleBody = [
            xScaleBody, 0, 0, 0,
            0, yScaleBody, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]
        
        this.scene.multMatrix(scaleBody);

        this.body.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.eyeShader);   // reset to default shader

        // Draw Right Eye
        this.scene.pushMatrix();
        
        let scaleEye = [
            0.15, 0, 0, 0,
            0, 0.15, 0, 0,
            0, 0, 0.15, 0,
            0, 0, 0, 1,
        ]

        let rotateAngle = Math.PI*10 / 180;
        let ellipseCompensation = xScaleBody / yScaleBody; 

        let translateRightEye = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            Math.cos(rotateAngle)*xScaleBody*ellipseCompensation, Math.sin(rotateAngle)*yScaleBody*ellipseCompensation, 0.5, 1,
        ]

        let rotateEyeAngle = Math.PI*25 / 180;
        let rotateEyeAroundY = [
            Math.cos(-rotateEyeAngle), 0, -Math.sin(-rotateEyeAngle), 0,
            0, 1, 0, 0,
            Math.sin(-rotateEyeAngle), 0, Math.cos(-rotateEyeAngle), 0,
            0, 0, 0, 1
        ]
    
        this.scene.multMatrix(translateRightEye);
        this.scene.multMatrix(scaleEye);
        this.scene.multMatrix(rotateEyeAroundY);    // rotate the eye slightly to the front (fish looks to the front)

        this.eyeMaterial.apply();

        this.rightEye.display();
        this.scene.popMatrix();

        // Draw Left eye
        this.scene.pushMatrix();

        let translateBackEye = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.cos(rotateAngle)*xScaleBody*ellipseCompensation, Math.sin(rotateAngle)*yScaleBody*ellipseCompensation, 0.5, 1,
        ]

        rotateEyeAroundY = [
            Math.cos(rotateEyeAngle), 0, -Math.sin(rotateEyeAngle), 0,
            0, 1, 0, 0,
            Math.sin(rotateEyeAngle), 0, Math.cos(rotateEyeAngle), 0,
            0, 0, 0, 1
        ]

        this.scene.multMatrix(translateBackEye);
        this.scene.multMatrix(scaleEye);
        this.scene.multMatrix(rotateEyeAroundY);

        this.eyeMaterial.apply();
        this.leftEye.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        // Draw Tail
        this.scene.pushMatrix();
        
        rotateAngle = Math.PI * 90 / 180;
        
        let rotateAroundZ = [
            Math.cos(rotateAngle), Math.sin(rotateAngle), 0, 0,
            -Math.sin(rotateAngle), Math.cos(rotateAngle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        let rotateAroundY = [
            Math.cos(rotateAngle), 0, -Math.sin(rotateAngle), 0,
            0, 1, 0, 0,
            Math.sin(rotateAngle), 0, Math.cos(rotateAngle), 0,
            0, 0, 0, 1
        ]

        let translateTail = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -2, 1
        ]
        
        let scaleTail = [
            1, 0, 0, 0,
            0, yScaleBody, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]
        
        this.scene.multMatrix(scaleTail);
        this.scene.multMatrix(translateTail);
        this.scene.multMatrix(rotateAroundY);
        this.scene.multMatrix(rotateAroundZ);
        
        this.redMaterial.apply();
        this.tail.display();
        this.scene.popMatrix();

        // Draw Right Fin
        this.scene.pushMatrix();

        let finScaleFator = 0.5;
        let triangleSmallSideLength = finScaleFator *  Math.sqrt(2) / 2;   // the smallTriangle is isosceles
        let triangleSmallHypotenuse = finScaleFator *2;

        let scaleFin = [
            finScaleFator, 0, 0, 0,
            0, finScaleFator, 0, 0,
            0, 0, finScaleFator, 0,
            0, 0, 0, 1
        ]

        let rotateAroundXAngle = Math.PI * 45 / 180;

        let rotateFinAroundX = [
            1, 0, 0, 0,
            0, Math.cos(rotateAroundXAngle), Math.sin(rotateAroundXAngle), 0,
            0, -Math.sin(rotateAroundXAngle), Math.cos(rotateAroundXAngle), 0,
            0, 0, 0, 1
        ]

        let rotateAroundZAngle = Math.PI * 25 / 180;

        let rotateFinAroundZ = [
            Math.cos(rotateAroundZAngle), Math.sin(rotateAroundZAngle), 0, 0,
            -Math.sin(rotateAroundZAngle), Math.cos(rotateAroundZAngle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        let translateRightFin = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.6 + triangleSmallSideLength  * Math.cos(Math.PI/2 - rotateAroundZAngle), - ( 0.1 +  triangleSmallHypotenuse * Math.cos(rotateAroundXAngle) / 2), 0, 1
        ]

        this.scene.multMatrix(translateRightFin);
        this.scene.multMatrix(scaleFin);
        this.scene.multMatrix(rotateFinAroundX);
        this.scene.multMatrix(rotateFinAroundZ);
        this.scene.multMatrix(rotateAroundY);
        this.scene.multMatrix(rotateAroundZ);

        this.redMaterial.apply();
        this.rightFin.display();
        
        this.scene.popMatrix();

        // Draw left fin
        this.scene.pushMatrix();

        let scaleFinToInvert = [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        this.scene.multMatrix(scaleFinToInvert);
        this.scene.multMatrix(translateRightFin);
        this.scene.multMatrix(scaleFin);
        this.scene.multMatrix(rotateFinAroundX);
        this.scene.multMatrix(rotateFinAroundZ);
        this.scene.multMatrix(rotateAroundY);
        this.scene.multMatrix(rotateAroundZ);

        this.redMaterial.apply();
        this.leftFin.display();

        this.scene.popMatrix();

        // Draw Dorsal Fin
        this.scene.pushMatrix();


        let translateDorsalFin = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, yScaleBody - 0.05, -finScaleFator / 2, 1
        ]

        this.scene.multMatrix(translateDorsalFin);
        this.scene.multMatrix(scaleFin);
        this.scene.multMatrix(rotateAroundY);
        this.scene.multMatrix(rotateAroundZ);
        
        this.redMaterial.apply();
        this.dorsalFin.display();
        this.scene.popMatrix();
    }

    update(){        
        let directionVector = [0.0, 0.0, 0.0];

        directionVector[0] = Math.sin(this.orientation) * this.speed * this.speedFactor;
        directionVector[2] = Math.cos(this.orientation) * this.speed * this.speedFactor;

        this.position[0] = this.position[0] + directionVector[0];
        this.position[1] = this.position[1] + directionVector[1];
        this.position[2] = this.position[2] + directionVector[2];
    }
}