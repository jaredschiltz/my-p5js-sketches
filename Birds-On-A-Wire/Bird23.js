class Bird23 extends Bird {
  constructor(position, colour, scaling_factor) {
    super(position, colour, scaling_factor);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    scale(
      this.scaling_factor / this.original_size,
      this.scaling_factor / this.original_size
    );

    noStroke();
    fill(this.colour);
    //Start Shape

    beginShape();
    vertex(28.005, 14.16);
    bezierVertex(28.751, 12.918, 29.081, 11.429, 29.965, 10.281);
    bezierVertex(31.038, 8.889, 32.846, 6.889, 34.441, 5.808);
    bezierVertex(35.952, 4.784, 37.907, 4.045, 39.535, 3.796);
    bezierVertex(41.083, 3.558, 43.1, 3.571, 44.206, 4.31);
    bezierVertex(45.312, 5.049, 45.421, 7.375, 46.17, 8.229);
    bezierVertex(46.784, 8.929, 48.694, 9.109, 48.695, 9.429);
    bezierVertex(48.696, 9.749, 46.761, 9.646, 46.176, 10.15);
    bezierVertex(45.592, 10.654, 44.735, 11.753, 45.189, 12.454);
    bezierVertex(45.893, 13.54, 49.192, 14.785, 50.399, 16.663);
    bezierVertex(51.965, 19.1, 53.908, 23.398, 54.586, 27.078);
    bezierVertex(55.498, 32.021, 55.809, 42.814, 55.869, 46.323);
    bezierVertex(55.88, 47.001, 54.974, 47.458, 54.946, 48.135);
    bezierVertex(54.866, 50.107, 54.672, 54.889, 55.387, 58.155);
    bezierVertex(56.164, 61.706, 59.227, 66.743, 59.609, 69.442);
    bezierVertex(59.855, 71.183, 58.6, 73.491, 57.677, 74.351);
    bezierVertex(56.795, 75.172, 55.098, 74.257, 54.07, 74.6);
    bezierVertex(53.079, 74.93, 52.278, 76.22, 51.509, 76.406);
    bezierVertex(50.806, 76.575, 50.019, 76.163, 49.453, 75.714);
    bezierVertex(48.604, 75.04, 47.064, 73.725, 46.418, 72.364);
    bezierVertex(45.608, 70.655, 45.736, 67.55, 44.593, 65.463);
    bezierVertex(42.71, 62.025, 37.665, 55.092, 35.124, 51.734);
    bezierVertex(33.386, 49.437, 30.897, 47.331, 29.346, 45.312);
    bezierVertex(27.987, 43.542, 26.826, 41.102, 25.821, 39.619);
    bezierVertex(25.06, 38.496, 23.754, 37.696, 23.318, 36.413);
    bezierVertex(22.707, 34.617, 22.283, 31.095, 22.155, 28.846);
    bezierVertex(22.042, 26.869, 22.007, 24.751, 22.55, 22.918);
    bezierVertex(23.094, 21.086, 24.507, 19.31, 25.417, 17.85);
    bezierVertex(26.211, 16.575, 27.247, 15.421, 28.005, 14.16);
    endShape();

    //End Shape
    pop();
  }
}
