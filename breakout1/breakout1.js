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
const ball = new Ball(x, y, canvasWidth, canvasHeight, ctx);
const paddle = new Paddle(canvasWidth, canvasHeight, ctx);
console.log(paddle);


function draw() {
    // Request another frame
    window.requestAnimationFrame(draw);
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
        ball.update(delta);
        ball.draw();
        paddle.update(delta);
        paddle.draw();
    }
};


// draw will be called every 10ms
// this is clumsy, it tries to fit the 16ms for 60 FPS
// const interval = setInterval(draw, 10);

// let's try with request Animation Frame
window.requestAnimationFrame(draw);


