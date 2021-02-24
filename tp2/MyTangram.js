import {CGFobject} from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject{
    constructor(scene){
        super(scene);
        this.init(scene);
    }

    init(scene){
        //Initialize scene objects
        this.greenDiamond = new MyDiamond(scene);
        this.pinkTriangle = new MyTriangleSmall(scene);
        this.orangeTriangle = new MyTriangleSmall(scene);
        this.blueTriangle = new MyTriangleSmall(scene);
        this.yellowParallelogram = new MyParallelogram(scene);
        this.redTriangle = new MyTriangleSmall(scene);
        this.purpleTriangle = new MyTriangleSmall(scene);
    }

    display(){
        this.scene.pushMatrix();  //push Identity Matrix
        
        var scaleGreenDiamond = [   //o lado do MyDiamond é sqrt(2)
        Math.sqrt(2)/2, 0.0, 0.0, 0.0,
        0.0, Math.sqrt(2)/2, 0.0, 0.0,
        0.0, 0.0, Math.sqrt(2)/2, 0.0,
        0.0, 0.0, 0.0, 1,
        ]
        
        var translateGreenDiamond = [ 
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        Math.sqrt(2)/2, 0, 0, 1
        ]

        this.scene.multMatrix(translateGreenDiamond);
        this.scene.multMatrix(scaleGreenDiamond);   

        this.greenDiamond.display(); //draw object with transformations

        this.scene.popMatrix();   //reset to old matrix
    
        //Start drawing pink Triangle
        this.scene.pushMatrix();

        var translatePinkTriangle = [   
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 1
        ]

        this.scene.multMatrix(translatePinkTriangle);

        this.pinkTriangle.display();
        
        this.scene.popMatrix();


        //Start Drawing Orange Triangle
        this.scene.pushMatrix();
        
        var scaleOrangeTriangle = [
        Math.sqrt(2), 0.0, 0.0, 0.0,
        0.0, Math.sqrt(2), 0.0, 0.0,
        0.0, 0.0, Math.sqrt(2), 0.0,
        0.0, 0.0, 0.0, 1
        ]

        const rotateOrangeTriangleAngle = - 90*Math.PI / 180;

        var rotateOrangeTriangle = [
        Math.cos(rotateOrangeTriangleAngle), Math.sin(rotateOrangeTriangleAngle), 0, 0,
        -Math.sin(rotateOrangeTriangleAngle), Math.cos(rotateOrangeTriangleAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        ]

        var translateOrangeTriangle = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -Math.sqrt(2)/2, Math.sqrt(2)/2, 0, 1
        ]
        
        this.scene.multMatrix(translateOrangeTriangle);
        this.scene.multMatrix(rotateOrangeTriangle);
        this.scene.multMatrix(scaleOrangeTriangle);

        this.orangeTriangle.display();

        this.scene.popMatrix();

        //Start Drawing Blue Triangle
        
        this.scene.pushMatrix();

        var scaleBlueTriangle = [
        Math.sqrt(2), 0.0, 0.0, 0.0,
        0.0, Math.sqrt(2), 0.0, 0.0,
        0.0, 0.0, Math.sqrt(2), 0.0,
        0.0, 0.0, 0.0, 1,
        ]

        const rotateBlueTriangleAngle = - 45*Math.PI / 180;

        var rotateBlueTriangle = [
        Math.cos(rotateBlueTriangleAngle), Math.sin(rotateBlueTriangleAngle), 0, 0,
        -Math.sin(rotateBlueTriangleAngle), Math.cos(rotateBlueTriangleAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        ]

        var translateBlueTriangle = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -(1 + Math.sqrt(2)/2), (1 - Math.sqrt(2)/2), 0, 1
        ]

        this.scene.multMatrix(translateBlueTriangle); 
        this.scene.multMatrix(rotateBlueTriangle);      // The rotation is not being done from the middle of the triangle
        this.scene.multMatrix(scaleBlueTriangle);

        this.blueTriangle.display();

        this.scene.popMatrix();

        // Start Drawing Yellow parallelogram

        this.scene.pushMatrix();

        var scaleYellowParallelogram = [
        Math.sqrt(2)/2, 0.0, 0.0, 0.0,
        0.0, -Math.sqrt(2)/2, 0.0, 0.0,
        0.0, 0.0, Math.sqrt(2)/2, 0.0,
        0.0, 0.0, 0.0, 1,
        ]

        var translateYellowParallelogram = [
        1, 0.0, 0.0, 0.0,
        0.0, 1, 0.0, 0.0,
        0.0, 0.0, 1, 0.0,
        -(Math.sqrt(2) + Math.sqrt(2)/2 + 2) , 2 - Math.sqrt(2)/2, 0.0, 1
        ]

        this.scene.multMatrix(translateYellowParallelogram);
        this.scene.multMatrix(scaleYellowParallelogram);

        this.yellowParallelogram.display();

        this.scene.popMatrix();


        // Start drawing red triangle
        
        this.scene.pushMatrix();

        const rotateRedTriangleAngle = 15*Math.PI / 180;

        var rotateRedTriangle = [
        Math.cos(rotateRedTriangleAngle), Math.sin(rotateRedTriangleAngle), 0, 0,
        -Math.sin(rotateRedTriangleAngle), Math.cos(rotateRedTriangleAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        ]

        var scaleRedTriangle = [
        Math.sqrt(2)/2, 0.0, 0.0, 0.0,
        0.0, Math.sqrt(2)/2, 0.0, 0.0,
        0.0, 0.0, Math.sqrt(2)/2, 0.0,
        0.0, 0.0, 0.0, 1,
        ]

        var translateRedTriangle = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        (-Math.sqrt(2)/2)+(Math.sqrt(2)/2)*Math.cos(rotateRedTriangleAngle), 2*Math.sqrt(2) - Math.sqrt(2)/2 + (Math.sqrt(2)/2)*Math.sin(rotateRedTriangleAngle), 0, 1
        ]

        this.scene.multMatrix(translateRedTriangle);
        this.scene.multMatrix(rotateRedTriangle);
        this.scene.multMatrix(scaleRedTriangle);

        this.redTriangle.display();
        
        this.scene.popMatrix();

        //Start Drawing Purple Triangle
        this.scene.pushMatrix();

        var scalePurpleTriangle = [
        Math.sqrt(2)/2, 0, 0, 0,
        0, Math.sqrt(2)/2, 0, 0,
        0, 0, Math.sqrt(2)/2, 0,
        0, 0, 0, 1
        ]

        const rotatePurpleTriangleAngle = (90 + 45 + 15) * Math.PI / 180;

        var translatePurpleToRotate = [
        1, 0.0, 0.0, 0.0,
        0.0, 1, 0.0, 0.0,
        0.0, 0.0, 1, 0.0,
        Math.sqrt(2)/2, 0.0, 0.0, 1
        ]

        var rotatePurpleTriangle = [
        Math.cos(rotatePurpleTriangleAngle), Math.sin(rotatePurpleTriangleAngle), 0, 0,
        -Math.sin(rotatePurpleTriangleAngle), Math.cos(rotatePurpleTriangleAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        ]

        var tranlatePurpleTriangle = [
        1, 0.0, 0.0, 0.0,
        0.0, 1, 0.0, 0.0,
        0.0, 0.0, 1, 0.0,
        -Math.sqrt(2)/2, 2*Math.sqrt(2) - Math.sqrt(2)/2, 0.0, 1
        ]

        this.scene.multMatrix(tranlatePurpleTriangle);
        this.scene.multMatrix(rotatePurpleTriangle);
        this.scene.multMatrix(translatePurpleToRotate);
        this.scene.multMatrix(scalePurpleTriangle);

        this.purpleTriangle.display();

        this.scene.popMatrix();
    }
}