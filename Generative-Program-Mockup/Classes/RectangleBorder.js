class RectangleBorder extends Border {
  constructor(card_dimensions, border_thickness, color_palette) {
    super(card_dimensions, border_thickness);
    this.num_colors = floor(random(1, 6)) + 1;
    this.color_set = new Set();
    // Choose different colors - using set to get unique colors
    while (this.color_set.size < this.num_colors) {
      this.color_set.add(color_palette[floor(random(color_palette.length))]);
    }
    this.number_of_rectangles = floor(random(10, 30));
    this.color_set = Array.from(this.color_set); // Convert set to array
  }

  draw() {
    noStroke();
    rectMode(CORNER);
    let rectangle_width = this.top_border_width / this.number_of_rectangles;
    for (let i = 0; i < this.number_of_rectangles; i++) {
      fill(this.color_set[i % this.num_colors]);
      rect(
        this.top_border_x + i * rectangle_width,
        this.top_border_y,
        rectangle_width,
        this.top_border_height
      );
      rect(
        this.bottom_border_x + i * rectangle_width,
        this.bottom_border_y,
        rectangle_width,
        this.bottom_border_height
      );
    }
  }
}
