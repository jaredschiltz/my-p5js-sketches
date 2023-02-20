"use strict";
let canvas;
let deer_head1;
let deer_head2;
let SMALLEST_CIRCLE_RADIUS = 2;
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

function preload() {
  deer_head1 = loadImage("deer-head1.png");
  //deer_head2 = loadImage("deer-head1.png");
}

function setup() {
  canvas = createCanvas(540, 675);
  smooth();
  noLoop();
}

function keyPressed() {
  saveCanvas(canvas, "deer", "jpg");
}
function draw() {
  background(0);
  noStroke();
  deer_head1.loadPixels();
  //image(deer_head2, 0, 0);
  print("running....");
  let count = 1;
  for (let iter = 0; iter < 1e9; iter++) {
    print("calculating circle #", count);
    let largest_circle = return_largest_circle();
    if (largest_circle.radius < SMALLEST_CIRCLE_RADIUS) {
      break;
    }
    let random_color = color_array[floor(random(0, color_array.length))];
    fill(random_color);

    //fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(
      largest_circle.position.x,
      largest_circle.position.y,
      largest_circle.radius * 2,
      largest_circle.radius * 2
    );
    update_valid_areas(largest_circle);
    count++;
  }
  print("draw finished!");
  //deer_head1.loadPixels();
  //image(deer_head1, 0, 0);
}

function update_valid_areas(circle_to_remove) {
  deer_head1.loadPixels();
  for (
    let y = circle_to_remove.position.y - circle_to_remove.radius;
    y < circle_to_remove.position.y + circle_to_remove.radius;
    y++
  ) {
    for (
      let x = circle_to_remove.position.x - circle_to_remove.radius;
      x < circle_to_remove.position.x + circle_to_remove.radius;
      x++
    ) {
      let distance = Math.sqrt(
        Math.abs(x - circle_to_remove.position.x) ** 2 +
          Math.abs(y - circle_to_remove.position.y) ** 2
      );
      if (distance <= circle_to_remove.radius) {
        let index = (x + y * deer_head1.width) * 4;
        deer_head1.pixels[index] = 255;
        deer_head1.pixels[index + 1] = 255;
        deer_head1.pixels[index + 2] = 255;
      }
    }
    deer_head1.updatePixels();
  }
  /*
  let i = 0; // way to remove elements from the array while interation; cpu friendly
  for (let j = 0; j < spots.length; j++) {
    let distance = Math.sqrt(
      Math.abs(spots[j].x - circle_to_remove.position.x) ** 2 +
        Math.abs(spots[j].y - circle_to_remove.position.y) ** 2
    );
    if (distance > circle_to_remove.radius) {
      spots[i] = spots[j];
      i++;
    }
  }
  spots.length = i;
  */
}

function return_largest_circle() {
  deer_head1.loadPixels();
  let largest_circle = { position: createVector(0, 0), radius: 0 };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * deer_head1.width) * 4;
      if (deer_head1.pixels[index] > 230) {
        continue;
      }
      let min_radius = find_minimum_distance(createVector(x, y));
      if (min_radius > largest_circle.radius) {
        largest_circle.position.x = x;
        largest_circle.position.y = y;
        largest_circle.radius = min_radius;
      }
    }
  }
  deer_head1.updatePixels();
  return largest_circle;
}

function find_minimum_distance(position) {
  // Finds the minimum distance from point to valid areas
  let min_radius = 1e9;
  for (let theta = 0; theta <= TWO_PI; theta += 0.1) {
    let radius = 1;
    while (radius < max(width, height)) {
      let vec_x = position.x + radius * cos(theta);
      let vec_y = position.y + radius * sin(theta);

      /*
      fill(255, 0, 0);
      ellipse(position.x, position.y, 10, 10);
      noFill();
      stroke(255, 0, 0);
      line(position.x, position.y, vec_x, vec_y);

      */
      let index = (int(vec_x) + int(vec_y) * deer_head1.width) * 4;
      if (
        deer_head1.pixels[int(index)] > 230 ||
        position.x + radius > width ||
        position.x - radius < 0 ||
        position.y + radius > height ||
        position.y - radius < 0
      ) {
        break;
      }
      radius++;
    }
    if (radius < min_radius) {
      min_radius = radius;
    }
  }
  return min_radius - 1; // have to account for the fact we went one pixel out of bounds (line 119)
}
