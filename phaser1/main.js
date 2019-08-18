import { Player } from './player.js';
import { Bomb } from './bomb.js';

let platforms;
let player;
let playerPhysics;
let cursors;
let stars;
let scoreText;
let score = 0;
let gameOver = false;
let levelFinished = false;
let bombs;
let bomb;
let bombPhysics;

function hitBomb() {
    this.physics.pause();

    player.hitBomb();

    gameOver = true;
}

function createPlatforms() {
    // this has been bound by call
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${score}`);
    bomb.spawnBombs(player);
    if (stars.countActive(true) === 0) {
        levelFinished = true;
    }
}

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    bomb = new Bomb(this);
    bomb.preload();
    player = new Player(this);
    player.preload();
}

function create() {
    console.log(this);
    this.add.image(400, 300, 'sky');
    createPlatforms.call(this);

    player.create();
    playerPhysics = player.getPhysics();

    bomb.create();
    bombs = bomb.getPhysics();

    console.log(playerPhysics);
    console.log(player);

    this.physics.add.collider(playerPhysics, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(playerPhysics, bombs, hitBomb, null, this);

    this.physics.add.overlap(playerPhysics, stars, collectStar, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '10px', fill: '#000' });
}

function update() {
    if (gameOver) {
        scoreText.setText('GAME OVER');
        return;
    }
    if (levelFinished) {
        scoreText.setText('LEVEL FINISHED !!!');
    }
    
    player.update(cursors);
}

const config = {
    // we let Phaser choose the rendering context
    // by default it is WEBGL, and fallback on CANVAS
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
console.log(game);
console.log(config);
console.log(this);








