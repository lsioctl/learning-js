import Ball from './Ball.js';
import Paddle from './Paddle.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
let x = canvasWidth / 2;
let y = canvasHeight - 30;
let last = 0;
let delta = 0;
const actors = [];


const ball = new Ball(x, y, canvasWidth, canvasHeight, ctx);
const paddle = new Paddle(canvasWidth, canvasHeight, ctx);
actors.push(ball);
actors.push(paddle);
console.log(actors);

function update(delta) {
  console.log('updating actors');
  actors.forEach((actor) => {
    actor.update(delta);
  })
}

function draw() {
  actors.forEach((actor) => {
    actor.draw();
  })
}

function preFrame() {
  // Ensure this function will be called before rendering the next frame
  window.requestAnimationFrame(preFrame);
  // FPS throttling
  // Note: it seems to not be needed as requestAnimationFrame syncs with the monitor
  // refresh rate
  const now = window.performance.now();
  if ((now - last) >= 16) {
    //console.log(now);
    //console.log(tFrame);
    delta = now - last;
    //console.log(delta);
    last = now;

    // note: input is handled in another loop (Event Loop)
    update(delta);
    draw(delta);
  }
};

// use requestAnimationFrame instead of timeout for the non blocking game loop
// in the main JS thread
// preFrame will be exectuted in the main JS thread before the
// next frame
window.requestAnimationFrame(preFrame);
