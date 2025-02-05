class Bird2 extends Bird {
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
    vertex(59.538905, 28.933);
    vertex(52.919905, 23.716);
    bezierVertex(52.919905, 23.716, 47.091905, 20.611, 44.603905, 19.2);
    bezierVertex(42.369905, 17.933, 40.377905, 16.191, 37.989905, 15.247);
    bezierVertex(35.510905, 14.268, 32.015905, 14.045, 29.729905, 13.322);
    bezierVertex(27.832905, 12.722, 26.176905, 11.477, 24.269905, 10.908);
    bezierVertex(22.251905, 10.306, 19.853905, 9.454, 17.618905, 9.709);
    bezierVertex(15.383905, 9.964, 12.443905, 11.34, 10.860905, 12.439);
    bezierVertex(9.563905, 13.339, 9.137905, 15.095, 8.119905, 16.302);
    bezierVertex(6.955905, 17.681, 3.761905, 19.792, 3.881905, 20.711);
    bezierVertex(4.001905, 21.631, 7.706905, 21.046, 8.839905, 21.819);
    bezierVertex(9.935905, 22.567, 10.164905, 24.498, 10.679905, 25.349);
    bezierVertex(11.026905, 25.922, 11.761905, 26.274, 11.930905, 26.922);
    bezierVertex(12.232905, 28.088, 11.582905, 30.774, 12.495905, 32.346);
    bezierVertex(13.664905, 34.361, 16.528905, 37.403, 18.943905, 39.008);
    bezierVertex(21.324905, 40.589, 26.130905, 41.072, 26.988905, 41.974);
    bezierVertex(27.846905, 42.876, 23.992905, 43.186, 24.093905, 44.421);
    bezierVertex(24.195905, 45.656, 26.434905, 48.676, 27.597905, 49.385);
    bezierVertex(28.607905, 50.001, 30.801905, 48.938, 31.074905, 48.676);
    bezierVertex(31.346905, 48.413, 29.609905, 48.182, 29.232905, 47.811);
    bezierVertex(28.937905, 47.521, 28.873905, 47.547, 29.407905, 45.973);
    bezierVertex(29.627905, 45.324, 31.181905, 45.597, 32.081905, 45.597);
    bezierVertex(33.512905, 45.597, 36.628905, 45.66, 37.992905, 45.973);
    bezierVertex(38.879905, 46.176, 40.271905, 47.473, 40.271905, 47.473);
    vertex(40.432905, 48.896);
    vertex(41.468905, 50.315);
    vertex(44.519905, 50.763);
    vertex(42.915905, 49.003);
    vertex(42.825905, 47.473);
    bezierVertex(42.825905, 47.473, 42.716905, 44.724, 43.731905, 44.448);
    bezierVertex(44.784905, 44.162, 47.338905, 46.034, 49.142905, 45.757);
    bezierVertex(50.945905, 45.481, 52.982905, 43.336, 54.554905, 42.788);
    bezierVertex(55.822905, 42.346, 57.338905, 42.178, 58.571905, 42.468);
    bezierVertex(59.803905, 42.757, 60.737905, 44.008, 61.950905, 44.524);
    bezierVertex(63.728905, 45.281, 67.210905, 46.11, 69.238905, 47.006);
    bezierVertex(70.966905, 47.769, 73.041905, 49.51, 74.113905, 49.897);
    bezierVertex(74.633905, 50.085, 75.677905, 49.754, 75.671905, 49.33);
    bezierVertex(75.666905, 48.905, 73.960905, 47.567, 74.080905, 47.35);
    bezierVertex(74.201905, 47.133, 75.917905, 48.128, 76.396905, 48.03);
    bezierVertex(76.848905, 47.938, 77.281905, 47.087, 76.954905, 46.763);
    bezierVertex(76.549905, 46.362, 74.845905, 46.226, 73.966905, 45.623);
    bezierVertex(72.542905, 44.647, 70.237905, 42.47, 68.409905, 40.904);
    bezierVertex(66.599905, 39.352, 64.483905, 37.665, 62.998905, 36.226);
    bezierVertex(61.734905, 35, 60.244905, 33.178, 59.500905, 32.267);
    endShape();

    //End Shape
    pop();
  }
}
