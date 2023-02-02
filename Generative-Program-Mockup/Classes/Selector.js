class Selector {
  constructor(
    x,
    y,
    max_width,
    height,
    colour,
    selector_title,
    font_type,
    selector_font_color_selected,
    selector_font_color_unselected,
    selector_radio_button_color
  ) {
    this.pos = createVector(x, y);
    this.colour = colour;
    this.height = height;
    this.max_width = max_width; // Button width will go from this.pos.x to max_width
    this.selector_title = selector_title;
    this.font_type = font_type;
    this.selector_font_color_selected = selector_font_color_selected;
    this.selector_font_color_unselected = selector_font_color_unselected;
    this.selector_radio_button_color = selector_radio_button_color;
    this.currently_selected = true;
  }

  draw() {
    fill(this.colour);
    rectMode(CORNER);
    ellipseMode(CORNER);
    rect(this.pos.x, this.pos.y, this.max_width, this.height);
    circle(this.max_width - this.height / 2, this.pos.y, this.height);
    if (this.currently_selected) {
      fill(this.selector_font_color_selected);
    } else {
      fill(this.selector_font_color_unselected);
    }
    textFont(this.font_type);
    textSize(30);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    text(
      this.selector_title,
      this.pos.x + this.max_width / 2,
      this.pos.y + this.height / 2.5 // Fudge factor to get text to align correctly
    );
    if (this.currently_selected) {
      fill(this.selector_radio_button_color);
    } else {
      fill(this.colour);
    }
    circle(
      this.max_width - this.height / 4,
      this.pos.y + this.height / 4,
      this.height * 0.5
    );
  }

  set_currently_selected(new_selection) {
    this.currently_selected = new_selection;
  }

  set_selector_title(new_title) {
    this.selector_title = new_title;
  }

  get_mouse_over(mouse_vector) {
    if (
      mouse_vector.x > this.pos.x &&
      mouse_vector.x < this.pos.x + this.max_width + this.height && // Make sure to include circle area on selector too
      mouse_vector.y > this.pos.y &&
      mouse_vector.y < this.pos.y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
