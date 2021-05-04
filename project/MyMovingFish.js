import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';
/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {

    constructor(scene){
        super(scene);

        this.fish = new MyFish(scene);
        this.fishScaleFactor = 1 /*0.25*/;

        this.position = [0.0, 5.0, 0.0];
    }

    updateMovingFish() {
        this.fish.update();
        this.update();
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.defaultAppearance.apply();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.scale(this.fishScaleFactor, this.fishScaleFactor, this.fishScaleFactor);

        this.fish.display();

        this.scene.popMatrix();
    }

    


}