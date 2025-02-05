class Bird8 extends Bird {
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
    vertex(53.22193, 20.4);
    bezierVertex(52.88393, 19.529, 53.20393, 17.478, 52.76593, 16.107);
    bezierVertex(52.29993, 14.652, 51.75493, 12.69, 50.42993, 11.672);
    bezierVertex(49.09693, 10.647, 46.73693, 10.04, 44.76593, 9.96);
    bezierVertex(42.36793, 9.863, 38.67493, 10.405, 36.04293, 11.091);
    bezierVertex(33.56793, 11.737, 30.52593, 12.81, 28.97493, 14.079);
    bezierVertex(27.64793, 15.165, 27.36793, 17.345, 26.73593, 18.709);
    bezierVertex(26.19393, 19.881, 25.41893, 20.991, 25.18793, 22.263);
    bezierVertex(24.93593, 23.654, 25.09893, 25.918, 25.22293, 27.052);
    bezierVertex(25.29993, 27.759, 25.84593, 28.359, 25.93193, 29.065);
    bezierVertex(26.05993, 30.12, 25.53693, 32.061, 25.99393, 33.382);
    bezierVertex(26.45193, 34.703, 27.79393, 36.066, 28.67693, 36.991);
    bezierVertex(29.42593, 37.775, 31.23093, 37.846, 31.29193, 38.929);
    bezierVertex(31.33193, 39.646, 30.65693, 39.98, 30.00793, 41.571);
    bezierVertex(29.91493, 41.8, 29.27793, 43.284, 29.21393, 43.511);
    bezierVertex(28.67593, 45.427, 29.24893, 47.159, 29.24893, 47.159);
    vertex(31.21493, 47.459);
    bezierVertex(31.21493, 47.459, 31.50893, 46.072, 31.49693, 44.41);
    bezierVertex(31.48793, 43.265, 31.85593, 41.488, 32.01993, 41.428);
    bezierVertex(32.55793, 41.23, 33.19293, 41.471, 35.42893, 41.473);
    bezierVertex(36.97693, 41.474, 39.22293, 41.79, 40.75593, 41.848);
    bezierVertex(42.04593, 41.897, 44.06293, 41.364, 44.62793, 41.822);
    bezierVertex(45.06293, 42.175, 45.32093, 42.473, 45.32093, 42.473);
    vertex(45.23193, 44.071);
    bezierVertex(45.23193, 44.071, 41.91793, 45.266, 42.23393, 45.555);
    bezierVertex(42.55093, 45.845, 46.39693, 46.063, 47.13093, 45.809);
    bezierVertex(47.71293, 45.607, 46.63893, 44.028, 46.63893, 44.028);
    vertex(46.58893, 42.157);
    bezierVertex(46.58893, 42.157, 46.41093, 40.848, 46.66893, 40.473);
    bezierVertex(47.26893, 39.599, 49.03993, 39.332, 49.96893, 38.432);
    bezierVertex(51.17493, 37.265, 53.02393, 34.972, 53.90093, 33.467);
    bezierVertex(54.61893, 32.235, 55.00993, 30.811, 55.23493, 29.403);
    bezierVertex(55.49593, 27.759, 55.54593, 24.945, 55.47293, 23.6);
    bezierVertex(55.42993, 22.812, 55.16993, 21.866, 54.79493, 21.333);
    bezierVertex(54.44393, 20.834, 53.44293, 20.968, 53.22193, 20.4);
    endShape();

    //End Shape
    pop();
  }
}
