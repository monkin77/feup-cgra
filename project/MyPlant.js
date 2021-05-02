import {CGFobject} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';
export class MyPlant extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices) {
    super(scene);
    
    this.myPyramid = new MyPyramid(scene, slices);
  }

  display() {
    this.myPyramid.display();
  }
}
