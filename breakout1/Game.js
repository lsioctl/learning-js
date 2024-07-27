import Ball from './Ball.js';
import Paddle from './Paddle.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;
    this.actors = [];
    this.score = 0;
    this.level = 1;
    this.isOver = false; 
    this.last = 0;
    this.isRunning = false;
    // rAF will may pickup a different refresh rate
    // but we will use 60Hz for our fixed timestep
    this.timeStep = 1000/60; 
    this.fpsDisplay = document.getElementById('fps');
    this.fps = 60;
    this.framesThisSecond = 0;
    this.lastFpsUpdate = 0;
    // classical this manual binding with ES6 Classes
    // It ensure that when for example game.loadLevel is
    // passed as a callback, this is not lost
    // https://javascript.info/bind#losing-this
    // Another way of doing it would be with "arrow methods"
    // https://javascript.info/class#making-bound-methods-with-class-fields
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
    this.last = window.performance.now();
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

  loopWithFixedStep() {
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
    let delta = 0;
    
    // Track the accumulated time that hasn't been simulated yet
    delta += now - this.last; // note += here
    this.last = now;

    // Simulate the total elapsed time in fixed-size chunks
    while (delta >= this.timeStep) {
      //console.log('yes');
      this.update(this.timeStep);
      delta -= this.timeStep;
      // note: input is handled in another loop (Event Loop)
      this.update(this.timeStep);
      this.testCollisions();
    };
    //console.log('no');
    this.draw();
  };

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
    let delta = 0;

    // no need to throttle FPS, it is handled by the browser
    delta = now - this.last; // note += here
    this.last = now;

    if (now > this.lastFpsUpdate + 1000) { // update every second
      this.fps = 0.25 * this.framesThisSecond + (1 - 0.25) * this.fps; // compute the new FPS
      this.lastFpsUpdate = now;
      this.framesThisSecond = 0;
    };
    this.framesThisSecond++;

    this.update(delta);
    this.testCollisions();
    this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS'; // display the FPS
    this.draw();
  };
};

export default Game;