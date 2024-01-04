class PICOTRON_Palette {
  constructor() {
    this.palette = {
      // Taken from picotron color palette
      // https://lospec.com/palette-list/pictron-wip-v4
      BLACK: "#000000",
      DARK_RASPBERRY: "#7e2553",
      LIPSTICK_RED: "#c3002e",
      RED_RIBBON: "#ff004d",
      BLAZE_ORANGE: "#ff6600",
      ORANGE_PEEL: "#ffa300",
      BANANA_YELLOW: "#ffec27",
      BUTTER: "#ffff7d",
      YELLOWY_GREEN: "#a7f735",
      RADIOACTIVE_GREEN: "#00e436",
      GREEN_HAZE: "#00b251",
      PINE_GREEN: "#008751",
      DEEP_SEA_GREEN: "#125359",
      DARK_BLUE_GREY: "#1d2b53",
      BLUE_EYES: "#0a62be",
      SKY_BLUE: "#29adff",
      ROBIN_EGG_BLUE: "#83ebf5",
      WHITE: "#fff1e8",
      DEEP_PEACH: "#ffccaa",
      PALE_COPPER: "#d48e6f",
      BROWN_RUST: "#ab5236",
      WALNUT: "#742f29",
      CRATER_BROWN: "#422136",
      PURPLE_HAZE: "#5f347e",
      NEON_PINK: "#db37b8",
      ROSA: "#ff77a8",
      SOFT_PINK: "#ffacc5",
      BRIGHT_LAVENDER: "#bd9adf",
      GREYISH_PURPLE: "#83769c",
      VAMPIRE_GREY: "#5f574f",
      PALE_OYSTER: "#a28879",
      METALLIC_SILVER: "#c2c3c7",
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
