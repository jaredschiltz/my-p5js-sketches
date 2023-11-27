class Squiggle2 extends Confetti {
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
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    scale(1 / this.shape_scale);
    noFill();
    stroke(this.colour);
    strokeWeight(7);
    beginShape();
    let x = 0;
    let y = 0;
    curveVertex(x + -40, y + 8.269787070364693);
    curveVertex(x + -32, y + 2.680480318674592);
    curveVertex(x + -24, y + -5.747145433162908);
    curveVertex(x + -16, y + 7.33444997813104);
    curveVertex(x + -8, y + 7.739710888101786);
    curveVertex(x + 0, y + -3.8056601423350678);
    curveVertex(x + 8, y + 8.127594630358068);
    curveVertex(x + 16, y + 5.905357420847842);
    curveVertex(x + 24, y + -8.732120509787965);
    curveVertex(x + 32, y + 7.694042267667257);
    endShape();
    pop();
  }
}
