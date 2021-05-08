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

        this.turningRight = false;
        this.turningLeft = false;
        this.trowingRock = false;
        
        this.maxRockDistance = 1.5;

        this.grabbedRockIndex;
        this.initialRockPosition;

        this.position = [0.0, 5.0, 0.0];
    }

    calculateRockPosition() {
        let result;
        if (!this.throwingRock) {
            let directionVector = [0.0, 0.0, 0.0];

            directionVector[0] = Math.sin(this.orientation); //* this.speed * this.speedFactor;
            directionVector[2] = Math.cos(this.orientation); //* this.speed * this.speedFactor;

            result = [this.position[0] + directionVector[0], 
                        this.position[1] + directionVector[1] - 0.2, 
                        this.position[2] + directionVector[2]];
        }
        else {

        }

        return result;
    }

    updateMovingFish(rockSet) {
        this.fish.update(this.speed);
        this.update();

        if (this.grabbedRockIndex) {
            rockSet.rocksPosition[this.grabbedRockIndex] = this.calculateRockPosition();
        }
    }

    handleRock(rockSet, lowerBound, upperBound, nestPosition) {
        if (this.grabbedRockIndex ) {
            this.dropRock(rockSet, lowerBound, upperBound, nestPosition);
        }
        else {
            this.grabRock(rockSet, lowerBound);
        }
    }

    dropRock(rockSet, lowerBound, upperBound, nestPosition) {
        let rockPosition = rockSet.rocksPosition[this.grabbedRockIndex];
        let distance = Math.sqrt( Math.pow( rockPosition[0] - nestPosition.x, 2) + Math.pow( rockPosition[2] - nestPosition.z, 2));

        if (this.position[1] - this.fishScaleFactor == lowerBound ) {
            if ( distance <= nestPosition.radius - 1 ) {
                rockSet.rocksPosition[this.grabbedRockIndex][1] = this.lowerBound + 0.2;

                this.grabbedRockIndex = null;
                this.initialRockPosition = null;
            }
        } 
        else if (this.position[1] == upperBound && distance >= nestPosition.radius - 1 ) {
            let v0x = 5;
            
            // Calculating v0y and v0z through v0x and its movement equation
            t = Math.abs(( nestPosition.x - rockSet.rockPosition[this.grabbedRockIndex][0] ) )/ v0x;  
            let v0y = 0.5 * 9.81 * t;
            let v0z = Math.abs(nestPosition.z - rockSet.rockPosition[this.grabbedRockIndex][2]) / t;
        }

    }

    grabRock(rockSet, lowerBound) {
        if ( this.position[1] - this.fishScaleFactor == lowerBound) {
            let minDistance = 9999; 
            let closestRockIndex = 0;

            for (let i = 0; i < rockSet.rocksPosition.length; i++) {    
                let pos = rockSet.rocksPosition[i];
                
                let dist = Math.sqrt( Math.pow( this.position[0] - pos[0] , 2) + Math.pow( this.position[1] - pos[1] , 2) + Math.pow( this.position[2] - pos[2] , 2));
                
                if (dist < minDistance) { 
                    minDistance = dist;
                    closestRockIndex = i;
                }
            }

            if (minDistance <= this.maxRockDistance) {
                this.grabbedRockIndex = closestRockIndex;
                this.initialRockPosition = rockSet.rocksPosition[closestRockIndex];

            }

            rockSet.rocksPosition[closestRockIndex] = this.calculateRockPosition();     // Rock new Position on Fish Mouth
            
        }
    }

    reset(rockSet) {
        this.speed = 0;
        this.orientation = 0;
        this.position = [0.0, 5.0, 0.0];
        this.fish.tailIncrement = this.fish.defaultTailIncrement; 
        this.fish.tailInclination = 0;
        this.fish.finsInclination = 0;

        rockSet.rocksPosition[this.grabbedRockIndex] = this.initialRockPosition;
        this.grabbedRockIndex = null;
        this.initialRockPosition = null;
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.defaultAppearance.apply();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.scale(this.fishScaleFactor, this.fishScaleFactor, this.fishScaleFactor);

        this.fish.display(this.turningRight, this.turningLeft);

        this.scene.popMatrix();
    }

    


}