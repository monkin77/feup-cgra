import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();
        
        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Display Green Diamond
        this.gui.add(this.scene, 'displayGreenDiamond').name('Display Green');

        //Display Pink Triangle
        this.gui.add(this.scene, 'displayPinkTriangle').name('Display Pink');

        //Display Orange Triangle
        this.gui.add(this.scene, 'displayOrangeTriangle').name('Display Orange');
        
        //Display Blue Triangle
        this.gui.add(this.scene, 'displayBlueTriangle').name('Display Blue');

        //Display Yellow Parallelogram;
        this.gui.add(this.scene, 'displayYellowParallelogram').name('Display Yellow');
        return true;
    }
}