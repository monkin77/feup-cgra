import {CGFobject} from '../lib/CGF.js';
import {MyRock} from './MyRock.js'

export class MyRockSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, numRocks, nestPosition) {
    super(scene);

    this.nestPosition = nestPosition;
    this.numRocks = numRocks;
    this.rocks = [];
    this.rocksScaling = [];
    this.rocksPosition = [];

    this.init(scene, slices, stacks);
  }

  init(scene, slices, stacks) {
    for (var i = 0; i < this.numRocks; i++) {
        
        this.rocks.push(new MyRock(scene, slices, stacks));
        
        let randomScale = Math.random() / 10 + 0.1;     //a random value between 0.1 and 0.2
        this.rocksScaling.push(randomScale);
        
        while(true) {
            let randomXPos = Math.random() * 48 - 24;     // random between -25, 25
            let randomZPos = Math.random() * 48 - 24;

            if (Math.abs( Math.pow( (randomXPos - this.nestPosition.x), 2) + Math.pow( (randomZPos - this.nestPosition.z), 2) ) > Math.pow(this.nestPosition.radius, 2)) {
                this.rocksPosition.push( [randomXPos, 0.5 + 0.7*randomScale, randomZPos] ); 
                break;
            }
        }
    }
  }


  display() {
    for (var i = 0; i < this.numRocks; i++) {
        this.scene.pushMatrix();
        
        let scale = this.rocksScaling[i];
        let randomXPos = this.rocksPosition[i][0];
        let randomYPos = this.rocksPosition[i][1];
        let randomZPos = this.rocksPosition[i][2];
        
        this.scene.translate(randomXPos, randomYPos, randomZPos);    // 1 is the radius
        this.scene.scale(scale, 0.7*scale, scale);

        this.rocks[i].display();
        this.scene.popMatrix();
    }
  }

}
