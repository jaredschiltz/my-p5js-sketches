"use strict";

let word_array = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE"];
let color_array;
const WIDTH_HEIGHT = 600;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  // these are based on my own perceptions of what I think
  // more even spacing looks like between the colors.
  color_array = [
    color(255,0,0),
    color(250,118,4),
    color(235,255,0),
    color(0,213,64),
    color(0,63,222),
  ];

  //noLoop();
}

function draw() {
  let text_size = 80;
  background(0, 0, 0);
  let num_words = word_array.length;
  textSize(text_size);
  fill(color_array[0])
  text(word_array[0], 200, text_size + 0 * text_size * 1.5);
  
    fill(color_array[1])

  text(word_array[1], 200, text_size + 1 * text_size * 1.5);


    fill(color_array[2])

  text(word_array[2], 200, text_size + 2 * text_size * 1.5);
    // let green_color = my_chroma_depth(slider.value())
 
    fill(color_array[3])
  text(word_array[3], 200, text_size + 3 * text_size * 1.5);
    //let blue_color = my_chroma_depth(slider.value())

  fill(color_array[4])
  text(word_array[4], 200, text_size + 4 * text_size * 1.5);
  


}

function chroma_depth(t) {
  // chroma depth calculation takes from glsl shader:
  // https://web.engr.oregonstate.edu/~mjb/chromadepth/glsl.html

  // depth to take on values from 0.0 (closet) to 1.0 (farthest away)
  // have to scale max value from 1.0 to 2/3 to get farthest away color to be blue

  t = map(t, 0, 1.0, 0.0, 2.0 / 3.0);

  let rgb = { r: 0, g: 0, b: 0 };
  rgb.r = 1.0;
  rgb.g = 0.0;
  rgb.b = 1.0 - 6.0 * (t - 5.0 / 6.0);

  if (t <= 5.0 / 6.0) {
    rgb.r = 6.0 * (t - 4.0 / 6.0);
    rgb.g = 0.0;
    rgb.b = 1.0;
  }

  if (t <= 4.0 / 6.0) {
    rgb.r = 0.0;
    rgb.g = 1.0 - 6.0 * (t - 3.0 / 6.0);
    rgb.b = 1.0;
  }

  if (t <= 3.0 / 6.0) {
    rgb.r = 0.0;
    rgb.g = 1.0;
    rgb.b = 6.0 * (t - 2.0 / 6.0);
  }

  if (t <= 2.0 / 6.0) {
    rgb.r = 1.0 - 6.0 * (t - 1.0 / 6.0);
    rgb.g = 1.0;
    rgb.b = 0.0;
  }

  if (t <= 1.0 / 6.0) {
    rgb.r = 1.0;
    rgb.g = 6.0 * t;
  }

  // rgb is calculated as maximum of (1.0, 1.0, 1.0)
  // convert this to (255,255,255) to be used with p5js color object
  rgb.r *= 255.0;
  rgb.g *= 255.0;
  rgb.b *= 255.0;
  return rgb;
}

function my_chroma_depth(d) {
  // depth ranges from 0 (closest) to 255 (farthest away)
  let depth = clamp(d, 0, 255);
  let chroma_palette = [
    color(250, 0, 0),
    color(250, 3, 0),
    color(250, 5, 0),
    color(250, 8, 0),
    color(250, 10, 0),
    color(250, 13, 0),
    color(250, 15, 1),
    color(250, 18, 1),
    color(250, 21, 1),
    color(250, 23, 1),
    color(250, 26, 1),
    color(250, 28, 1),
    color(250, 31, 1),
    color(250, 33, 1),
    color(250, 36, 1),
    color(250, 39, 1),
    color(250, 41, 1),
    color(250, 44, 1),
    color(250, 46, 2),
    color(250, 49, 2),
    color(250, 51, 2),
    color(250, 54, 2),
    color(250, 57, 2),
    color(250, 59, 2),
    color(250, 62, 2),
    color(250, 64, 2),
    color(250, 67, 2),
    color(250, 70, 2),
    color(250, 72, 2),
    color(250, 75, 2),
    color(250, 77, 3),
    color(250, 80, 3),
    color(250, 82, 3),
    color(250, 85, 3),
    color(250, 88, 3),
    color(250, 90, 3),
    color(250, 93, 3),
    color(250, 95, 3),
    color(250, 98, 3),
    color(250, 100, 3),
    color(250, 103, 3),
    color(250, 106, 3),
    color(250, 108, 4),
    color(250, 111, 4),
    color(250, 113, 4),
    color(250, 116, 4),
    color(250, 118, 4),
    color(250, 121, 4),
    color(248, 122, 11),
    color(248, 125, 11),
    color(248, 128, 11),
    color(248, 130, 10),
    color(248, 133, 10),
    color(248, 136, 10),
    color(248, 139, 10),
    color(248, 142, 9),
    color(249, 144, 9),
    color(249, 147, 9),
    color(249, 150, 9),
    color(249, 153, 8),
    color(249, 156, 8),
    color(249, 159, 8),
    color(249, 161, 8),
    color(249, 164, 7),
    color(255, 170, 0),
    color(255, 172, 0),
    color(255, 174, 0),
    color(255, 175, 0),
    color(255, 177, 0),
    color(255, 179, 0),
    color(255, 181, 0),
    color(255, 182, 0),
    color(255, 184, 0),
    color(255, 186, 0),
    color(255, 188, 0),
    color(255, 189, 0),
    color(255, 191, 0),
    color(255, 193, 0),
    color(255, 195, 0),
    color(255, 197, 0),
    color(255, 198, 0),
    color(255, 200, 0),
    color(255, 202, 0),
    color(255, 204, 0),
    color(255, 205, 0),
    color(255, 207, 0),
    color(255, 209, 0),
    color(255, 211, 0),
    color(255, 213, 0),
    color(255, 214, 0),
    color(255, 216, 0),
    color(255, 218, 0),
    color(255, 220, 0),
    color(255, 221, 0),
    color(255, 223, 0),
    color(255, 225, 0),
    color(255, 227, 0),
    color(255, 228, 0),
    color(255, 230, 0),
    color(255, 232, 0),
    color(255, 234, 0),
    color(255, 236, 0),
    color(255, 237, 0),
    color(255, 239, 0),
    color(255, 241, 0),
    color(255, 243, 0),
    color(255, 244, 0),
    color(255, 246, 0),
    color(255, 248, 0),
    color(255, 250, 0),
    color(255, 251, 0),
    color(255, 253, 0),
    color(255, 255, 0),
    color(251, 255, 0),
    color(247, 255, 0),
    color(243, 255, 0),
    color(239, 255, 0),
    color(235, 255, 0),
    color(231, 255, 0),
    color(227, 255, 0),
    color(223, 255, 0),
    color(219, 255, 0),
    color(215, 255, 0),
    color(210, 255, 0),
    color(206, 255, 0),
    color(202, 255, 0),
    color(198, 255, 0),
    color(194, 255, 0),
    color(190, 255, 0),
    color(186, 255, 0),
    color(182, 255, 0),
    color(178, 255, 0),
    color(174, 255, 0),
    color(170, 255, 0),
    color(166, 255, 0),
    color(162, 255, 0),
    color(158, 255, 0),
    color(154, 255, 0),
    color(150, 255, 0),
    color(146, 255, 0),
    color(142, 255, 0),
    color(138, 255, 0),
    color(134, 255, 0),
    color(130, 255, 0),
    color(125, 255, 0),
    color(121, 255, 0),
    color(117, 255, 0),
    color(113, 255, 0),
    color(109, 255, 0),
    color(105, 255, 0),
    color(101, 255, 0),
    color(97, 255, 0),
    color(93, 255, 0),
    color(89, 255, 0),
    color(85, 255, 0),
    color(81, 255, 0),
    color(77, 255, 0),
    color(73, 255, 0),
    color(69, 255, 0),
    color(65, 255, 0),
    color(61, 255, 0),
    color(57, 255, 0),
    color(53, 255, 0),
    color(49, 255, 0),
    color(45, 255, 0),
    color(40, 255, 0),
    color(36, 255, 0),
    color(32, 255, 0),
    color(28, 255, 0),
    color(24, 255, 0),
    color(20, 255, 0),
    color(16, 255, 0),
    color(12, 255, 0),
    color(8, 255, 0),
    color(4, 255, 0),
    color(0, 255, 0),
    color(0, 251, 5),
    color(0, 248, 11),
    color(0, 244, 16),
    color(0, 241, 21),
    color(0, 237, 27),
    color(0, 234, 32),
    color(0, 230, 37),
    color(0, 227, 43),
    color(0, 223, 48),
    color(0, 220, 53),
    color(0, 216, 58),
    color(0, 213, 64),
    color(0, 209, 69),
    color(0, 205, 74),
    color(0, 202, 80),
    color(0, 198, 85),
    color(0, 195, 90),
    color(0, 191, 96),
    color(0, 188, 101),
    color(0, 184, 106),
    color(0, 181, 112),
    color(0, 177, 117),
    color(0, 174, 122),
    color(0, 170, 128),
    color(0, 166, 133),
    color(0, 163, 138),
    color(0, 159, 143),
    color(0, 156, 149),
    color(0, 152, 154),
    color(0, 149, 159),
    color(0, 145, 165),
    color(0, 142, 170),
    color(0, 138, 175),
    color(0, 135, 181),
    color(0, 131, 186),
    color(0, 128, 191),
    color(0, 124, 197),
    color(0, 120, 202),
    color(0, 117, 207),
    color(0, 113, 213),
    color(0, 110, 218),
    color(0, 106, 223),
    color(0, 103, 228),
    color(0, 99, 234),
    color(0, 96, 239),
    color(0, 92, 244),
    color(0, 89, 250),
    color(0, 85, 255),
    color(0, 82, 251),
    color(0, 80, 247),
    color(0, 77, 243),
    color(0, 74, 239),
    color(0, 71, 235),
    color(0, 69, 230),
    color(0, 66, 226),
    color(0, 63, 222),
    color(0, 60, 218),
    color(0, 58, 214),
    color(0, 55, 210),
    color(0, 52, 206),
    color(0, 49, 202),
    color(0, 47, 198),
    color(0, 44, 194),
    color(0, 41, 189),
    color(0, 38, 185),
    color(0, 36, 181),
    color(0, 33, 177),
    color(0, 30, 173),
    color(0, 27, 169),
    color(0, 25, 165),
    color(0, 22, 161),
    color(0, 19, 157),
    color(0, 16, 153),
    color(0, 14, 148),
    color(0, 11, 144),
    color(0, 8, 140),
    color(0, 5, 136),
    color(0, 3, 132),
    color(0, 0, 128),
    color(0, 0, 0),
  ];
  return chroma_palette[round(depth)];
}
function clamp(x, min, max) {
  if (x > max) {
    x = max;
  }
  if (x < min) {
    x = min;
  }
  return x;
}
