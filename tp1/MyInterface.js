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

        // Triangle element
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        // Diamond element
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        // Parallelogram element
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallel...');

        // Small Triangle element
        this.gui.add(this.scene, 'displaySmallTriangle').name('Display Small T');       // The gui does not have space for the full name

        // Big Triangle element
        this.gui.add(this.scene, 'displayBigTriangle').name('Display Big T');

        return true;
    }
}