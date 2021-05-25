import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
    constructor(scene, bodyShader, bodyTexture){
        super(scene);
        this.init(scene);
        this.initTextures(scene, bodyTexture);
        this.initMaterials(scene);
        this.initShaders(scene, bodyShader);
    }

    init(scene){
        this.body = new MySphere(scene, 32, 16);
        this.rightEye = new MySphere(scene, 32, 16);
        this.leftEye = new MySphere(scene, 32, 16);
        this.tail = new MyTriangleSmall(scene);
        this.rightFin = new MyTriangleSmall(scene);
        this.leftFin = new MyTriangleSmall(scene);
        this.dorsalFin = new MyTriangleSmall(scene);

        this.tailInclination = 0;
        this.maxTailInclination = 35 * Math.PI / 180;
        
        this.defaultTailIncrement = (this.maxTailInclination / 20) * 4;    // 20 -> refresh rate | 4 -> number of moves per second
        this.tailIncrement = this.defaultTailIncrement;

        this.finsInclination = 0;
        this.maxFinsInclination = 20 * Math.PI / 180;
        this.finsIncrement = (this.maxFinsInclination / 20) * 3;    // 20 -> refresh rate | 4 -> number of moves per second
    }

    initTextures(scene, bodyTexture){
        this.bodyTexture = bodyTexture;
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

    initShaders(scene, bodyShader) {
        this.bodyShader = bodyShader;
        this.eyeShader = new CGFshader(this.scene.gl, "shaders/fishEyeShader.vert", "shaders/fishEyeShader.frag");
    }

    update = (speed = 0) => {

        let prevIncrement = this.tailIncrement;

        this.tailIncrement = 2 * speed * Math.PI / 180 + this.defaultTailIncrement;
        
        if (prevIncrement < 0) this.tailIncrement *= -1;

        if(Math.abs(this.tailInclination + this.tailIncrement) > this.maxTailInclination){
            this.tailIncrement *= -1;
        }

        if(Math.abs(this.finsInclination + this.finsIncrement) > this.maxFinsInclination){
            this.finsIncrement *= -1;
        }

        this.tailInclination += this.tailIncrement;
        this.finsInclination += this.finsIncrement;
    }

    display(turningRight = false, turningLeft = false) {
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
        ];

        rotateEyeAroundY = [
            Math.cos(rotateEyeAngle), 0, -Math.sin(rotateEyeAngle), 0,
            0, 1, 0, 0,
            Math.sin(rotateEyeAngle), 0, Math.cos(rotateEyeAngle), 0,
            0, 0, 0, 1
        ];

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
        ];

        let rotateAroundY = [
            Math.cos(rotateAngle), 0, -Math.sin(rotateAngle), 0,
            0, 1, 0, 0,
            Math.sin(rotateAngle), 0, Math.cos(rotateAngle), 0,
            0, 0, 0, 1
        ];

        let translateTail = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -1, 1
        ];
        
        let scaleTail = [
            1, 0, 0, 0,
            0, yScaleBody, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        let rotateTailAnimation = [
            Math.cos(this.tailInclination), 0, -Math.sin(this.tailInclination), 0,
            0, 1, 0, 0,
            Math.sin(this.tailInclination), 0, Math.cos(this.tailInclination), 0,
            0, 0, 0, 1
        ];

        let translateTailToOrigin = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -1, 1,
        ];
        
        
        this.scene.multMatrix(scaleTail);   // 6
        this.scene.multMatrix(translateTail);   // 5 
        this.scene.multMatrix(rotateTailAnimation);     // 4
        this.scene.multMatrix(translateTailToOrigin);   // 3
        this.scene.multMatrix(rotateAroundY);   // 2
        this.scene.multMatrix(rotateAroundZ);   // 1

        
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

        let rotateFinAnimation = [
            Math.cos(this.finsInclination), Math.sin(this.finsInclination), 0, 0,
            -Math.sin(this.finsInclination), Math.cos(this.finsInclination), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        let translateFinToOrigin = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            Math.sin(rotateAroundZAngle), - Math.cos(rotateAroundZAngle) * Math.cos(rotateAroundXAngle), -Math.sin(rotateAroundXAngle), 1,
        ];

        let invertTranlationToOrigin = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sin(rotateAroundZAngle), Math.cos(rotateAroundZAngle) * Math.cos(rotateAroundXAngle), Math.sin(rotateAroundXAngle), 1,
        ];

        this.scene.multMatrix(translateRightFin);
        this.scene.multMatrix(scaleFin);
        this.scene.multMatrix(invertTranlationToOrigin);
        
        if (!turningRight) this.scene.multMatrix(rotateFinAnimation);
        
        this.scene.multMatrix(translateFinToOrigin);
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

        rotateFinAnimation = [
            Math.cos(this.finsInclination), Math.sin(this.finsInclination), 0, 0,
            -Math.sin(this.finsInclination), Math.cos(this.finsInclination), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        this.scene.multMatrix(scaleFinToInvert);
        this.scene.multMatrix(translateRightFin);
        this.scene.multMatrix(scaleFin);
        this.scene.multMatrix(invertTranlationToOrigin);
        
        if (!turningLeft) this.scene.multMatrix(rotateFinAnimation);
        
        this.scene.multMatrix(translateFinToOrigin);
        this.scene.multMatrix(rotateFinAroundX);
        this.scene.multMatrix(rotateFinAroundZ);
        this.scene.multMatrix(rotateAroundY);
        this.scene.multMatrix(rotateAroundZ);

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

}