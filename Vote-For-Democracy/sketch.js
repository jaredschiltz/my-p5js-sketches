const WIDTH_HEIGHT = 720;
// let text_start_position = 900;
// let text_end_position = -11500;
// let text_position = 0;
// let text_scroll_speed = 20;

let cols = 40;
let rows = 40;
let boxes;
let horizontal_spacing;
let vertical_spacing;

let video;
function preload() {
  video = createVideo("vote.mov");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  // text_position = text_start_position;
  video.volume(0); // Have to silence video for chrome to autoplay (chrome policy)
  video.loop();
  video.hide();
  boxes = [];
  horizontal_spacing = width / cols;
  vertical_spacing = height / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let box = createCheckbox();
      box.position(x * horizontal_spacing, y * vertical_spacing);
      boxes.push(box);
    }
  }
  pixelDensity(1);
}

function draw() {
  background(255);
  //image(video, 0, 0, 800, 800);

  video.loadPixels();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // get the video pixel location
      let index =
        (x * horizontal_spacing + y * vertical_spacing * video.height) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let bright = (r + g + b) / 3;
      let bright_threshold = 0.8;

      let checkIndex = x + y * cols;

      if (bright < bright_threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
  /*
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      // get the video pixel location
      let index = (x + y * video.height) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let bright = (r + g + b) / 3;

      let threshold = 0.6;

      let checkIndex = x + y * cols;

      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
    */
  // This is all of the code to generate the scrolling vote message
  // background(0);
  // fill(255, 255, 255);
  // textFont("Roboto Mono");
  // textSize(1000);
  // text("VOTE FOR DEMOCRACY!", text_position, 750);

  // text_position -= text_scroll_speed;
  // if (text_position < text_end_position) {
  //   text_position = text_start_position;
  // }
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 15);
  }
}
