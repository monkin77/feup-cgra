import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import {MyPlant} from './MyPlant.js';

export class MyPlantSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices, numPlants, nestPosition) {
    super(scene);

    this.nestPosition = nestPosition;
    this.numPlants = numPlants;
    this.plants = [];
    this.plantsScaling = [];
    this.plantsPosition = [];
    this.plantsReflection = [];

    this.init(scene, slices);
    this.initMaterials(scene);
  }

  init(scene, slices) {
    for (var i = 0; i < this.numPlants; i++) {
        
        this.plants.push(new MyPlant(scene, slices));
        
        // Set random Scaling value
        let random = Math.random() / 4 + 0.1;     //a random value between 0.1 - 0.35
        this.plantsScaling.push(random);
        
        // Set random Position
        while(true) {
            let randomXPos = Math.random() * 48 - 24;     // random between -24, 24
            let randomZPos = Math.random() * 48 - 24;

            if (Math.abs( Math.pow( (randomXPos - this.nestPosition.x), 2) + Math.pow( (randomZPos - this.nestPosition.z), 2) ) > Math.pow(this.nestPosition.radius, 2)) {
                this.plantsPosition.push( [randomXPos, randomZPos] ); 
                break;
            }
        }

        // Set random Reflection Values
        random = Math.random() / 2 + 0.5;   // random between 0.5 - 1.0
        this.plantsReflection.push(random);
    }
  }

  initMaterials(scene) {
    this.plantTexture = new CGFtexture(scene, 'images/plant/plantTexture.png');

    this.plantAppearance = new CGFappearance(scene);
    this.plantAppearance.setAmbient(1.0, 1.0, 1.0, 1);     // MIGHT CHANGE THIS
    this.plantAppearance.setDiffuse(1.0, 1.0, 1.0, 1);
    this.plantAppearance.setSpecular(1.0, 1.0, 1.0, 1);
    this.plantAppearance.setShininess(10);
    this.plantAppearance.setTexture(this.plantTexture);
    this.plantAppearance.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    for (var i = 0; i < this.numPlants; i++) {
        this.scene.pushMatrix();
        
        // this.plantAppearance.setAmbient(this.plantsReflection, this.plantsReflection, this.plantsReflection, 1);
        // this.plantAppearance.setDiffuse(this.plantsReflection, this.plantsReflection, this.plantsReflection, 1);
        // this.plantAppearance.setSpecular(this.plantsReflection, this.plantsReflection, this.plantsReflection, 1);
        this.plantAppearance.apply();

        let scale = this.plantsScaling[i];
        let randomXPos = this.plantsPosition[i][0];
        let randomZPos = this.plantsPosition[i][1];
        
        this.scene.translate(randomXPos, 0.5 + 1 * scale, randomZPos);    // 1 is the radius
        this.scene.scale(scale, 5*scale, scale);

        this.plants[i].display();

        this.scene.popMatrix();
    }
  }

}
