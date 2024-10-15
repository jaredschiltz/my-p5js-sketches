class Bird3 extends Bird {
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
    vertex(31.7385, 13.805);
    bezierVertex(32.3615, 12.911, 32.5505, 11.742, 33.2485, 10.904);
    bezierVertex(34.0115, 9.99, 35.2265, 9.093, 36.3155, 8.316);
    bezierVertex(37.4695, 7.494, 38.7615, 6.379, 40.1735, 5.969);
    bezierVertex(41.5855, 5.56, 43.4685, 5.604, 44.7855, 5.86);
    bezierVertex(45.9875, 6.093, 47.0915, 7.005, 48.0705, 7.504);
    bezierVertex(48.9375, 7.946, 49.7135, 8.625, 50.6595, 8.854);
    bezierVertex(51.7875, 9.127, 54.6465, 8.914, 54.8365, 9.141);
    bezierVertex(55.0265, 9.367, 52.7445, 9.704, 51.7995, 10.214);
    bezierVertex(50.6375, 10.839, 48.2105, 11.346, 47.8695, 12.894);
    bezierVertex(47.4235, 14.92, 48.9355, 19.186, 49.1235, 22.365);
    bezierVertex(49.3275, 25.822, 49.8605, 29.962, 49.0945, 33.642);
    bezierVertex(48.1395, 38.23, 45.1125, 45.197, 43.3945, 49.893);
    bezierVertex(41.9305, 53.895, 39.3945, 57.6, 38.7855, 61.818);
    bezierVertex(38.0965, 66.592, 39.5465, 75.46, 39.2605, 78.538);
    bezierVertex(39.1745, 79.467, 37.9335, 80.066, 37.0735, 80.287);
    bezierVertex(36.2125, 80.507, 34.8445, 79.766, 34.0965, 79.861);
    bezierVertex(33.4975, 79.936, 33.1715, 80.976, 32.5815, 80.852);
    bezierVertex(31.9205, 80.712, 30.2995, 80.027, 30.1315, 79.022);
    bezierVertex(29.8875, 77.555, 30.9735, 74.393, 31.1145, 72.05);
    bezierVertex(31.3575, 68.049, 31.9185, 59.001, 31.5845, 55.019);
    bezierVertex(31.3805, 52.596, 29.7905, 50.155, 29.1095, 48.157);
    bezierVertex(28.5305, 46.461, 27.9515, 44.393, 27.4925, 43.031);
    bezierVertex(27.1465, 42.003, 26.5995, 41.039, 26.3575, 39.982);
    bezierVertex(26.0425, 38.61, 25.7415, 36.539, 25.6055, 34.798);
    bezierVertex(25.4075, 32.283, 24.5925, 27.876, 25.1725, 24.89);
    bezierVertex(25.7385, 21.974, 27.9885, 18.729, 29.0835, 16.882);
    bezierVertex(29.7735, 15.716, 31.0445, 14.801, 31.7385, 13.805);
    endShape();

    //End Shape
    pop();
  }
}
