/**
 * I use here ES6 modules and classes but it is more for code splitting
 * than encapsulation. The Player instance will modify the main.js
 * scope referenced below as the Scene Object, and we do not have
 * real private methods and properties
 */

class Bomb {

    // Looking at the source code and with debugging
    // it seems that 'this' called in update, create, ...
    // on main.js is a Scene object
    // we keep here a reference to this Scene
    constructor(scene) {
        this._scene = scene;
    }
     
    // prepare the player sprites
    preload() {
        this._scene.load.image('bomb', 'assets/bomb.png');
    }

    create() {
        this.bombPhysics = this._scene.physics.add.group();
    }

    getPhysics() {
        return this.bombPhysics;
    }

    spawnBombs(playerPhysics) {
        const x = (playerPhysics.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = this.bombPhysics.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

export { Bomb };
