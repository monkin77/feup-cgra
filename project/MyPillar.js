import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import {MyCylinder} from "./MyCylinder.js";
export class MyPillar extends CGFobject {
  constructor(scene, slices, position) {
    super(scene);

    this.myCylinder = new MyCylinder(scene, slices);
    this.position = position;

    this.init(scene);
  }

  init(scene) {
    this.pillarTexture = new CGFtexture(scene, 'images/pillar/pillarTexture.jpg');

    this.pillarAppearance = new CGFappearance(scene);
    this.pillarAppearance.setAmbient(1.0, 1.0, 1.0, 1);     // MIGHT CHANGE THIS
    this.pillarAppearance.setDiffuse(1.0, 1.0, 1.0, 1);
    this.pillarAppearance.setSpecular(1.0, 1.0, 1.0, 1);
    this.pillarAppearance.setShininess(10);
    this.pillarAppearance.setTexture(this.pillarTexture);
    this.pillarAppearance.setTextureWrap('REPEAT', 'REPEAT');
  }


  display() {
    this.scene.pushMatrix();

    this.pillarAppearance.apply();

    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.scene.scale(1, 10, 1);

    this.myCylinder.display();

    this.scene.popMatrix();
  }

}
