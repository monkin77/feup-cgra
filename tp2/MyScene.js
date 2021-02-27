import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";
import {MyTriangleBig} from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';

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
    
    this.tangram = new MyTangram(this);
    this.myUnitCube = new MyUnitCube(this);
    this.myUnitCubeQuad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;

    this.scaleFactor = 1;

    this.displayTangram = true;
    this.displayUnitCube = true;
    this.displayUnitCubeQuad = true;

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
    
    this.multMatrix(sca);

    //this.tangram.display();

    //-------------------------------------- Drawing Cube and transforming new Figure -----------------------------

    var translateFigure = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0.5, 0, 0.5, 1
    ]

    const rotateFigureAngle = -90*Math.PI / 180;

    var rotateFigure = [
      1, 0, 0, 0,
      0, Math.cos(rotateFigureAngle), Math.sin(rotateFigureAngle), 0,
      0, -Math.sin(rotateFigureAngle), Math.cos(rotateFigureAngle), 0,
      0, 0, 0, 1
    ]

    this.multMatrix(translateFigure); //rodar figura, depois transladar para a origem o ponto superior esquerdo do cubo
    this.multMatrix(rotateFigure);

    if(this.displayTangram) this.tangram.display(); //rodei e desenhei

    var translateCube = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, -0.5, 1
    ];

    this.multMatrix(translateCube); // O cubo precisava de + transformaçoes entao so desenho depois das transformações todas

    if (this.displayUnitCube) this.myUnitCube.display();
    if(this.displayUnitCubeQuad) this.myUnitCubeQuad.display();

    this.popMatrix();
  }
}
