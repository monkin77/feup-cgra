import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFCamera2.js";

import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import {MyPlane} from "./MyPlane.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import { MyPlantSet } from "./MyPlantSet.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";

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

        this.setUpdatePeriod(50);   // 20 fps
        
        this.enableTextures(true);

        // Texture 1
        this.texture1 = new CGFtexture(this, 'images/demo_cubemap/left.png');       // nx
        this.texture2 = new CGFtexture(this, 'images/demo_cubemap/bottom.png');     // ny
        this.texture3 = new CGFtexture(this, 'images/demo_cubemap/back.png');       // nz
        this.texture4 = new CGFtexture(this, 'images/demo_cubemap/right.png');      // px
        this.texture5 = new CGFtexture(this, 'images/demo_cubemap/top.png');        // py
        this.texture6 = new CGFtexture(this ,'images/demo_cubemap/front.png');      // pz

        // Texture 2
        this.texture2_1 = new CGFtexture(this, 'images/my_img_1/nx.png');       // nx
        this.texture2_2 = new CGFtexture(this, 'images/my_img_1/ny.png');     // ny
        this.texture2_3 = new CGFtexture(this, 'images/my_img_1/nz.png');       // nz
        this.texture2_4 = new CGFtexture(this, 'images/my_img_1/px.png');      // px
        this.texture2_5 = new CGFtexture(this, 'images/my_img_1/py.png');        // py
        this.texture2_6 = new CGFtexture(this ,'images/my_img_1/pz.png');      // pz       
        
        this.texture3_1 = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');       // nx
        this.texture3_2 = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');     // ny
        this.texture3_3 = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');       // nz
        this.texture3_4 = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');      // px
        this.texture3_5 = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');        // py
        this.texture3_6 = new CGFtexture(this ,'images/underwater_cubemap/front.jpg');      // pz     

        this.sphereTexture = new CGFtexture(this, 'images/earth.jpg');

        this.arrTextures = [this.texture1, this.texture2, this.texture3, this.texture4, this.texture5, this.texture6];
        this.arrTextures2 = [this.texture2_1, this.texture2_2, this.texture2_3, this.texture2_4, this.texture2_5, this.texture2_6];
        this.arrTextures3 =  [this.texture3_1, this.texture3_2, this.texture3_3, this.texture3_4, this.texture3_5, this.texture3_6];
        this.myCubeMapTextures = [this.arrTextures, this.arrTextures2, this.arrTextures3];
        this.myCubeMapTextureSelector = 2;  // variable that chooses the current texture

        this.myCubeMapTexturesList = {  // Object interface variables
            'Default': 0,
            'Custom 1': 1,
            'Underwater': 2,
        } 

        this.lowerBound = 0.5;       // global lowerBound for fish
        this.upperBound = 5;           // global upperBound

        this.nestPosition = {x: 9, y: this.lowerBound+0.2, z: -18, radius: 5};  // position of the center of the Nest


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.myMovingObject = new MyMovingObject(this);
        this.myCubeMap = new MyCubeMap(this, this.myCubeMapTextures[this.myCubeMapTextureSelector]);
        this.myCylinder = new MyCylinder(this, 16);
        this.myFish = new MyFish(this);
        this.myRock = new MyRock(this, 16, 8);
        this.myRockSet = new MyRockSet(this, 32, 16, 50, this.nestPosition);   
        this.mySeaFloor = new MySeaFloor(this, 100, 50, 1);
        this.myWaterSurface = new MyPlane(this, 200);
        
        this.myMovingFish = new MyMovingFish(this);

        let randomX = Math.random() * 15;
        let randomY = 1.5 + Math.random() * 5;
        let randomZ = Math.random() * 15;
        this.animatedFishes = [
            new MyAnimatedFish(this, [randomX, randomY, randomZ], 5, 5),
            new MyAnimatedFish(this, [-randomX, randomY, -randomZ], 5, 3),
        ]

        this.myPillars = [ 
            new MyPillar(this, 100, {x: 5, y: 0, z: 0}),
            new MyPillar(this, 100, {x: 5, y: 0, z: 5}),
            new MyPillar(this, 100, {x: 13, y: 0, z: 0}),
            new MyPillar(this, 100, {x: 13, y: 0, z: 5}),
            new MyPillar(this, 100, {x: 21, y: 0, z: 0}),
            new MyPillar(this, 100, {x: 21, y: 0, z: 5}),
        ];

        this.myPlantSet = new MyPlantSet(this, 10, 50, this.nestPosition)

        this.waterSurfaceShader = new CGFshader(this.gl, "shaders/waterSurface.vert", "shaders/waterSurface.frag");
        this.waterSurfaceShader.setUniformsValues( {uSampler2: 1, offset: 0} );		// The uSampler is already sent by default

        this.waterSurfaceTexture = new CGFtexture(this, 'images/pier.jpg'); 
        this.waterSurfaceDistortion = new CGFtexture(this, 'images/distortionmap.png');

        this.waterSurfaceAppearance = new CGFappearance(this);
		this.waterSurfaceAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.waterSurfaceAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.waterSurfaceAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.waterSurfaceAppearance.setShininess(10);
        this.waterSurfaceAppearance.setTexture(this.waterSurfaceTexture);
		this.waterSurfaceAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.setTexture(this.sphereTexture);

        this.cylinderAppearance = new CGFappearance(this);
		this.cylinderAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.cylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.cylinderAppearance.setShininess(10);
        this.cylinderAppearance.setTexture(this.sphereTexture);

        this.rockAppearance = new CGFappearance(this);
        this.rockAppearance.setAmbient(0.4, 0.4, 0.4, 1);
        this.rockAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
        this.rockAppearance.setSpecular(1, 1, 1, 1);
        this.rockAppearance.setShininess(10);


        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.displayAxis = true;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    
    initCameras() {
        this.camera = new CGFcamera2(1.75, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    onMyCubeMapTextureChange = () => {      // needs to be an arrow function so that the this object is the MyScene object
        if(this.myCubeMap) this.myCubeMap.updateTextures(this.myCubeMapTextures[this.myCubeMapTextureSelector]);
        else console.error("this.myCubeMap is null");
    }

    turn(val) {
        // this.myMovingObject.orientation += val;
        this.myMovingFish.orientation += val;

        if (val < 0) this.myMovingFish.turningLeft = true;
        else this.myMovingFish.turningRight = true;
    }

    accelerate(val) {
        //this.myMovingObject.speed += val;
        
        /* if(this.myMovingObject.speed < 0){
            this.myMovingObject.speed = 0;
        }*/

        this.myMovingFish.speed += val;
        if (this.myMovingFish.speed < 0) {
            this.myMovingFish.speed = 0;
        }
        if (this.myMovingFish.speed > 5.0) {
            this.myMovingFish.speed = 5.0;
        }
    }

    moveUp() {

        if (this.myMovingFish.position[1] + this.myMovingFish.verticalSpeed < this.upperBound - this.myMovingFish.fishScaleFactor) {
            this.myMovingFish.position[1] += this.myMovingFish.verticalSpeed;
        } else {
            this.myMovingFish.position[1] = this.upperBound - this.myMovingFish.fishScaleFactor;
        }
    }

    moveDown() {

        if (this.myMovingFish.position[1] - this.myMovingFish.verticalSpeed > this.lowerBound + this.myMovingFish.fishScaleFactor) {
            this.myMovingFish.position[1] -= this.myMovingFish.verticalSpeed;
        } else {
            this.myMovingFish.position[1] = this.lowerBound + this.myMovingFish.fishScaleFactor;
        }
    }

    reset(){
        /*
        this.myMovingObject.speed = 0;
        this.myMovingObject.orientation = 0;
        this.myMovingObject.position = [0, 0, 0];
        */
        this.myMovingFish.reset(this.myRockSet);
        
    }

    checkKeys(){
        var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/
        if(this.gui.isKeyPressed("KeyW")){
            keysPressed = true;
            this.accelerate(0.1);
            
        }

        if(this.gui.isKeyPressed("KeyS")) {
            keysPressed = true;
            /*if(this.myMovingObject.speed > 0)
                this.accelerate(-0.1);*/
            if (this.myMovingFish.speed > 0) {
                this.accelerate(-0.1);
            }
        }

        if(this.gui.isKeyPressed("KeyA")) {
            keysPressed = true;
            this.turn(-0.1);
        } 
        else if(this.gui.isKeyPressed("KeyD")) {
            keysPressed = true;
            this.turn(0.1);
        }
        else {
            this.myMovingFish.turningLeft = false;
            this.myMovingFish.turningRight = false;
        }

        if(this.gui.isKeyPressed("KeyR")) {
            this.reset();
        }

        if (this.gui.isKeyPressed("KeyP")) {
            this.moveUp();
        }

        if (this.gui.isKeyPressed("KeyL")) {
            this.moveDown();
        }

        if (this.gui.isKeyPressed("KeyC")) {
            // apanhar pedra
            this.myMovingFish.handleRock(this.myRockSet, this.lowerBound, this.upperBound, this.nestPosition);
        }
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.myMovingObject.update();
        // this.myFish.update();
        this.myMovingFish.updateMovingFish(this.myRockSet, this.nestPosition);

        // Update animated fishes
        for(let i = 0; i < this.animatedFishes.length; i++){
            this.animatedFishes[i].updateAnimatedFish();
        }

        this.waterSurfaceShader.setUniformsValues({offset: t % 10000});
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
        
        this.defaultAppearance.apply();
        
        // SCALING CUBE MAP
        this.pushMatrix();
                
        var scaleCubeMap = [   //o lado do MyDiamond é sqrt(2)
            500, 0.0, 0.0, 0.0,
            0.0, 500, 0.0, 0.0,
            0.0, 0.0, 500, 0.0,
            0.0, 0.0, 0.0, 1,
        ]

        var translateToCamera = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            this.camera.position[0], this.camera.position[1], this.camera.position[2], 1
        ]
        

        this.multMatrix(translateToCamera);  
        this.multMatrix(scaleCubeMap);

        this.myCubeMap.display();
        this.popMatrix();


        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // DRAW BASIC (TRIANGLE) MOVING OBJECT 
        this.pushMatrix();

        // this.myMovingObject.display();

        this.popMatrix();

        // DRAW CYLINDER
        this.pushMatrix();
        this.cylinderAppearance.apply();

        // this.myCylinder.display();

        this.popMatrix();

        // DRAW SPHERE
        this.pushMatrix();

        this.sphereAppearance.apply();

        var sphereAngleInDegrees = 140;
        var sphereRotationAngle = Math.PI * sphereAngleInDegrees / 180;
        var rotateSphere = [
            Math.cos(sphereRotationAngle), 0, -Math.sin(sphereRotationAngle), 0,
            0, 1, 0, 0,
            Math.sin(sphereRotationAngle), 0, Math.cos(sphereRotationAngle), 0,
            0, 0, 0, 1
        ];

        this.multMatrix(rotateSphere);  // Rotate the sphere so that it shows Europe by default

        // This sphere does not have defined texture coordinates
        // this.incompleteSphere.display();

        this.popMatrix();

        // DRAW FISH        
        this.pushMatrix();
        this.defaultAppearance.apply();

        let fishScaleFactor = 1 /*0.25*/;
        var scaleFish = [
            fishScaleFactor, 0, 0, 0,
            0, fishScaleFactor, 0, 0,
            0, 0, fishScaleFactor, 0,
            0, 0, 0, 1,
        ];

        var translateFish = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 3, 0, 1,
        ];

        this.multMatrix(scaleFish);
        this.multMatrix(translateFish)
        
        // this.myFish.display();

        this.popMatrix();

        // Draw Sea floor
        this.pushMatrix();

        this.mySeaFloor.display();

        this.popMatrix();

        // DRAW WATER SURFACE
        this.pushMatrix();

        this.setActiveShader(this.waterSurfaceShader);
        
        this.waterSurfaceTexture.bind();
        this.waterSurfaceDistortion.bind(1);

        this.waterSurfaceAppearance.apply();
        
        this.translate(0, 10, 0);
        this.rotate(Math.PI/2, 1, 0, 0);
        this.scale(50, 50, 50);

        this.myWaterSurface.display();

        this.popMatrix();
        
        this.setActiveShader(this.defaultShader);

        // DRAW ROCK SET
        this.pushMatrix();

        this.rockAppearance.apply();
        
        this.myRockSet.display();
        
        this.popMatrix(); 

        this.defaultAppearance.apply();

        // DRAW PILLARS

        for(let i = 0; i < this.myPillars.length; i++){
            this.myPillars[i].display();
        }
        
        this.defaultAppearance.apply();

        // DRAW PLANTS

        this.pushMatrix();

        this.myPlantSet.display();

        this.popMatrix();

        // DRAW MOVING FISH
        this.pushMatrix();

        this.myMovingFish.display();

        this.popMatrix();

        // DRAW ANIMATED FISHES
        for(let i = 0; i < this.animatedFishes.length; i++){
            this.pushMatrix();

            this.animatedFishes[i].display();

            this.popMatrix();
        }

    }


}