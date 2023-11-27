class Squiggle3 extends Confetti {
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
    curveVertex(x + -40, y + 0.21450237517420945);
    curveVertex(x + -32, y + 4.472786538368636);
    curveVertex(x + -24, y + 2.5666132117052634);
    curveVertex(x + -16, y + -6.196987245073049);
    curveVertex(x + -8, y + -4.64298526849618);
    curveVertex(x + 0, y + 6.957897368845728);
    curveVertex(x + 8, y + 6.968556090018936);
    curveVertex(x + 16, y + 2.3883977409967017);
    curveVertex(x + 24, y + 8.482886955181222);
    curveVertex(x + 32, y + 5.773000082780602);
    endShape();
    pop();
  }
}
