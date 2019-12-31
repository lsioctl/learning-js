class Ball {
  constructor(x, y, canvasWidth, canvasHeight, ctx) {
    this.x = x;
    this.y = y;
    this.color = "#0095DD";
    this.radius = 20;
    this.speed = 0.5;
    this.dx = 1;
    this.dy = - this.dx;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  draw() {
    // we clear all the canvas with clearRect
    // void ctx.clearRect(x, y, width, height);
    // TODO: is this optimized ?
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.ctx.beginPath();
    // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update(delta) {
    if ((this.x + this.radius > this.canvasWidth && this.dx > 0)
            || (this.x - this.radius < 0 && this.dx < 0)) {
            this.dx = - this.dx;
        };

        if ((this.y + this.radius > this.canvasHeight && this.dy > 0)
            || (this.y - this.radius < 0 && this.dy < 0)) {
            this.dy = - this.dy;
        };

        this.x += this.dx * delta;
        this.y += this.dy * delta;
        console.log(this.x +' '+ this.y);
  }
}

export default Ball;