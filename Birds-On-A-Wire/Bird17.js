class Bird17 extends Bird {
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
    vertex(20.48, 15.166);
    bezierVertex(20.379, 15.457, 21.717, 15.877, 22.376, 16.143);
    bezierVertex(23.05, 16.414, 23.906, 16.375, 24.525, 16.795);
    bezierVertex(25.161, 17.227, 25.713, 18.028, 26.192, 18.733);
    bezierVertex(26.736, 19.532, 27.133, 20.72, 27.788, 21.593);
    bezierVertex(28.476, 22.511, 29.869, 23.104, 30.321, 24.238);
    bezierVertex(30.819, 25.492, 30.667, 27.485, 30.781, 29.114);
    bezierVertex(30.905, 30.892, 31.055, 33.106, 31.064, 34.909);
    bezierVertex(31.072, 36.586, 30.846, 38.486, 30.832, 39.932);
    bezierVertex(30.82, 41.152, 30.7, 42.742, 30.98, 43.588);
    bezierVertex(31.198, 44.25, 32.121, 44.535, 32.51, 45.014);
    bezierVertex(32.858, 45.442, 32.913, 46.083, 33.314, 46.462);
    bezierVertex(34.209, 47.306, 36.441, 48.773, 37.877, 50.079);
    bezierVertex(39.649, 51.691, 42.244, 53.84, 43.95, 56.133);
    bezierVertex(45.817, 58.644, 47.936, 62.157, 49.079, 65.143);
    bezierVertex(50.16, 67.967, 50.467, 72.054, 50.807, 74.048);
    bezierVertex(50.979, 75.059, 50.765, 76.145, 51.118, 77.108);
    bezierVertex(51.507, 78.171, 52.002, 79.925, 53.141, 80.425);
    bezierVertex(54.281, 80.926, 56.757, 80.632, 57.956, 80.11);
    bezierVertex(59.084, 79.618, 60.176, 78.51, 60.337, 77.29);
    bezierVertex(60.517, 75.926, 59.426, 73.724, 59.035, 71.926);
    bezierVertex(58.644, 70.125, 58.109, 68.155, 57.99, 66.481);
    bezierVertex(57.88, 64.949, 58.059, 63.399, 58.318, 61.884);
    bezierVertex(58.588, 60.307, 59.394, 58.68, 59.608, 57.014);
    bezierVertex(59.916, 54.619, 60.164, 50.687, 60.163, 47.516);
    bezierVertex(60.162, 44.04, 59.939, 38.8, 59.605, 36.16);
    bezierVertex(59.408, 34.602, 58.93, 33.044, 58.16, 31.676);
    bezierVertex(57.069, 29.738, 55.112, 26.619, 53.062, 24.531);
    bezierVertex(50.855, 22.282, 46.828, 19.952, 44.917, 18.183);
    bezierVertex(43.594, 16.958, 42.882, 15.177, 41.595, 13.914);
    bezierVertex(40.293, 12.636, 38.642, 11.265, 37.105, 10.515);
    bezierVertex(35.65, 9.804, 33.836, 9.196, 32.374, 9.412);
    bezierVertex(30.911, 9.628, 29.534, 11.075, 28.33, 11.81);
    bezierVertex(27.26, 12.463, 26.041, 13.388, 25.15, 13.819);
    bezierVertex(24.477, 14.145, 23.701, 14.189, 22.983, 14.397);
    bezierVertex(22.205, 14.621, 20.581, 14.875, 20.48, 15.166);
    endShape();

    //End Shape
    pop();
  }
}
