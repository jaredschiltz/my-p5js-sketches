class FlowLine {
  constructor(
    pos,
    step_size,
    max_number_line_segments,
    stroke_width,
    colour,
    noise_array,
    cells_per_width,
    canvas_width
  ) {
    this.pos = pos;
    this.step_size = step_size;
    this.max_number_line_segments = max_number_line_segments;
    this.stroke_width = stroke_width;
    this.colour = colour;
    this.path = [];
    this.path.push(this.pos.copy());
    this.noise_array = noise_array;
    this.cells_per_width = cells_per_width;
    this.canvas_width = canvas_width;
    this.cell_width = this.canvas_width / this.cells_per_width;

    // now trace out complete path of the flow field
    while (
      this.pos.x >= this.cell_width / 4 &&
      this.pos.x <= width - this.cell_width / 4 &&
      this.pos.y >= this.cell_width / 4 &&
      this.pos.y <= width - cell_width / 4 && (this.path.length  < this.max_number_line_segments)
    ) {
      // (1) Determine noise_array indices based on where current position is on noise field grid
      let current_grid_position_x = floor(
        (this.pos.x / this.canvas_width) * this.cells_per_width
      );
      let current_grid_position_y = floor(
        (this.pos.y / this.canvas_width) * this.cells_per_width
      );
      let current_noise_vector = this.noise_array[current_grid_position_y][
        current_grid_position_x
      ].copy();
      current_noise_vector.setMag(this.step_size);

      this.pos = p5.Vector.add(this.pos, current_noise_vector);
      this.path.push(this.pos.copy());
    }
  }

  show() {
    noFill();

    stroke(this.colour);
    strokeWeight(this.stroke_width);
    beginShape();
    
       for (let i = 0; i < this.path.length; i++) {
      
      vertex(this.path[i].x, this.path[i].y)
      
    }
    endShape()
    /*
    for (let i = 0; i < this.path.length - 1; i++) {
      
      line(
        this.path[i].x,
        this.path[i].y,
        this.path[i + 1].x,
        this.path[i + 1].y
      );
      
    }
    */
  }
}
