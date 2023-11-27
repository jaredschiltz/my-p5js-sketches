class Circle extends Confetti {
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
    scale(1 / this.shape_scale);
    circle(0, 0, this.size);
    pop();
  }
}
