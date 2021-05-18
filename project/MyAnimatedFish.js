import { CGFtexture, CGFshader } from "../lib/CGF.js";

import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';
/**
 * MyAnimatedFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAnimatedFish extends MyMovingObject {

    constructor(scene, center, radius, period){
        super(scene);

        this.fish = new MyFish(scene, 
                    new CGFshader(this.scene.gl, "shaders/animatedFishShader.vert", "shaders/animatedFishShader.frag"),
                    new CGFtexture(scene, 'images/fish_img/fishScales2.jpg'));

        this.fishScaleFactor = 1 /*0.25*/;

        this.radius = radius;
        this.center = center;
        this.orientationSpeed = 2*Math.PI / (period * 20);  // 20 -> fps
        this.pilotAngle = this.orientation - Math.PI / 2;
    }

    update() {
        let directionVector = [0.0, 0.0, 0.0];

        directionVector[0] = Math.sin(this.pilotAngle) * this.radius;
        directionVector[2] = Math.cos(this.pilotAngle) * this.radius;

        this.position[0] = this.center[0] + directionVector[0];
        this.position[1] = this.center[1] + directionVector[1];
        this.position[2] = this.center[2] + directionVector[2];
        
        this.orientation += this.orientationSpeed;
        this.pilotAngle = this.orientation - Math.PI / 2;
    }

    /**
     * Orientation is relative to Z axis, However the fish's
     * initial angle is looking at the x axis.
     * Example: Initial Position (0, 0, z) and the fish is looking towards (infinite, 0, 0) 
     * @returns pilotAngle
     */
    getPilotAngle() {
        return this.orientation - Math.PI/2;
    }

    updateAnimatedFish() {
        this.fish.update(this.speed);
        this.update();
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.defaultAppearance.apply();

        // console.log(this.position);

        this.scene.translate(this.position[0], this.position[1], this.position[2] );     
        this.scene.rotate(this.pilotAngle, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.scale(this.fishScaleFactor, this.fishScaleFactor, this.fishScaleFactor);

        this.fish.display();

        this.scene.popMatrix();
    }
}