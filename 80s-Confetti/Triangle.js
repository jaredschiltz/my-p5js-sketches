class Triangle extends Confetti {
  constructor(
    x,
    y,
    size,
    shape_scale,
    rotation,
    colour,
    linear_velocity,
    rotational_velocity
  ) {
    super(
      x,
      y,
      size,
      shape_scale,
      rotation,
      colour,
      linear_velocity,
      rotational_velocity
    );
  }

  draw() {
    noStroke();
    fill(this.colour);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    scale(1 / this.shape_scale);
    let radial = (this.size * sin(PI / 6)) / sin(TWO_PI / 3);
    let x1 = 0 - this.size / 2;
    let y1 = 0 + (tan(PI / 6) * this.size) / 2;
    let x2 = 0 + this.size / 2;
    let y2 = y1;
    let x3 = 0;
    let y3 = 0 - radial;
    triangle(x1, y1, x2, y2, x3, y3);
    pop();
  }
}
