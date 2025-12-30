class Ball {
  constructor(pos, max_pos, speed, colour) {
    this.pos = pos;
    this.max_pos = max_pos;
    this.velocityVector = p5.Vector.random2D();
    this.speed = speed;
    this.velocityVector.mult(this.speed);
    this.colour = colour;
  }

  update() {
    this.pos.add(this.velocityVector);

    if (this.pos.y >= this.max_pos.y || this.pos.y <= 0) {
      this.velocityVector.y = this.velocityVector.y * -1;
    }

    if (this.pos.x >= this.max_pos.x || this.pos.x <= 0) {
      this.velocityVector.x = this.velocityVector.x * -1;
    }
  }

  get_pos() {
    //print(createVector(floor(this.pos.x), floor(this.pos.y)));
    return createVector(floor(this.pos.x), floor(this.pos.y));
  }

  get_colour() {
    return this.colour;
  }
}
