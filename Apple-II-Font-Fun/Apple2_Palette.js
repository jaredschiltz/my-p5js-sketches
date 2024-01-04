class Apple2_Palette {
  constructor() {
    this.palette = {
      // Taken from picotron color palette
      // https://lospec.com/palette-list/pico-8
      BLACK: "#000000",
      WHITE: "#ffffff",
      ORANGE: "#ff5000",
      GREEN: "#00ff24",
      BLUE: "#00aaff",
      PINK: "#ff00ff",
    };
  }

  get_color(color_name) {
    return this.palette[color_name];
  }

  get_random_color() {
    return Object.values(this.palette)[
      Math.floor(Math.random() * Object.entries(this.palette).length)
    ];
  }
}
