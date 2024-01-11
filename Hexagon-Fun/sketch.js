const WIDTH_HEIGHT = 800;
let cnv;
let color1;
let color2;
const hexagon_size = 45;
let horizontal_spacing;
let vertical_spacing;
let num_horizontal_hexagons;
let num_vertical_hexagons;
let hexagon_array;

function preload() {}

function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  color1 = color("#E04F3A");
  color2 = color("#1C46A7");
  horizontal_spacing = sqrt(3) * hexagon_size;
  vertical_spacing = 1.5 * hexagon_size;
  num_horizontal_hexagons = width / horizontal_spacing;
  num_vertical_hexagons = height / vertical_spacing;
  hexagon_array = new Array(ceil(num_vertical_hexagons) + 1);
  for (let i = 0; i < hexagon_array.length; i++) {
    hexagon_array[i] = new Array(ceil(num_horizontal_hexagons) + 1);
  }
  for (let y = 0; y < hexagon_array.length; y++) {
    for (let x = 0; x < hexagon_array[0].length; x++) {
      let random_rotate_direction;
      if (random() > 0.5) {
        random_rotate_direction = "CW";
      } else {
        random_rotate_direction = "CCW";
      }
      if (y % 2 == 0) {
        hexagon_array[y][x] = new Hexagon(
          x * horizontal_spacing,
          y * vertical_spacing,
          hexagon_size,
          color1,
          color2,
          random_rotate_direction
        );
      } else {
        // must add horizontal offset of horizontal_spacing/2
        hexagon_array[y][x] = new Hexagon(
          x * horizontal_spacing + horizontal_spacing / 2,
          y * vertical_spacing,
          hexagon_size,
          color1,
          color2,
          random_rotate_direction
        );
      }
    }
  }
  frameRate(10);
}

function draw() {
  background(30);
  for (let y = 0; y < hexagon_array.length; y++) {
    for (let x = 0; x < hexagon_array[0].length; x++) {
      hexagon_array[y][x].draw();
      hexagon_array[y][x].update();
    }
  }
}

function keyPressed() {
  if (key == "s") {
    saveGif("mygif", 10);
  }
}
