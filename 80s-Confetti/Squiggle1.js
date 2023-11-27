class Squiggle1 extends Confetti {
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
    curveVertex(x + -40, y + -5.569475253062222);
    curveVertex(x + -32, y + -2.2232733572098917);
    curveVertex(x + -24, y + 4.646591844754212);
    curveVertex(x + -16, y + -0.38765992987692677);
    curveVertex(x + -8, y + -2.624667602673072);
    curveVertex(x + 0, y + 5.713643844235179);
    curveVertex(x + 8, y + 1.563382179288828);
    curveVertex(x + 16, y + 9.481488806060856);
    curveVertex(x + 24, y + 6.941265366294928);
    curveVertex(x + 32, y + 6.510429259528394);
    endShape();
    pop();
  }
}
