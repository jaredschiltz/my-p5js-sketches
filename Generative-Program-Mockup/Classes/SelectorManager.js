"use strict";
class SelectorManager {
  constructor(
    selector_box_x,
    selector_box_y,
    selector_box_width,
    selector_box_height,
    font_type,
    selector_color,
    selector_font_color_selected,
    selector_font_color_unselected,
    selector_radio_button_color,
    num_selections
  ) {
    this.selector_box_x = selector_box_x;
    this.selector_box_y = selector_box_y;
    this.selector_box_width = selector_box_width;
    this.selector_box_height = selector_box_height;
    this.font_type = font_type;
    this.selector_color = selector_color;
    this.selector_font_color_selected = selector_font_color_selected;
    this.selector_font_color_unselected = selector_font_color_unselected;
    this.selector_radio_button_color = selector_radio_button_color;
    this.num_selections = num_selections;

    /*
    this.selector_array = new Array(num_selections);
    this.current_selection = 0;
    let selector_offset =
      (selector_box_height - selector_box_y) / num_selections;

    for (let i = 0; i < num_selections; i++) {
      this.selector_array[i] = new Selector(
        0,
        selector_box_y +
          i * selector_offset +
          0 +
          selector_offset / 2.0 -
          selector_height / 2,
        selector_max_width,
        selector_height,
        selector_color,
        "<default>",
        font_type,
        selector_font_color_selected,
        selector_font_color_unselected,
        selector_radio_button_color
      );
    }
    this.selector_array[0].set_selector_title("Action");
    this.selector_array[0].set_currently_selected(true);
    this.selector_array[1].set_selector_title("Song Title");
    this.selector_array[1].set_currently_selected(false);
    this.selector_array[2].set_selector_title("Dream");
    this.selector_array[2].set_currently_selected(false);
    this.selector_array[3].set_selector_title("Melody");
    this.selector_array[3].set_currently_selected(false);
    this.selector_array[4].set_selector_title("Rhythm");
    this.selector_array[4].set_currently_selected(false);
    */
  }

  draw() {
    fill(color(255, 0, 0));
    rect(
      this.selector_box_x,
      this.selector_box_y,
      this.selector_box_width,
      this.selector_box_height
    );
  }

  get_selector_array() {
    return this.selector_array;
  }

  set_next_selection(next_selection) {
    for (let s of this.selector_array) {
      s.set_currently_selected(false);
    }
    this.selector_array[next_selection].set_currently_selected(true);
  }

  set_current_selection(current_selection) {
    this.current_selection = current_selection;
  }

  get_current_selection() {
    return this.current_selection;
  }

  clear_next_selection() {
    for (let s of this.selector_array) {
      s.set_currently_selected(false);
    }
    this.selector_array[this.current_selection].set_currently_selected(true);
  }
}
