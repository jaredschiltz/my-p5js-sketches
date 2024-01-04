class PICO8_Palette {
  constructor() {
    this.palette = {
      // Taken from picotron color palette
      // https://lospec.com/palette-list/pico-8
      BLACK: "#000000",
      DARK_BLUE_GREY: "#1d2b53",
      DARK_RASPBERRY: "#7e2553",
      PINE_GREEN: "#008751",
      BROWN_RUST: "#ab5236",
      VAMPIRE_GREY: "#5f574f",
      METALLIC_SILVER: "#c2c3c7",
      WHITE: "#fff1e8",
      RED_RIBBON: "#ff004d",
      ORANGE_PEEL: "#ffa300",
      BANANA_YELLOW: "#ffec27",
      RADIOACTIVE_GREEN: "#00e436",
      SKY_BLUE: "#29adff",
      GRAYISH_PURPLE: "#83769c",
      ROSA: "#ff77a8",
      DEEP_PEACH: "#ffccaa",
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
