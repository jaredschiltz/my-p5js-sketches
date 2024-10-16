class Cell {
  constructor(x, y, cell_width, colour) {
    this.pos = createVector(x, y);
    this.cell_width = cell_width;
    this.colour = colour;
    this.scaling_factor = 0.5
    this.big_square = false
  }
  
  set_colour(colour){
    this.colour = colour
  }
  set_size(bool){
    this.big_square = bool
  }

  show() {
    noStroke();
    fill(this.colour);
    if (this.big_square){
    rect(this.pos.x, this.pos.y, this.cell_width, this.cell_width);
    }
    else {
      let smaller_width = this.cell_width * this.scaling_factor
      let x_offset = (this.cell_width - smaller_width) / 2 + this.pos.x
      let y_offset = (this.cell_width - smaller_width) / 2 + this.pos.y
      rect(x_offset, y_offset, smaller_width, smaller_width);
    }
  }
}