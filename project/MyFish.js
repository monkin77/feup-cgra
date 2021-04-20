import { CGFobject, CGFappearance } from '../lib/CGF.js';
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
        this.initMaterials(scene);

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
    }

    initMaterials(scene){
        this.yellowMaterial = new CGFappearance(scene);
        this.yellowMaterial.setAmbient(0.2, 0.2, 0, 1.0);
        this.yellowMaterial.setDiffuse(0, 0, 0, 1.0);
        this.yellowMaterial.setSpecular(1.0, 1.0, 0, 1.0);
        this.yellowMaterial.setShininess(10.0);
    }

    display(){

        // Draw Body
        this.scene.pushMatrix();  //push Identity Matrix
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
    
        this.scene.multMatrix(translateRightEye);
        this.scene.multMatrix(scaleEye);
        this.yellowMaterial.apply();

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

        this.scene.multMatrix(translateBackEye);
        this.scene.multMatrix(scaleEye);
        this.leftEye.display();
        this.scene.popMatrix();

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
        
        this.yellowMaterial.apply();
        this.tail.display();
        this.scene.popMatrix();

        // Draw Right Fin
        this.scene.pushMatrix();

        let scaleFin = [
            0.5, 0, 0, 0,
            0, 0.5, 0, 0,
            0, 0, 0.5, 0,
            0, 0, 0, 1
        ]

        rotateAngle = Math.PI * 45 / 180;

        let rotateFinAroundX = [
            1, 0, 0, 0,
            0, Math.cos(rotateAngle), Math.sin(rotateAngle), 0,
            0, -Math.sin(rotateAngle), Math.cos(rotateAngle), 0,
            0, 0, 0, 1
        ]

        rotateAngle = Math.PI * 20 / 180;

        let rotateFinAroundZ = [
            Math.cos(rotateAngle), Math.sin(rotateAngle), 0, 0,
            -Math.sin(rotateAngle), Math.cos(rotateAngle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        let translateRightFin = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5*Math.cos(rotateAngle), -yScaleBody, 0, 1
        ]

        this.scene.multMatrix(translateRightFin);
        this.scene.multMatrix(scaleFin);
        this.scene.multMatrix(rotateFinAroundX);
        this.scene.multMatrix(rotateFinAroundZ);
        this.scene.multMatrix(rotateAroundY);
        this.scene.multMatrix(rotateAroundZ);

        this.yellowMaterial.apply();
        this.rightFin.display();
        

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