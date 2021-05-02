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
    this.initBuffers();
  }

  init(scene, slices, stacks) {
    for (var i = 0; i < this.numRocks; i++) {
        
        this.rocks.push(new MyRock(scene, slices, stacks));
        
        let random = Math.random() / 10 + 0.1;     //a random value between 0.1 and 0.2
        this.rocksScaling.push(random);


        
        while(true) {
            let randomX = Math.random() * 48 - 24;     // random between -25, 25
            let randomZ = Math.random() * 48 - 24;

            if (Math.abs( Math.pow( (randomX - this.nestPosition.x), 2) + Math.pow( (randomZ - this.nestPosition.z), 2) ) > Math.pow(this.nestPosition.radius, 2)) {
                this.rocksPosition.push( [randomX, randomZ] ); 
                break;
            }
        }


    }
  }


  display() {
    for (var i = 0; i < this.numRocks; i++) {
        this.scene.pushMatrix();
        
        let scale = this.rocksScaling[i];
        let randomX = this.rocksPosition[i][0];
        let randomZ = this.rocksPosition[i][1];
        
        this.scene.translate(randomX, 0.5 + 1 * scale, randomZ);    // 1 is the radius
        this.scene.scale(5*scale, 5*scale, 5*scale);

        this.rocks[i].display();
        this.scene.popMatrix();
    }
  }

}
