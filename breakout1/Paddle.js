class Paddle {
  constructor(canvasWidth, canvasHeight, ctx) {
    this.color = "#0095AA";
    this.radius = 20;
    this.speed = 0.5;
    this.dx = 0;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 75;
    this.height = 10;
    this.x = (this.canvasWidth - this.width)/2;

    this.rightPressed = false;
    this.leftPressed = false;

    // need to bind this because addEventListener binds
    // to the target
    this.keydownHandler = this.keydownHandler.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);

    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
  };

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.canvasHeight - this.height, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  };

  keydownHandler(e) {
    // note: Left/Right would be needed for IE/Edge
    if (e.key == 'ArrowLeft') {
      this.leftPressed = true;
      // avoid stuff like scrolling
      e.preventDefault();
    };
    if (e.key == 'ArrowRight') {
      this.rightPressed = true;
      // avoid stuff like scrolling
      e.preventDefault();
    };
  };

  keyupHandler(e) {
    // note: Left/Right would be needed for IE/Edge
    if (e.key == 'ArrowLeft') {
      this.leftPressed = false;
      // avoid stuff like scrolling
      e.preventDefault();
    };
    if (e.key == 'ArrowRight') {
      this.rightPressed = false;
      // avoid stuff like scrolling
      e.preventDefault();
    };
  }

  update(delta) {
    if (this.leftPressed && (this.x > 0)) {
      this.dx = -1;
    };
    if (this.rightPressed && (this.x + this.width < this.canvasWidth)) {
      this.dx = 1;
    };
    this.x += this.dx * this.speed * delta;
    // reset dx
    this.dx = 0;
  };
};

export default Paddle;