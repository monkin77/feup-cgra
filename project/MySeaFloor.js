import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
*/
export class MySeaFloor extends CGFobject {
	constructor(scene, nrDivs, scaleFactor, offset) {
		super(scene);

		this.nrDivs = nrDivs;
        this.scaleFactor = scaleFactor;
        this.offset = offset;

        this.init(scene);
	}

    init(scene){
        this.seaFloor = new MyPlane(scene, this.nrDivs);

        // Sea Textures
        this.seaFloorTexture = new CGFtexture(scene, 'images/sandShell.png');  // floor
        this.seaFloorMapTexture = new CGFtexture(scene, 'images/sandShellMap2.png');   // floor map

        this.seaFloorAppearance = new CGFappearance(scene);
		this.seaFloorAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.seaFloorAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.seaFloorAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.seaFloorAppearance.setShininess(10);
        this.seaFloorAppearance.setTexture(this.seaFloorTexture);
		this.seaFloorAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // shaders
        this.seaFloorShader = new CGFshader(scene.gl, "shaders/mySeaFloor.vert", "shaders/mySeaFloor.frag");
        this.seaFloorShader.setUniformsValues( {uSampler2: 1, offset: this.offset} );		// The uSampler is already sent by default
    }
	
    display(){
        // Draw sea floor
        this.scene.pushMatrix();

        this.scene.setActiveShader(this.seaFloorShader);

        this.seaFloorTexture.bind();
        this.seaFloorMapTexture.bind(1);

        this.seaFloorAppearance.apply();

        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.seaFloor.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}
