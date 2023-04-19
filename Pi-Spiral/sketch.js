"use strict";
let color_array = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#3D5AFE",
  "#81D4FA",
  "#1DE9B6",
  "#4CAF50",
  "#8BC34A",
  "#C6FF00",
  "#FFEB3B",
  "#FFA000",
  "#FF3D00",
];

let my_font;

// first 1000 digits of pi
let pi =
  "3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679 8214808651 3282306647 0938446095 5058223172 5359408128 4811174502 8410270193 8521105559 6446229489 5493038196 4428810975 6659334461 2847564823 3786783165 2712019091 4564856692 3460348610 4543266482 1339360726 0249141273 7245870066 0631558817 4881520920 9628292540 9171536436 7892590360 0113305305 4882046652 1384146951 9415116094 3305727036 5759591953 0921861173 8193261179 3105118548 0744623799 6274956735 1885752724 8912279381 8301194912 9833673362 4406566430 8602139494 6395224737 1907021798 6094370277 0539217176 2931767523 8467481846 7669405132 0005681271 4526356082 7785771342 7577896091 7363717872 1468440901 2249534301 4654958537 1050792279 6892589235 4201995611 2129021960 8640344181 5981362977 4771309960 5187072113 4999999837 2978049951 0597317328 1609631859 5024459455 3469083026 4252230825 3344685035 2619311881 7101000313 7838752886 5875332083 8142061717 7669147303 5982534904 2875546873 1159562863 8823537875 9375195778 1857780532 1712268066 1300192787 6611195909 2164201989";
let spiral_radius;
function preload() {
  my_font = loadFont("OCR-A.ttf");
}

function setup() {
  canvas = createCanvas(648, 810);
  smooth();
  noLoop();
  spiral_radius = min(width / 2, height / 2);
  spiral_radius *= 0.9;
  // remove spaces
  pi = pi.replace(/\s/g, "");
  textFont(my_font);
}

function keyPressed() {
  saveCanvas(canvas, "pi", "jpg");
}
function draw() {
  background(0);
  let num_points = 1000;
  let angle_increment = PI / 32;
  let angle = -PI / 2;
  let point_size = 20;
  let point_size_decrement = 0.02;
  let radius_decrement = 0.3;
  let color_index = 0;

  let signature = "SCHILTZ'23";
  textSize(point_size * 0.75);
  let signature_x = width - 150;
  let signature_y = height - 30;
  for (let letter of signature) {
    fill(color_array[color_index]);
    text(letter, signature_x, signature_y);
    signature_x += 10;
    color_index = (color_index + 1) % color_array.length;
  }

  translate(width / 2, height / 2);
  color_index = 0;
  for (let p = 0; p < num_points; p++) {
    push();
    rotate(angle);
    translate(spiral_radius, 0);
    strokeWeight(point_size);
    stroke(color_array[color_index]);
    //point(0, 0);
    textSize(point_size);
    noStroke();
    fill(color_array[color_index]);
    push();
    rotate(PI / 2);
    text(pi[p], 0, 0);
    pop();
    pop();
    angle += angle_increment;
    spiral_radius -= radius_decrement;
    point_size -= point_size_decrement;
    color_index = (color_index + 1) % color_array.length;
  }
}
