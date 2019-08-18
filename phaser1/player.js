/**
 * I use here ES6 modules and classes but it is more for code splitting
 * than encapsulation. The Player instance will modify the main.js
 * scope referenced below as the Scene Object, and we do not have
 * real private methods and properties
 */

class Player {

    // Looking at the source code and with debugging
    // it seems that 'this' called in update, create, ...
    // on main.js is a Scene object
    // we keep here a reference to this Scene
    constructor(scene) {
        this._scene = scene;
    }
     
    // prepare the player sprites
    preload() {
        this._scene.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.playerPhysics = this._scene.physics.add.sprite(100, 450, 'dude');

        this.playerPhysics.setBounce(0.2);
        this.playerPhysics.setCollideWorldBounds(true);

        this._scene.anims.create({
            key: 'left',
            frames: this._scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this._scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this._scene.anims.create({
            key: 'right',
            frames: this._scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    getPhysics() {
        return this.playerPhysics;
    }

    hitBomb() {
        this.playerPhysics.setTint(0xff0000);
        this.playerPhysics.anims.play('turn');
    }

    update(cursors) {
        if (cursors.left.isDown) {
            this.playerPhysics.setVelocityX(-160);
            this.playerPhysics.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.playerPhysics.setVelocityX(160);
            this.playerPhysics.anims.play('right', true);
        } else {
            this.playerPhysics.setVelocityX(0);
            this.playerPhysics.anims.play('turn');
        }

        if (cursors.up.isDown && this.playerPhysics.body.touching.down) {
            this.playerPhysics.setVelocityY(-330);
        }
    }
}

export { Player };
