class Confetti {
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
    this.shape_scale = shape_scale;
    this.size = size;
    this.pos = createVector(x, y);
    this.rotation = rotation;
    this.colour = colour;
    this.linear_velocity = linear_velocity;
    this.rotational_velocity = rotational_velocity;
    this.is_alive = true;
  }

  update() {
    this.pos.y += this.linear_velocity;
    this.rotation += this.rotational_velocity;
    if (this.pos.y > height * 1.25) {
      this.is_alive = false;
    }
  }

  draw() {}
}
