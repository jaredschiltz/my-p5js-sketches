let cnv;
let rainbow_color_array;
let red_grey_black_palette;

function setup() {
  cnv = createCanvas(700, 700);
  //colorMode(HSB, 255);
  rainbow_color_array = new Array();
  rainbow_color_array.push(color("#9400D3"));
  rainbow_color_array.push(color("#4B0082"));
  rainbow_color_array.push(color("#0000FF"));
  rainbow_color_array.push(color("#00FF00"));
  rainbow_color_array.push(color("#FFFF00"));
  rainbow_color_array.push(color("#FF7F00"));
  rainbow_color_array.push(color("#FF0000"));
  palette1 = [color("#ffc3b2"), color("#f765ff")];
  palette1_reversed = [color("#f765ff"), color("#ffc3b2")];

  noLoop();
}

function draw() {
  background(255);
  gradient(palette1, 0, 0, width, height);
  let current_width = width;
  let current_height = height;
  let scale_factor = 0.75;
  let x = 1;
  let current_palette;
  for (let i = 0; i < 5; i++) {
    if (x == 0) {
      current_palette = palette1;
    } else {
      current_palette = palette1_reversed;
    }

    current_width *= scale_factor;
    current_height *= scale_factor;
    gradient(
      current_palette,
      (width - current_width) / 2,
      (height - current_height) / 2,
      current_width,
      current_height
    );
    x++;
    x = x % 2;
  }
}

function gradient(color_array, x, y, w, h) {
  console.assert(color_array.length >= 2, "Not enough colors");
  // calculate each color band height
  let color_band_height = floor(h / (color_array.length - 1));
  let current_y = 0;
  let current_color_index = 0;
  stroke(255, 0, 0);
  strokeWeight(2.0);
  for (let line_y = y; line_y < y + h; line_y++) {
    stroke(
      lerpColor(
        color_array[current_color_index],
        color_array[current_color_index + 1],
        (current_y % color_band_height) / color_band_height
      )
    );
    line(x, line_y, x + w, line_y);

    if (current_y % color_band_height == color_band_height - 1) {
      // handle next colorband
      current_color_index++;
      if (current_color_index + 1 >= color_array.length) {
        current_color_index--;
      }
      current_y = 0;
    } else {
      current_y++;
    }
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas(cnv, "background", "jpg");
  }
}
