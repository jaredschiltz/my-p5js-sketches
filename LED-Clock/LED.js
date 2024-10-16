class LED {
  constructor(x, y, scale_factor, on_colour, off_colour) {
    this.pos = createVector(x, y);
    this.on_colour = on_colour;
    this.off_colour = off_colour;
    this.scale_factor = scale_factor;
    this.number = 0;
  }

  set_number(number) {
    this.number = number;
  }

  show() {
    let segment_array = [0, 0, 0, 0, 0, 0, 0]; // a, b, c, d, e, f, g segments

    switch (this.number) {
      case 0:
        segment_array = [1, 1, 1, 1, 1, 1, 0];
        break;
      case 1:
        segment_array = [0, 1, 1, 0, 0, 0, 0];
        break;
      case 2:
        segment_array = [1, 1, 0, 1, 1, 0, 1];
        break;
      case 3:
        segment_array = [1, 1, 1, 1, 0, 0, 1];
        break;
      case 4:
        segment_array = [0, 1, 1, 0, 0, 1, 1];
        break;
      case 5:
        segment_array = [1, 0, 1, 1, 0, 1, 1];
        break;
      case 6:
        segment_array = [1, 0, 1, 1, 1, 1, 1];
        break;
      case 7:
        segment_array = [1, 1, 1, 0, 0, 0, 0];
        break;
      case 8:
        segment_array = [1, 1, 1, 1, 1, 1, 1];
        break;
      case 9:
        segment_array = [1, 1, 1, 1, 0, 1, 1];
        break;
      default:
        segment_array = [0, 0, 0, 0, 0, 0, 0];
    }
    push();
    translate(this.pos.x, this.pos.y);
    push();
    strokeCap(ROUND);
    strokeJoin(ROUND);
    scale(this.scale_factor, this.scale_factor);
    translate(-150, -275);
    
   
    // Segment C
    if(segment_array[2] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(267.86, 408.326);
    vertex(256.078, 474.678);
    vertex(270.905, 492.471);
    vertex(273.394, 490.159);
    vertex(275.756, 486.229);
    vertex(277.17, 480.99);
    vertex(291.855, 400.254);
    vertex(285.466, 393.748);
    vertex(267.86, 408.326);
    endShape();

    // Segment D
    if(segment_array[3] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(156.356, 492.766);
    vertex(174.588, 477.189);
    vertex(252.4, 477.168);
    vertex(267.301, 495.803);
    bezierVertex(267.301, 495.803, 265.861, 496.931, 264.216, 497.806);
    bezierVertex(262.239, 498.858, 259.987, 499.229, 259.873, 499.013);
    bezierVertex(259.987, 499.229, 168.497, 498.73, 168.497, 498.73);
    bezierVertex(168.497, 498.73, 164.279, 498.394, 161.406, 496.889);
    bezierVertex(159.327, 495.8, 156.356, 492.766, 156.356, 492.766);
    endShape();

    // Segment E
    if(segment_array[4] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(172.395, 392.964);
    vertex(163.291, 399.948);
    vertex(149.568, 473.726);
    vertex(149.334, 478.414);
    bezierVertex(149.334, 478.414, 149.783, 482.063, 150.15, 483.722);
    bezierVertex(150.468, 485.159, 151.553, 487.067, 151.933, 487.931);
    bezierVertex(152.117, 488.351, 152.913, 488.895, 152.913, 488.895);
    vertex(172.415, 473.459);
    vertex(185.205, 407.668);
    vertex(172.395, 392.964);
    endShape();

    // Segment G
    if(segment_array[6] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(175.539, 389.792);
    vertex(188.541, 378.528);
    vertex(273.538, 379.217);
    vertex(282.721, 390.039);
    vertex(269.963, 401.33);
    vertex(185.723, 401.247);
    vertex(175.539, 389.792);
    endShape();

    // Segment B
    if(segment_array[1] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(287.101, 305.62);
    vertex(305.667, 290.829);
    bezierVertex(305.667, 290.829, 306.919, 291.641, 307.335, 292.512);
    bezierVertex(307.876, 293.644, 308.64, 295.362, 309.011, 296.876);
    bezierVertex(309.402, 298.475, 309.247, 300.499, 309.251, 302.257);
    bezierVertex(309.255, 304.317, 308.41, 309.744, 308.41, 309.744);
    vertex(296.138, 379.113);
    vertex(286.978, 387.34);
    vertex(274.914, 373.261);
    vertex(287.101, 305.62);
    endShape();

    // Segment A
     if(segment_array[0] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(191.752, 285.131);
    vertex(206.398, 302.146);
    vertex(284.408, 302.411);
    vertex(303.094, 287.653);
    bezierVertex(303.094, 287.653, 302.123, 285.819, 301.343, 285.115);
    bezierVertex(300.411, 284.273, 298.904, 283.237, 297.501, 282.602);
    bezierVertex(296.104, 281.969, 294.503, 281.384, 293.161, 281.075);
    bezierVertex(291.95, 280.796, 289.448, 280.747, 289.448, 280.747);
    vertex(199.849, 280.456);
    bezierVertex(199.849, 280.456, 197.262, 280.529, 195.929, 281.365);
    bezierVertex(195.264, 281.781, 194.68, 282.208, 194.045, 282.669);
    bezierVertex(193.339, 283.182, 191.752, 285.131, 191.752, 285.131);
    endShape();

    // Segment F
    if(segment_array[5] == 1){
       fill(this.on_colour)
     }
    else {
      fill(this.off_colour)
    }
    beginShape();
    vertex(173.429, 386.008);
    vertex(167.607, 379.846);
    vertex(182.893, 295.849);
    bezierVertex(182.893, 295.849, 183.92, 292.666, 184.832, 291.385);
    bezierVertex(185.744, 290.104, 188.084, 288.367, 188.084, 288.367);
    vertex(203.343, 305.588);
    vertex(190.579, 371.677);
    vertex(173.429, 386.008);
    endShape();
    pop();
    pop();
  }
}
