class Ball {
  constructor(game) {
    // just to check the state of the game object should not be yet fully
    // initialized
    console.dir(game);
    this.game = game;
    this.color = "#0095DD";
    this.radius = 20;
    this.speed = 0.5;
    this.dx = 1;
    this.dy = - this.dx;
    this.ctx = game.ctx;
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;
    this.x = this.canvasWidth / 2;
    this.y = this.canvasHeight - 30;
  };

  draw() {
    this.ctx.beginPath();
    // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  };

  collideWithPaddle() {
    this.dy *= -1;
  }

  update(delta) {
    if (
    (this.x + this.radius > this.canvasWidth && this.dx > 0)
    || (this.x - this.radius < 0 && this.dx < 0)
    ) {
      this.dx *= -1;
    };

    if (this.y - this.radius < 0 && this.dy < 0) {
      this.dy *= -1;
    };

    if (this.y > this.canvasHeight) { 
      this.game.isOver = true;
    }

    this.x += this.dx * delta;
    this.y += this.dy * delta;
  };
};

export default Ball;