// Circle Packing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/050.1-circlepackinganimated.html
// https://thecodingtrain.com/CodingChallenges/050.2-circlepackingimage.html

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// Image (Text): https://editor.p5js.org/codingtrain/sketches/wxGRAd4I-
// Image (Kitten): https://editor.p5js.org/codingtrain/sketches/tRpryH_um

class Circle {
  constructor(position, radius, colour) {
    this.position = position;
    this.radius = radius;
    this.colour = colour;
  }

  render() {
    fill(this.colour);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }
}
