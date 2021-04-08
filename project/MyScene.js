import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";

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

        this.setUpdatePeriod(50);
        
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


        this.arrTextures = [this.texture1, this.texture2, this.texture3, this.texture4, this.texture5, this.texture6];
        this.arrTextures2 = [this.texture2_1, this.texture2_2, this.texture2_3, this.texture2_4, this.texture2_5, this.texture2_6];

        this.myCubeMapTextures = [this.arrTextures, this.arrTextures2];

        this.myCubeMapTextureSelector = 0;  // variable that chooses the current texture

        this.myCubeMapTexturesList = {  // Object interface variables
            'Default': 0,
            'Custom 1': 1
        } 

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.myMovingObject = new MyMovingObject(this);
        this.myCubeMap = new MyCubeMap(this, this.myCubeMapTextures[this.myCubeMapTextureSelector]);
        this.myCylinder = new MyCylinder(this, 16);

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

        this.cylinderAppearance = new CGFappearance(this);
		this.cylinderAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.cylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.cylinderAppearance.setShininess(10);
        this.cylinderAppearance.setTexture(this.texture1);


        //Objects connected to MyInterface
        this.displayAxis = true;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
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

    turn(val){
        // console.log("Orientation: ", this.myMovingObject.orientation);
        this.myMovingObject.orientation += val;
    }

    accelerate(val){
        // console.log("Speed: ", this.myMovingObject.speed);
        this.myMovingObject.speed += val;

        if(this.myMovingObject.speed < 0){
            this.myMovingObject.speed = 0;
        }
    }

    reset(){
        this.myMovingObject.speed = 0;
        this.myMovingObject.orientation = 0;
    }

    checkKeys(){
        var text = "Keys pressed: ";
        var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            keysPressed = true;
            this.accelerate(0.1);
        }

        if(this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            if(this.myMovingObject.speed > 0)
                this.accelerate(-0.1);
        }

        if(this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            this.turn(-0.1);
        }

        if(this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
            this.turn(0.1);
        }

        if(keysPressed)
            console.log(text);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.myMovingObject.update();
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
        
        // console.log("Cam position:", this.camera.position);

        this.multMatrix(translateToCamera);  
        this.multMatrix(scaleCubeMap);

        this.myCubeMap.display();
        this.popMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        // this.incompleteSphere.display();

        this.pushMatrix();

        var rotateMovingObject = [
            Math.cos(this.myMovingObject.orientation), 0, -Math.sin(this.myMovingObject.orientation), 0,
            0, 1, 0, 0,
            Math.sin(this.myMovingObject.orientation), 0, Math.cos(this.myMovingObject.orientation), 0,
            0, 0, 0, 1
        ];

        var translateMovingObject = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            this.myMovingObject.position[0], this.myMovingObject.position[1], this.myMovingObject.position[2], 1
        ]

        this.multMatrix(translateMovingObject);
        this.multMatrix(rotateMovingObject);

        this.myMovingObject.display();
        this.popMatrix();

        this.cylinderAppearance.apply();

        this.myCylinder.display();
    }
}