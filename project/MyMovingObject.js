import {CGFobject} from '../lib/CGF.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
    constructor(scene){
        super(scene);
        this.movingObject = new MyTriangleSmall(scene);

        this.speed = 0.0;
        this.verticalSpeed = 0.2;
        this.speedFactor = 1.0;
        this.position = [0.0, 0.0, 0.0];
        this.orientation = 0.0;
    }

    update(){        
        let directionVector = [0.0, 0.0, 0.0];

        directionVector[0] = Math.sin(this.orientation) * this.speed * this.scene.speedFactor;
        directionVector[2] = Math.cos(this.orientation) * this.speed * this.scene.speedFactor;

        this.position[0] = this.position[0] + directionVector[0];
        this.position[1] = this.position[1] + directionVector[1];
        this.position[2] = this.position[2] + directionVector[2];
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.scale(0.5, 0.5, 0.5);    // MyTriangleSmall has size 1
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.movingObject.display();

        this.scene.popMatrix();
    }
}