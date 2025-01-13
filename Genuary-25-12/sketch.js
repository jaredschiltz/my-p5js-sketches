/*
Genuary 2025 - January 12th Prompt: Subdivision
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
// Colors
let street_color;
let sidewalk_color;
let lawn_color;

let google_font;
//let reference_image;
let angle;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
  // reference_image = loadImage("subs.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  street_color = color("#707070");
  sidewalk_color = color("#ffffe4");
  lawn_color = color("#4da409");
  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  noLoop();
}

function draw() {
  // Calculate the angle of the street
  // noFill();
  // stroke("#ff0000");
  angle = Math.atan2(border_size, 385);
  angle = PI / 2 - angle;
  //print(`angle: ${angle} radians or ${(angle * 180) / Math.PI} degrees`);
  //line(0, 0, 300 * cos(angle), 300 * sin(angle));

  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  background(sidewalk_color);
  // Draw reference image
  //image(reference_image, start_pos, start_pos, border_size, border_size);
  draw_streets();
  draw_lawns();
  draw_trees_layer1();
  draw_home_layer1();
  draw_trees_layer2();
  draw_home_layer2();
  draw_trees_layer2();
  draw_trees_layer3();
  draw_home_layer3();

  draw_home_layer4();
  draw_trees_layer4();
  draw_trees_layer5();
  draw_home_layer5();
  // Draw Masking Border
  fill(sidewalk_color);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(WIDTH_HEIGHT - start_pos, start_pos, start_pos, WIDTH_HEIGHT);
  rect(0, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, WIDTH_HEIGHT - start_pos);
  //rect(start_pos, start_pos, border_size, border_size);

  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(google_font);
  text(">> 25.12", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function draw_streets() {
  // Draw street
  // Main Street
  noStroke();
  fill(street_color);
  beginShape();
  vertex(start_pos, start_pos + 90);
  vertex(start_pos + border_size, start_pos + 475);
  vertex(start_pos + border_size, start_pos + 475 + 50);
  vertex(start_pos, start_pos + 140);
  endShape(CLOSE);
  // Sidewalks
  fill(sidewalk_color);
  beginShape();
  vertex(start_pos, start_pos + 75);
  vertex(start_pos + border_size, start_pos + 460);
  vertex(start_pos + border_size, start_pos + 460 + 15);
  vertex(start_pos, start_pos + 90);
  endShape(CLOSE);
  beginShape();
  vertex(start_pos, start_pos + 75 + 65);
  vertex(start_pos + border_size, start_pos + 460 + 65);
  vertex(start_pos + border_size, start_pos + 460 + 15 + 65);
  vertex(start_pos, start_pos + 90 + 65);
  endShape(CLOSE);
  push();
  translate(0, 405);
  // Main Street
  noStroke();
  fill(street_color);
  beginShape();
  vertex(start_pos, start_pos + 90);
  vertex(start_pos + border_size, start_pos + 475);
  vertex(start_pos + border_size, start_pos + 475 + 50);
  vertex(start_pos, start_pos + 140);
  endShape(CLOSE);
  // Sidewalks
  fill(sidewalk_color);
  beginShape();
  vertex(start_pos, start_pos + 75);
  vertex(start_pos + border_size, start_pos + 460);
  vertex(start_pos + border_size, start_pos + 460 + 15);
  vertex(start_pos, start_pos + 90);
  endShape(CLOSE);
  beginShape();
  vertex(start_pos, start_pos + 75 + 65);
  vertex(start_pos + border_size, start_pos + 460 + 65);
  vertex(start_pos + border_size, start_pos + 460 + 15 + 65);
  vertex(start_pos, start_pos + 90 + 65);
  endShape(CLOSE);

  pop();
  push();
  translate(0, -405);
  // Main Street
  noStroke();
  fill(street_color);
  beginShape();
  vertex(start_pos, start_pos + 90);
  vertex(start_pos + border_size, start_pos + 475);
  vertex(start_pos + border_size, start_pos + 475 + 50);
  vertex(start_pos, start_pos + 140);
  endShape(CLOSE);
  // Sidewalks
  fill(sidewalk_color);
  beginShape();
  vertex(start_pos, start_pos + 75);
  vertex(start_pos + border_size, start_pos + 460);
  vertex(start_pos + border_size, start_pos + 460 + 15);
  vertex(start_pos, start_pos + 90);
  endShape(CLOSE);
  beginShape();
  vertex(start_pos, start_pos + 75 + 65);
  vertex(start_pos + border_size, start_pos + 460 + 65);
  vertex(start_pos + border_size, start_pos + 460 + 15 + 65);
  vertex(start_pos, start_pos + 90 + 65);
  endShape(CLOSE);
  pop();
}

function draw_lawns() {
  // Draw street
  // Main Street
  noStroke();
  fill(lawn_color);
  beginShape();
  vertex(start_pos, start_pos + 155);
  vertex(start_pos + border_size, start_pos + 155 + 385);
  vertex(start_pos + border_size, start_pos + 155 + 385 + 325);
  vertex(start_pos, start_pos + 480);
  endShape(CLOSE);
  push();
  translate(0, 405);
  beginShape();
  vertex(start_pos, start_pos + 155);
  vertex(start_pos + border_size, start_pos + 155 + 385);
  vertex(start_pos + border_size, start_pos + 155 + 385 + 325);
  vertex(start_pos, start_pos + 480);
  endShape(CLOSE);

  pop();
  push();
  translate(0, -405);
  beginShape();
  vertex(start_pos, start_pos + 155);
  vertex(start_pos + border_size, start_pos + 155 + 385);
  vertex(start_pos + border_size, start_pos + 155 + 385 + 325);
  vertex(start_pos, start_pos + 480);
  endShape(CLOSE);

  pop();
  push();
  translate(0, -405 * 2);
  beginShape();
  vertex(start_pos, start_pos + 155);
  vertex(start_pos + border_size, start_pos + 155 + 385);
  vertex(start_pos + border_size, start_pos + 155 + 385 + 325);
  vertex(start_pos, start_pos + 480);
  endShape(CLOSE);

  pop();
}

function draw_tree() {
  push();
  scale(0.6);
  noStroke();
  fill("#b46733");
  beginShape();
  vertex(119.791, 233.867);
  vertex(137.415, 243.259);
  bezierVertex(133.76, 233.426, 133.845, 221.225, 133.821, 208.999);
  bezierVertex(134.042, 195.31, 136.174, 180.628, 137.127, 164.887);
  vertex(134.87, 163.243);
  bezierVertex(134.453, 170.961, 133.406, 177.879, 132.137, 183.527);
  bezierVertex(130.222, 172.465, 128.8, 166.233, 128.653, 154.554);
  vertex(127.06, 153.705);
  bezierVertex(126.318, 162.654, 126.785, 172.699, 128.653, 184.012);
  bezierVertex(125.749, 173.693, 122.69, 165.634, 119.446, 160.238);
  vertex(117.803, 162.946);
  bezierVertex(121.779, 171.291, 125.579, 185.589, 125.233, 199.486);
  bezierVertex(125.232, 216.355, 124.206, 226.452, 119.791, 233.867);
  endShape();
  fill("#569441");
  beginShape();
  vertex(166.023, 106.56);
  bezierVertex(166.023, 98.338, 163.948, 90.335, 161.133, 86.818);
  bezierVertex(161.136, 86.614, 161.144, 86.416, 161.144, 86.21);
  bezierVertex(161.144, 76.407, 158.197, 66.886, 154.559, 64.948);
  bezierVertex(153.96, 64.628, 153.381, 64.555, 152.829, 64.667);
  bezierVertex(152.582, 55.341, 149.743, 46.568, 146.269, 44.716);
  bezierVertex(145.338, 44.22, 144.455, 44.276, 143.652, 44.785);
  bezierVertex(143.237, 35.837, 140.477, 27.614, 137.127, 25.829);
  bezierVertex(135.567, 24.997, 134.135, 25.706, 133.006, 27.548);
  bezierVertex(131.934, 20.459, 129.53, 14.605, 126.714, 13.105);
  bezierVertex(123.878, 11.593, 121.441, 14.913, 120.381, 20.946);
  bezierVertex(120.194, 20.806, 120.005, 20.679, 119.815, 20.577);
  bezierVertex(117.549, 19.37, 115.539, 21.242, 114.281, 25.118);
  bezierVertex(113.119, 22.094, 111.665, 19.888, 110.087, 19.047);
  bezierVertex(106.276, 17.016, 103.188, 23.699, 103.188, 33.969);
  bezierVertex(99.377, 31.938, 96.288, 38.621, 96.288, 48.892);
  bezierVertex(96.288, 51.16, 96.439, 53.411, 96.715, 55.568);
  bezierVertex(93.031, 54.876, 90.184, 61.836, 90.184, 72.112);
  bezierVertex(90.184, 78.213, 91.188, 84.214, 92.775, 88.762);
  bezierVertex(91.939, 91.573, 91.45, 95.262, 91.45, 99.52);
  bezierVertex(91.45, 101.817, 91.595, 104.101, 91.857, 106.3);
  bezierVertex(90.688, 109.24, 89.977, 113.541, 89.977, 118.672);
  bezierVertex(89.977, 129.827, 93.331, 140.657, 97.468, 142.862);
  bezierVertex(99.145, 143.755, 100.693, 143.095, 101.941, 141.252);
  bezierVertex(102.76, 150.45, 105.701, 158.503, 109.205, 160.37);
  bezierVertex(111.154, 161.409, 112.929, 160.346, 114.261, 157.768);
  bezierVertex(115.481, 163.67, 117.645, 168.317, 120.112, 169.632);
  bezierVertex(123.923, 171.663, 127.012, 164.98, 127.012, 154.709);
  bezierVertex(127.012, 154.546, 127.009, 154.384, 127.007, 154.22);
  bezierVertex(127.976, 156.088, 129.075, 157.441, 130.241, 158.062);
  bezierVertex(131.805, 158.896, 133.251, 158.291, 134.421, 156.591);
  bezierVertex(135.407, 166.15, 138.505, 174.396, 142.175, 176.352);
  bezierVertex(144.393, 177.534, 146.402, 176.195, 147.863, 173.071);
  bezierVertex(148.869, 174.817, 149.982, 176.089, 151.154, 176.713);
  bezierVertex(155.618, 179.093, 159.237, 171.266, 159.237, 159.23);
  bezierVertex(159.237, 155.87, 158.955, 152.538, 158.451, 149.43);
  bezierVertex(161.699, 148.335, 164.049, 141.373, 164.049, 131.677);
  bezierVertex(164.049, 127.617, 163.63, 123.606, 162.911, 119.967);
  bezierVertex(164.776, 117.827, 166.023, 112.925, 166.023, 106.56);
  endShape();
  pop();
}
function draw_trees_layer1() {
  let distance_between_trees = 145;
  push();
  translate(0, -325);
  draw_tree();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_trees * cos(angle),
      distance_between_trees * sin(angle)
    );
    draw_tree();
  }
  pop();
}

function draw_trees_layer2() {
  let distance_between_trees = 145;
  push();
  translate(-20, -30);
  draw_tree();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_trees * cos(angle),
      distance_between_trees * sin(angle)
    );
    draw_tree();
  }
  pop();
}
function draw_trees_layer3() {
  let distance_between_trees = 145;
  push();
  translate(0, 90);
  draw_tree();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_trees * cos(angle),
      distance_between_trees * sin(angle)
    );
    draw_tree();
  }
  pop();
}

function draw_trees_layer4() {
  let distance_between_trees = 145;
  push();
  translate(-10, 390);
  draw_tree();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_trees * cos(angle),
      distance_between_trees * sin(angle)
    );
    draw_tree();
  }
  pop();
}
function draw_trees_layer5() {
  let distance_between_trees = 145;
  push();
  translate(0, 500);
  draw_tree();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_trees * cos(angle),
      distance_between_trees * sin(angle)
    );
    draw_tree();
  }
  pop();
}

function draw_home_layer1() {
  let distance_between_homes = 140;
  push();
  translate(0, -200);
  draw_home();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_homes * cos(angle),
      distance_between_homes * sin(angle)
    );
    draw_home();
  }
  pop();
}
function draw_home_layer2() {
  push();
  let distance_between_homes = 140;
  translate(0, -30);
  draw_home();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_homes * cos(angle),
      distance_between_homes * sin(angle)
    );
    draw_home();
  }
  pop();
}
function draw_home_layer3() {
  push();
  let distance_between_homes = 140;
  translate(0, 205);
  draw_home();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_homes * cos(angle),
      distance_between_homes * sin(angle)
    );
    draw_home();
  }
  pop();
}
function draw_home_layer4() {
  push();
  let distance_between_homes = 140;
  translate(0, 375);
  draw_home();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_homes * cos(angle),
      distance_between_homes * sin(angle)
    );
    draw_home();
  }
  pop();
}

function draw_home_layer5() {
  push();
  let distance_between_homes = 140;
  translate(0, 610);
  draw_home();
  for (let i = 0; i < 5; i++) {
    translate(
      distance_between_homes * cos(angle),
      distance_between_homes * sin(angle)
    );
    draw_home();
  }
  pop();
}

function draw_home() {
  push();
  noStroke();
  scale(0.15);
  fill("#babdb6");
  beginShape();
  vertex(61.41, 601.835);
  vertex(491.01, 865.614);
  vertex(491.01, 511.284);
  vertex(276.21, 255.379);
  vertex(61.41, 247.505);
  vertex(61.41, 601.835);
  endShape();
  fill("#d3d7cf");
  beginShape();
  vertex(491.01, 511.284);
  vertex(981.99, 245.822);
  vertex(981.99, 600.152);
  vertex(491.01, 865.614);
  vertex(491.01, 511.284);
  endShape();
  fill("#3465a4");
  beginShape();
  vertex(828.51, 399.556);
  vertex(751.791, 441.024);
  vertex(751.791, 529.618);
  vertex(828.51, 488.15);
  vertex(828.51, 399.556);
  endShape();
  vertex(736.448, 449.337);
  vertex(644.385, 499.118);
  vertex(644.385, 587.68);
  vertex(736.448, 537.899);
  vertex(736.448, 449.337);
  endShape();
  vertex(828.51, 505.868);
  vertex(751.791, 547.336);
  vertex(751.791, 618.211);
  vertex(828.51, 576.712);
  vertex(828.51, 505.868);
  endShape();
  vertex(736.448, 555.649);
  vertex(644.385, 605.399);
  vertex(644.385, 676.274);
  vertex(736.448, 626.493);
  vertex(736.448, 555.649);
  endShape();
  fill("#cc0000");
  beginShape();
  vertex(276.21, 255.309);
  vertex(552.38, 584.333);
  vertex(1043.36, 318.872);
  vertex(767.19, -10.152);
  vertex(276.21, 255.309);
  endShape();
  fill("#a40000");
  beginShape();
  vertex(0.01, 245.184);
  vertex(276.18, 255.308);
  vertex(767.16, -10.153);
  vertex(490.99, -20.277);
  vertex(0.01, 245.184);
  endShape();
  fill("#8f5902");
  beginShape();
  vertex(214.81, 695.958);
  vertex(214.81, 430.208);
  vertex(337.55, 505.574);
  vertex(337.55, 771.324);
  vertex(214.81, 695.958);
  endShape();
  fill("#babdb6");
  beginShape();
  vertex(982.41, 352.198);
  vertex(981.962, 369.749);
  vertex(828.532, 452.708);
  vertex(828.532, 434.991);
  vertex(982.412, 352.198);
  vertex(982.41, 352.198);
  endShape();
  fill("#204a87");
  beginShape();
  vertex(828.51, 452.756);
  vertex(828.51, 435.039);
  vertex(751.795, 476.518);
  vertex(751.795, 494.234);
  vertex(828.51, 452.755);
  vertex(828.51, 452.756);
  endShape();
  fill("#babdb6");
  beginShape();
  vertex(751.81, 494.244);
  vertex(736.467, 502.54);
  vertex(736.467, 484.823);
  vertex(751.81, 476.527);
  vertex(751.81, 494.244);
  endShape();
  fill("#204a87");
  beginShape();
  vertex(644.41, 552.307);
  vertex(644.41, 534.59);
  vertex(736.468, 484.815);
  vertex(736.468, 502.532);
  vertex(644.41, 552.307);
  endShape();
  fill("#babdb6");
  beginShape();
  vertex(644.41, 534.607);
  vertex(552.352, 584.382);
  vertex(490.98, 511.266);
  vertex(490.98, 635.286);
  vertex(644.41, 552.328);
  vertex(644.41, 534.607);
  endShape();
  pop();
}
