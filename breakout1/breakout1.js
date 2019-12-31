const canvas = document.getElementById('myCanvas');

const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let x = canvasWidth / 2;
let y = canvasHeight - 30;
const ballRadius = 20;
let dx = 0.5;
let dy = -dx;
let start = 0;
let last = 0;
let delta = 0;

function drawBall() {
    ctx.beginPath();
    // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(tFrame) {

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
        console.log(delta);
        last = now;
        // we clear all the canvas with clearRect
        // void ctx.clearRect(x, y, width, height);
        // TODO: is this optimized ?
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        drawBall();

        if ((x + ballRadius > canvasWidth && dx > 0)
            || (x - ballRadius < 0 && dx < 0)) {
            dx = -dx;
        };

        if ((y + ballRadius > canvasHeight && dy > 0)
            || (y - ballRadius < 0 && dy < 0)) {
            dy = -dy;
        };

        x += dx * delta;
        y += dy * delta;
        console.log(x +' '+ y);
    }
};



// draw will be called every 10ms
// this is clumsy, it tries to fit the 16ms for 60 FPS
// const interval = setInterval(draw, 10);

// let's try with request Animation Frame
window.requestAnimationFrame(draw);


