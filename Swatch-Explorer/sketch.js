"use strict";
let swatch_generator;
let swatch_number;
let swatch_foreground_color_nums;

function setup() {
  createCanvas(1080 / 2, 1350 / 2);
  swatch_generator = new SwatchGenerator();
  swatch_number = floor(random(0, swatch_generator.ART_SWATCHES.length));
  swatch_number = 0;
  print(swatch_generator.ART_SWATCHES[swatch_number].label);
  swatch_foreground_color_nums =
    swatch_generator.ART_SWATCHES[swatch_number].colors.length;
}

function mouseClicked() {
  swatch_number = (swatch_number + 1) % swatch_generator.ART_SWATCHES.length;
  print(swatch_generator.ART_SWATCHES[swatch_number].label);
  swatch_foreground_color_nums =
    swatch_generator.ART_SWATCHES[swatch_number].colors.length;
}

function draw() {
  background(
    color(swatch_generator.ART_SWATCHES[swatch_number].backgroundColor)
  );
  noFill();
  stroke(255);
  strokeWeight(3);
  let current_color_num = 0;
  for (let i = 0; i < 18; i++) {
    stroke(
      swatch_generator.ART_SWATCHES[swatch_number].colors[current_color_num]
    );
    current_color_num = (current_color_num + 1) % swatch_foreground_color_nums;
    circle(width / 2, height / 2, 50 + i * 50);
  }
}
