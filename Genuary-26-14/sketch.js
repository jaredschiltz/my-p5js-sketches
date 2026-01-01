/* Genuary 2025 - January 14th Prompt: 
    Everything fits perfectly
*/

//color_palette = ["#ffffff", "#ff009a", "#009aff"];
let start_pos;
let frame_width;
let cell_width;
const NUM_CELLS_ACROSS_DOWN = 24;
let my_font, img;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  img = loadImage("perfect_tetris.png");
}
function setup() {
  createCanvas(800, 800);
  let frame_percentage = 0.9;
  let frame_width = 800 * frame_percentage;
  start_pos = (800 - frame_width) / 2;
  cell_width = frame_width / NUM_CELLS_ACROSS_DOWN;

  noLoop();
}
function draw() {
  background("#ffffff");
  stroke("#000000");
  strokeWeight(2);
  img.loadPixels();
  for (let row = 0; row < NUM_CELLS_ACROSS_DOWN; row++) {
    for (let col = 0; col < NUM_CELLS_ACROSS_DOWN; col++) {
      let image_grid_size = 800 / NUM_CELLS_ACROSS_DOWN;
      let get_color = img.get(
        row * image_grid_size + image_grid_size / 2,
        col * image_grid_size + image_grid_size / 2
      );
      //print(get_color);
      let target_colors = [
        "#e9162d",
        "#f28200",
        "#ffdb28",
        "#1fb819",
        "#00e1da",
        "#007bd8",
        "#8f2be7",
        "#fb4fd9",
      ];
      // Color palette swap
      if (get_color[0] == 255 && get_color[1] == 255 && get_color[2] == 0) {
        fill(target_colors[0]);
      } else if (
        get_color[0] == 0 &&
        get_color[1] == 255 &&
        get_color[2] == 0
      ) {
        fill(target_colors[1]);
      } else if (
        get_color[0] == 85 &&
        get_color[1] == 0 &&
        get_color[2] == 255
      ) {
        fill(target_colors[2]);
      } else if (
        get_color[0] == 0 &&
        get_color[1] == 170 &&
        get_color[2] == 255
      ) {
        fill(target_colors[3]);
      } else if (
        get_color[0] == 255 &&
        get_color[1] == 0 &&
        get_color[2] == 0
      ) {
        fill(target_colors[4]);
      } else if (
        get_color[0] == 255 &&
        get_color[1] == 0 &&
        get_color[2] == 255
      ) {
        fill(target_colors[5]);
      } else if (
        get_color[0] == 255 &&
        get_color[1] == 85 &&
        get_color[2] == 0
      ) {
        fill(target_colors[6]);
      } else if (
        get_color[0] == 0 &&
        get_color[1] == 255 &&
        get_color[2] == 170
      ) {
        fill(target_colors[7]);
      } else {
        fill(get_color);
      }

      rect(
        start_pos + row * cell_width,
        start_pos + col * cell_width,
        cell_width,
        cell_width
      );
    }
  }
  // Draw Text
  noStroke();
  fill("#000000");
  textSize(12);
  textFont(my_font);
  text(">> 26.14", 35, 785);
}
function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
