class Bird25 extends Bird {
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
    vertex(34.578, 7.088);
    bezierVertex(35.49, 6.321, 35.604, 4.83, 36.372, 3.996);
    bezierVertex(37.14, 3.163, 38.07, 2.284, 39.186, 2.088);
    bezierVertex(40.372, 1.881, 42.575, 2.122, 43.485, 2.75);
    bezierVertex(44.395, 3.378, 44.277, 5.09, 44.647, 5.857);
    bezierVertex(44.913, 6.409, 45.168, 7.068, 45.707, 7.357);
    bezierVertex(46.863, 7.976, 50.128, 8.419, 51.584, 9.572);
    bezierVertex(53.021, 10.71, 53.53, 12.757, 54.439, 14.274);
    bezierVertex(55.315, 15.735, 56.572, 17.034, 57.041, 18.672);
    bezierVertex(57.636, 20.75, 58.163, 24.035, 58.01, 26.739);
    bezierVertex(57.848, 29.609, 56.839, 32.87, 56.069, 35.892);
    bezierVertex(55.276, 39.007, 53.973, 43.44, 53.251, 45.429);
    bezierVertex(52.928, 46.318, 52.011, 46.922, 51.735, 47.827);
    bezierVertex(51.325, 49.174, 51.212, 51.773, 50.787, 53.517);
    bezierVertex(50.39, 55.147, 49.187, 56.613, 49.189, 58.291);
    bezierVertex(49.193, 61.196, 50.995, 68.085, 50.813, 70.95);
    bezierVertex(50.701, 72.708, 49.001, 74.397, 48.094, 75.483);
    bezierVertex(47.374, 76.344, 46.221, 77.175, 45.37, 77.463);
    bezierVertex(44.614, 77.719, 43.785, 77.151, 42.989, 77.212);
    bezierVertex(42.113, 77.279, 40.95, 77.747, 40.117, 77.866);
    bezierVertex(39.416, 77.965, 38.605, 78.278, 37.992, 77.922);
    bezierVertex(36.864, 77.266, 33.889, 75.899, 33.35, 73.931);
    bezierVertex(32.621, 71.267, 33.941, 65.744, 33.619, 61.934);
    bezierVertex(33.307, 58.251, 31.999, 52.973, 31.418, 51.067);
    bezierVertex(31.281, 50.618, 30.351, 50.911, 30.13, 50.497);
    bezierVertex(29.762, 49.81, 29.488, 48.138, 29.214, 46.947);
    bezierVertex(28.907, 45.609, 28.744, 43.923, 28.286, 42.469);
    bezierVertex(27.705, 40.626, 26.482, 38.12, 25.729, 35.892);
    bezierVertex(24.891, 33.412, 23.544, 30.462, 23.258, 27.588);
    bezierVertex(22.957, 24.551, 23.464, 19.769, 23.919, 17.666);
    bezierVertex(24.159, 16.558, 25.424, 15.802, 25.991, 14.969);
    bezierVertex(26.489, 14.238, 26.793, 13.381, 27.32, 12.67);
    bezierVertex(28.059, 11.674, 29.217, 9.923, 30.427, 8.993);
    bezierVertex(31.634, 8.065, 33.587, 7.921, 34.578, 7.088);
    endShape();

    //End Shape
    pop();
  }
}
