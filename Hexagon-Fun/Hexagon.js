class Hexagon {
  constructor(
    x,
    y,
    size, // effective radius
    color1,
    color2,
    color_rotate_direction
  ) {
    this.size = size;
    this.pos = createVector(x, y);
    this.color1 = color1;
    this.color2 = color2;
    this.color_array = new Array(6); // store color for each slice that makes up hexagon
    this.color_rotate_direction = color_rotate_direction;
    // initialize array
    let color_random = color(random(0, 255), random(0, 255), random(0, 255));

    for (let i = 0; i < this.color_array.length; i++) {
      if (random() > 0.5) {
        this.color_array[i] = this.color1;
      } else {
        this.color_array[i] = this.color2;
      }
    }
  }

  update() {
    // rotate all of the colors
    if (this.color_rotate_direction == "CW") {
      let last_element = this.color_array[5];
      // rotate all the other colors
      for (let i = 0; i < 5; i++) {
        this.color_array[5 - i] = this.color_array[4 - i];
      }
      this.color_array[0] = last_element;
    } else {
      let first_element = this.color_array[0];
      // rotate all the other colors
      for (let i = 0; i < 5; i++) {
        this.color_array[i] = this.color_array[i + 1];
      }
      this.color_array[5] = first_element;
    }
  }

  draw() {
    push();
    strokeWeight(1);
    translate(this.pos.x, this.pos.y);
    let vertices_array = new Array(6);
    // calculate all the vertices of the hexagon
    for (let i = 0; i < 6; i++) {
      let angle_degree = 60 * i - 30;
      let angle_rad = (PI / 180) * angle_degree;
      vertices_array[i] = createVector(
        this.size * cos(angle_rad),
        this.size * sin(angle_rad)
      );
    }
    for (let i = 0; i < 5; i++) {
      fill(this.color_array[i]);
      stroke(this.color_array[i]);
      beginShape();
      vertex(0, 0);
      vertex(vertices_array[i].x, vertices_array[i].y);
      vertex(vertices_array[i + 1].x, vertices_array[i + 1].y);
      endShape(CLOSE);
    }
    // make last slice

    fill(this.color_array[5]);
    stroke(this.color_array[5]);
    beginShape();
    vertex(0, 0);
    vertex(vertices_array[5].x, vertices_array[5].y);
    vertex(vertices_array[0].x, vertices_array[0].y);
    endShape();
    pop();
  }
}
