class Border {
  constructor(card_dimensions, border_thickness_percentage) {
    this.card_dimensions = card_dimensions;
    this.top_border_x = this.card_dimensions.CARD_X;
    this.top_border_y = this.card_dimensions.CARD_Y;
    this.top_border_width = this.card_dimensions.CARD_WIDTH;
    this.top_border_height =
      this.card_dimensions.CARD_HEIGHT * border_thickness_percentage;
    this.bottom_border_x = this.card_dimensions.CARD_X;
    this.bottom_border_y =
      this.card_dimensions.CARD_Y + this.top_border_height * 3.0;
    this.bottom_border_width = this.card_dimensions.CARD_WIDTH;
    this.bottom_border_height = this.top_border_height;
  }

  draw() {
    print("this is the original border class. Please override draw function");
  }
}
