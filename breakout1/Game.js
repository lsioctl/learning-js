import Ball from './Ball.js';
import Paddle from './Paddle.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;
    this.delta = 0;
    this.actors = [];
    this.score = 0;
    this.level = 1;
    this.isOver = false; 
    this.last = 0;
    this.isRunning = false;
    // classical this manual binding with ES6 Classes
    this.loadLevel = this.loadLevel.bind(this);
    this.startLevel = this.startLevel.bind(this);
    this.update = this.update.bind(this);
    this.testCollisions = this.testCollisions.bind(this);
    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
  };

  loadLevel() {
    // reset the actor array
    this.actors = [];
    // trust the garbage collector for all actors not in use
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    // take care of the order, as I want paddle to be updated
    // before ball for better collision detection (not sure of that)
    // no: we should update all object and then detect collisions
    this.actors.push(this.paddle);
    this.actors.push(this.ball);
    this.draw();
  }

  // also used to restart level
  startLevel() {
    this.score = 0;
    this.isRunning = true;
    this.isOver = false;
    this.loadLevel();
    this.loop();
  };

  update(delta) {
    this.actors.forEach((actor) => {
      actor.update(delta);
    });
  };

  testCollisions() {
    this.paddle.testCollisionWithBall(this.ball);
  };

  draw() {
    // We first clear all the canvas with clearRect
    // void ctx.clearRect(x, y, width, height);
    // TODO: is this optimized ?
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    // Then draw the actors
    this.actors.forEach((actor) => {
      actor.draw();
    });
  };

  promptrestart() {
    console.log('game over');
  }

  loop() {
    if (this.isOver || !this.isRunning) {
      this.promptrestart();
      return 1;
    };
    // use requestAnimationFrame instead of timeout for the non blocking game loop
    // in the main JS thread
    // loop will be exectuted in the main JS thread before the next frame
    window.requestAnimationFrame(this.loop);
    // FPS throttling
    // Note: it seems to not be needed as requestAnimationFrame syncs with the monitor
    // refresh rate
    const now = window.performance.now();
    if ((now - this.last) >= 16) {
      //console.log(now);
      //console.log(tFrame);
      const delta = now - this.last;
      //console.log(delta);
      this.last = now;

      // note: input is handled in another loop (Event Loop)
      this.update(delta);
      this.testCollisions();
      this.draw(delta);
    };
  };
};

export default Game;