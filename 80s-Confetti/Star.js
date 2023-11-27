class Star extends Confetti {
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
    let radius1 = (this.size / 2) * 1.3;
    let radius2 = (this.size / 5) * 1.3;
    let npoints = 5;
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = 0 + cos(a) * radius2;
      let sy = 0 + sin(a) * radius2;
      vertex(sx, sy);
      sx = 0 + cos(a + halfAngle) * radius1;
      sy = 0 + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
}
