class Bird27 extends Bird {
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
    vertex(32.304, 8.098);
    bezierVertex(31.158, 9.107, 29.234, 9.398, 28.237, 10.201);
    bezierVertex(27.375, 10.895, 26.741, 12.232, 26.321, 12.913);
    bezierVertex(26.059, 13.34, 26.045, 13.911, 25.719, 14.291);
    bezierVertex(25.385, 14.68, 24.419, 14.691, 24.32, 15.247);
    bezierVertex(23.912, 17.537, 23.114, 24.388, 23.269, 28.031);
    bezierVertex(23.401, 31.124, 24.436, 34.479, 25.25, 37.103);
    bezierVertex(25.968, 39.421, 27.687, 41.963, 28.15, 43.778);
    bezierVertex(28.498, 45.141, 27.688, 46.982, 28.029, 47.994);
    bezierVertex(28.334, 48.896, 29.488, 49.486, 30.2, 49.851);
    bezierVertex(30.831, 50.175, 31.944, 49.573, 32.302, 50.185);
    bezierVertex(33.211, 51.737, 35.182, 56.003, 35.652, 59.162);
    bezierVertex(36.237, 63.093, 35.038, 70.766, 35.81, 73.769);
    bezierVertex(36.277, 75.586, 39.004, 76.466, 40.282, 77.185);
    bezierVertex(41.246, 77.727, 42.483, 78.135, 43.478, 78.083);
    bezierVertex(44.473, 78.032, 45.244, 76.913, 46.252, 76.875);
    bezierVertex(47.361, 76.835, 48.986, 78.519, 50.13, 77.838);
    bezierVertex(51.536, 77.001, 54.249, 74.322, 54.686, 71.853);
    bezierVertex(55.137, 69.308, 53.059, 65.713, 52.837, 62.564);
    bezierVertex(52.555, 58.565, 52.66, 50.488, 52.995, 47.86);
    bezierVertex(53.085, 47.154, 54.528, 47.433, 54.847, 46.796);
    bezierVertex(55.36, 45.772, 55.824, 43.037, 56.076, 41.716);
    bezierVertex(56.255, 40.779, 56.119, 39.792, 56.361, 38.869);
    bezierVertex(56.634, 37.827, 57.547, 36.548, 57.717, 35.46);
    bezierVertex(57.878, 34.427, 57.423, 33.387, 57.382, 32.342);
    bezierVertex(57.268, 29.452, 57.961, 21.57, 57.03, 18.122);
    bezierVertex(56.307, 15.445, 53.929, 13.164, 51.794, 11.656);
    bezierVertex(49.659, 10.149, 45.536, 10.218, 44.222, 9.076);
    bezierVertex(43.143, 8.139, 44.524, 5.797, 43.909, 4.801);
    bezierVertex(43.293, 3.806, 41.772, 3.306, 40.527, 3.104);
    bezierVertex(39.185, 2.887, 37.19, 2.686, 35.854, 3.497);
    bezierVertex(34.483, 4.33, 33.574, 6.981, 32.304, 8.098);
    endShape();

    //End Shape
    pop();
  }
}
