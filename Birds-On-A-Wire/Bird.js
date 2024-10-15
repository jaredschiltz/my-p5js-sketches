class Bird {
  constructor(position, colour, scaling_factor) {
    this.position = position
    this.colour = colour
    this.scaling_factor = scaling_factor
    this.original_size = 80 // 80 x 80 pixels
  }

  draw() {
    print("this is the original border class. Please override draw function");
  }
  
  set_colour(new_colour) {
    this.colour = new_colour
  }
}
