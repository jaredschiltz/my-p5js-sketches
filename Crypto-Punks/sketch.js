const WIDTH_HEIGHT = 768;
const IMAGE_FACE_PIXEL_WIDTH = 32;
const DESIRED_FACE_PIXEL_WIDTH = 128;
const PIXEL_SCALING_FACTOR = DESIRED_FACE_PIXEL_WIDTH / IMAGE_FACE_PIXEL_WIDTH;
const NUM_FACES_PER_ROW = WIDTH_HEIGHT / DESIRED_FACE_PIXEL_WIDTH;
const PIXEL_WIDTH = WIDTH_HEIGHT / (NUM_FACES_PER_ROW * 32);
let face;
function preload() {
  face = loadImage("face.png");
  hair_image_array = new Array();
  hair_image_array.push(loadImage("blank.png")); // Used for bald head
  hair_image_array.push(loadImage("braided_hair.png"));
  hair_image_array.push(loadImage("med_hair.png"));
  hair_image_array.push(loadImage("mohawk_hair.png"));
  hair_image_array.push(loadImage("short_hair.png"));
  hair_image_array.push(loadImage("spikey_hair.png"));
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background(200);
  for (let y = 0; y < NUM_FACES_PER_ROW; y++) {
    for (let x = 0; x < NUM_FACES_PER_ROW; x++) {
      make_face(x * DESIRED_FACE_PIXEL_WIDTH, y * DESIRED_FACE_PIXEL_WIDTH);
    }
  }
}

function make_face(xpos, ypos) {
  noStroke();
  let skin_color_array = [
    "#ab5236",
    "#ffccaa",
    "#742f29",
    "#d48e6f",
    "#a28879",
    "#ab5236",
    "#ffccaa",
    "#742f29",
    "#d48e6f",
    "#a28879",
    "#ab5236",
    "#ffccaa",
    "#742f29",
    "#d48e6f",
    "#a28879",
    "#ab5236",
    "#ffccaa",
    "#742f29",
    "#d48e6f",
    "#a28879",
    "#ab5236",
    "#ffccaa",
    "#742f29",
    "#d48e6f",
    "#a28879",
    "#ab5236",
    "#ffccaa",
    "#742f29",
    "#d48e6f",
    "#a28879",
    "#fff1e8", // Make pale face really rare
    "#a8f12e", // Make monster face really rare
    "#83ebf5", // Make blue face really rare
  ];
  let skin_color = random(skin_color_array);
  let lip_color_array = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#ff004d",
    "#be1226",
  ];
  let lip_color = random(lip_color_array);

  let hair_color_array = [
    "#ffec27",
    "#000000",
    "#ff1e8",
    "#ff004d",
    "#422136",
    "#b937b8",
    "#ff77a8",
  ];
  let hair_image = random(hair_image_array);
  let hair_color = random(hair_color_array);
  for (let y = 0; y < face.height; y++) {
    for (let x = 0; x < face.width; x++) {
      let pixel_color = face.get(x, y);
      // Draw Face Outline
      if (
        pixel_color[0] == 0 &&
        pixel_color[1] == 0 &&
        pixel_color[2] == 0 &&
        pixel_color[3] == 255
      ) {
        fill(0);
        rect(
          xpos + x * PIXEL_WIDTH,
          ypos + y * PIXEL_WIDTH,
          PIXEL_WIDTH,
          PIXEL_WIDTH
        );
      }
      // Draw Face Fill
      if (
        pixel_color[0] == 255 &&
        pixel_color[1] == 255 &&
        pixel_color[2] == 0 &&
        pixel_color[3] == 255
      ) {
        fill(skin_color);
        rect(
          xpos + x * PIXEL_WIDTH,
          ypos + y * PIXEL_WIDTH,
          PIXEL_WIDTH,
          PIXEL_WIDTH
        );
      }
      // Draw Lips Fill
      if (
        pixel_color[0] == 255 &&
        pixel_color[1] == 0 &&
        pixel_color[2] == 0 &&
        pixel_color[3] == 255
      ) {
        fill(lip_color);
        rect(
          xpos + x * PIXEL_WIDTH,
          ypos + y * PIXEL_WIDTH,
          PIXEL_WIDTH,
          PIXEL_WIDTH
        );
      }
      // Draw Eyes
      if (
        pixel_color[0] == 0 &&
        pixel_color[1] == 0 &&
        pixel_color[2] == 255 &&
        pixel_color[3] == 255
      ) {
        fill("#fff1e8");
        if (skin_color == "#a8f12e") {
          // Monster
          fill("#ff004d");
        }
        if (skin_color == "#fff1e8") {
          // Albino
          fill("#c2c3c7");
        }
        if (skin_color == "#83ebf5") {
          // Blue Man
          fill("#ffec27");
        }

        rect(
          xpos + x * PIXEL_WIDTH,
          ypos + y * PIXEL_WIDTH,
          PIXEL_WIDTH,
          PIXEL_WIDTH
        );
      }
    }
  }

  for (let y = 0; y < hair_image.height; y++) {
    for (let x = 0; x < hair_image.width; x++) {
      let pixel_color = hair_image.get(x, y);
      // Draw Hair
      if (
        pixel_color[0] == 0 &&
        pixel_color[1] == 255 &&
        pixel_color[2] == 0 &&
        pixel_color[3] == 255
      ) {
        fill(hair_color);
        rect(
          xpos + x * PIXEL_WIDTH,
          ypos + y * PIXEL_WIDTH,
          PIXEL_WIDTH,
          PIXEL_WIDTH
        );
      }
      if (
        pixel_color[0] == 0 && // Hair tie
        pixel_color[1] == 0 &&
        pixel_color[2] == 0 &&
        pixel_color[3] == 255
      ) {
        fill("#000000");
        rect(
          xpos + x * PIXEL_WIDTH,
          ypos + y * PIXEL_WIDTH,
          PIXEL_WIDTH,
          PIXEL_WIDTH
        );
      }
    }
  }
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
