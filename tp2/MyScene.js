import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";
import {MyTriangleBig} from "./MyTriangleBig.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.greenDiamond = new MyDiamond(this);
    this.pinkTriangle = new MyTriangleSmall(this);
    this.orangeTriangle = new MyTriangleSmall(this);
    this.blueTriangle = new MyTriangleSmall(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayGreenDiamond = true;
    this.displayPinkTriangle = true;
    this.displayOrangeTriangle = true;
    this.displayBlueTriangle = true;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();  //push Identity Matrix

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];
    
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

    this.multMatrix(translateGreenDiamond);
    this.multMatrix(scaleGreenDiamond);   

    this.multMatrix(sca);
    if(this.displayGreenDiamond) this.greenDiamond.display(); //draw object with transformations

    this.popMatrix();   //reset to old matrix
  

    //Start drawing pink Triangle
    this.pushMatrix();

    var translatePinkTriangle = [   
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 1
    ]

    this.multMatrix(translatePinkTriangle);

    if (this.displayPinkTriangle) this.pinkTriangle.display();
    
    this.popMatrix();


    //Start Drawing Orange Triangle
    this.pushMatrix();
    
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
    
    this.multMatrix(translateOrangeTriangle);
    this.multMatrix(rotateOrangeTriangle);
    this.multMatrix(scaleOrangeTriangle);

    if (this.displayOrangeTriangle) this.orangeTriangle.display();

    this.popMatrix();

    //Start Drawing Blue Triangle
    
    this.pushMatrix();

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

    this.multMatrix(translateBlueTriangle); 
    this.multMatrix(rotateBlueTriangle);      // The rotation is not being done from the middle of the triangle
    this.multMatrix(scaleBlueTriangle);

    if(this.displayBlueTriangle) this.blueTriangle.display();

    this.popMatrix();
    
    // ---- BEGIN Primitive drawing section

    // ---- END Primitive drawing section
  }
}
