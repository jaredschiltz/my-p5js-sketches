let color_palette_pico8;
let color_palette_picotron;
let color_palette_apple2;

let font_sprite_sheet;
let smiley_face_image;
let smiley_face_graphic;

function preload() {
  font_sprite_sheet = loadImage("CGA8x8thick.png");
}

function setup() {
  createCanvas(1280, 800);
  color_palette_pico8 = new PICO8_Palette();
  color_palette_picotron = new PICOTRON_Palette();
  color_palette_apple2 = new Apple2_Palette();
  smiley_face_image = createImage(8, 8);
  // copy smiley face into own image
  smiley_face_image.copy(font_sprite_sheet, 16, 0, 8, 8, 0, 0, 8, 8);
  // recolorize background and foreground colors
  face_foreground_color = color_palette_pico8.get_color("RED_RIBBON");
  face_background_color = color_palette_pico8.get_color("WHITE");
  let current_tile_width = 8; // 8x8
  let new_tile_width = 128;
  let new_pixel_size = new_tile_width / current_tile_width;
  smiley_face_graphic = createGraphics(new_tile_width, new_tile_width);
  smiley_face_image.loadPixels();
  let num_pixels = 4 * smiley_face_image.width * smiley_face_image.height;
  smiley_face_graphic.noStroke();
  for (let i = 0; i < num_pixels; i += 4) {
    /*
    print(
      "row: ",
      Math.floor(i / 4 / current_tile_width),
      "col: ",
      (i / 4) % current_tile_width
    );
    */
    let current_color = "#00ff00";
    if (
      smiley_face_image.pixels[i] == 255 &&
      smiley_face_image.pixels[i + 1] == 255 &&
      smiley_face_image.pixels[i + 2] == 255
    ) {
      current_color = face_foreground_color;
    } else if (
      smiley_face_image.pixels[i] == 255 &&
      smiley_face_image.pixels[i + 1] == 0 &&
      smiley_face_image.pixels[i + 2] == 255
    ) {
      current_color = face_background_color;
    }
    // make upscaled image
    smiley_face_graphic.fill(current_color);
    smiley_face_graphic.noStroke();
    smiley_face_graphic.rect(
      ((i / 4) % current_tile_width) * new_pixel_size,
      Math.floor(i / 4 / current_tile_width) * new_pixel_size,
      new_pixel_size,
      new_pixel_size
    );
  }
  smiley_face_image.updatePixels();
}

function draw() {
  background(120);
  image(smiley_face_graphic, 0, 0);
}
