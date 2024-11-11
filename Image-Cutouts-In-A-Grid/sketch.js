const WIDTH_HEIGHT = 800;
let img;
let canvas;
let tiled_img;
let selection_border_color;
let mouse_selected = false;
let selection_size;
let selection_size_scaling_factor = 20;
let number_of_selection_boxes = 1;
let selection_boxes = [];

function preload() {
  img = loadImage("https://picsum.photos/" + str(WIDTH_HEIGHT));
}

function setup() {
  canvas = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  tiled_img = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  selection_size = createVector(
    WIDTH_HEIGHT / selection_size_scaling_factor,
    WIDTH_HEIGHT / selection_size_scaling_factor
  );
  selection_boxes = [];
  // add original selection box
  selection_boxes.push(createVector(0, 0));
}

function draw() {
  background(220);
  image(img, 0, 0);
  noFill();
  stroke(255, 0, 255);
  strokeWeight(3);
  if (mouse_selected == false) {
    // Draw selection boxes
    for (boxes of selection_boxes) {
      rect(
        mouseX + boxes.x,
        mouseY + boxes.y,
        selection_size.x,
        selection_size.y
      );
    }
  } else {
    // Draw grided image
    image(tiled_img, 0, 0);
  }
}

function draw_tiled_image() {
  for (let row = 0; row < height / selection_size.y; row++) {
    for (let col = 0; col < width / selection_size.x; col++) {
      //print(selection_boxes.length);
      let random_box = floor(random(0, selection_boxes.length));
      image(
        img,
        col * selection_size.x,
        row * selection_size.y,
        selection_size.x,
        selection_size.y,
        mouseX + selection_boxes[random_box].x,
        mouseY + selection_boxes[random_box].y,
        selection_size.x,
        selection_size.y
      );
    }
  }
  tiled_img.copy(canvas, 0, 0, width, height, 0, 0, tiled_img.width, height);
}

function mousePressed() {
  mouse_selected = true;
  draw_tiled_image();
}
function mouseMoved() {
  mouse_selected = false;
}
function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
  if (key == "+") {
    selection_size_scaling_factor -= 1;
    selection_size.x = WIDTH_HEIGHT / selection_size_scaling_factor;
    selection_size.y = WIDTH_HEIGHT / selection_size_scaling_factor;
    if (selection_size_scaling_factor < 3) {
      selection_size_scaling_factor = 3;
    }
  }
  if (key == "-") {
    selection_size_scaling_factor += 1;
    selection_size.x = WIDTH_HEIGHT / selection_size_scaling_factor;
    selection_size.y = WIDTH_HEIGHT / selection_size_scaling_factor;
    if (selection_size_scaling_factor > 40) {
      selection_size_scaling_factor = 40;
    }
  }
  switch (key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      selection_boxes = [];
      // add original selection box
      selection_boxes.push(createVector(0, 0));
      number_of_selection_boxes = parseInt(key);
      for (let i = 0; i < number_of_selection_boxes - 1; i++) {
        selection_boxes.push(
          createVector(
            random(-selection_size.x / 2, selection_size.x / 2),
            random(-selection_size.y / 2, selection_size.y / 2)
          )
        );
      }
      break;
  }
}
