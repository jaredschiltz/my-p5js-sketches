class Bird7 extends Bird {
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
    vertex(27.337, 20.4);
    bezierVertex(27.675, 19.529, 27.355, 17.478, 27.793, 16.107);
    bezierVertex(28.259, 14.652, 28.804, 12.69, 30.129, 11.672);
    bezierVertex(31.462, 10.647, 33.822, 10.04, 35.793, 9.96);
    bezierVertex(38.191, 9.863, 41.884, 10.405, 44.516, 11.091);
    bezierVertex(46.991, 11.737, 50.033, 12.81, 51.584, 14.079);
    bezierVertex(52.911, 15.165, 53.191, 17.345, 53.823, 18.709);
    bezierVertex(54.365, 19.881, 55.14, 20.991, 55.371, 22.263);
    bezierVertex(55.623, 23.654, 55.46, 25.918, 55.336, 27.052);
    bezierVertex(55.259, 27.759, 54.713, 28.359, 54.627, 29.065);
    bezierVertex(54.499, 30.12, 55.022, 32.061, 54.565, 33.382);
    bezierVertex(54.107, 34.703, 52.765, 36.066, 51.882, 36.991);
    bezierVertex(51.133, 37.775, 49.328, 37.846, 49.267, 38.929);
    bezierVertex(49.227, 39.646, 49.902, 39.98, 50.551, 41.571);
    bezierVertex(50.644, 41.8, 51.281, 43.284, 51.345, 43.511);
    bezierVertex(51.883, 45.427, 51.31, 47.159, 51.31, 47.159);
    vertex(49.344, 47.459);
    bezierVertex(49.344, 47.459, 49.05, 46.072, 49.062, 44.41);
    bezierVertex(49.071, 43.265, 48.703, 41.488, 48.539, 41.428);
    bezierVertex(48.001, 41.23, 47.366, 41.471, 45.13, 41.473);
    bezierVertex(43.582, 41.474, 41.336, 41.79, 39.803, 41.848);
    bezierVertex(38.513, 41.897, 36.496, 41.364, 35.931, 41.822);
    bezierVertex(35.496, 42.175, 35.238, 42.473, 35.238, 42.473);
    vertex(35.327, 44.071);
    bezierVertex(35.327, 44.071, 38.641, 45.266, 38.325, 45.555);
    bezierVertex(38.008, 45.845, 34.162, 46.063, 33.428, 45.809);
    bezierVertex(32.846, 45.607, 33.92, 44.028, 33.92, 44.028);
    vertex(33.97, 42.157);
    bezierVertex(33.97, 42.157, 34.148, 40.848, 33.89, 40.473);
    bezierVertex(33.29, 39.599, 31.519, 39.332, 30.59, 38.432);
    bezierVertex(29.384, 37.265, 27.535, 34.972, 26.658, 33.467);
    bezierVertex(25.94, 32.235, 25.549, 30.811, 25.324, 29.403);
    bezierVertex(25.063, 27.759, 25.013, 24.945, 25.086, 23.6);
    bezierVertex(25.129, 22.812, 25.389, 21.866, 25.764, 21.333);
    bezierVertex(26.115, 20.834, 27.116, 20.968, 27.337, 20.4);
    endShape();

    //End Shape
    pop();
  }
}
