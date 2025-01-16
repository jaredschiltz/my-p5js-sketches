/*
Genuary 2025 - January 16th Prompt: Generative Palette
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let image_to_load;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
  image_to_load = loadImage("girl-lollipop.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  street_color = color("#707070");
  sidewalk_color = color("#ffffe4");
  lawn_color = color("#4da409");
  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  /*
  let neon_green = chroma(111, 239, 72);
  print(`hex value is ${neon_green.hex()}`);
  print(`hsv value is ${neon_green.hsv()}`);
  */
  noLoop();
}

function draw() {
  pixelDensity(1);
  let density = pixelDensity();
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  // Draw Border
  background(255);
  noFill();
  //stroke(0);
  //rect(start_pos, start_pos, border_size, border_size);

  // Generate colors
  const NUM_COLORS = 3; // This is the number of clusters
  let random_color_angle = random(0, 360);
  const color_angle = 360 / NUM_COLORS;
  let color_array = [];
  for (let i = 0; i < NUM_COLORS; i++) {
    color_array.push(
      chroma((random_color_angle + i * color_angle) % 360, 1, 1, "hsv")
    );
  }

  // Compute K-Means of pixels
  let centroid = [];
  let centroidIndex = [];
  let clusters = [];
  clusters = new Array(NUM_COLORS);
  for (let i = 0; i < clusters.length; i++) {
    clusters[i] = new Array();
  }

  // Step 1: Select k random points from data as starting centroids
  //         Each point must be different.
  let pixel_array_length = image_to_load.width * image_to_load.height;

  for (let i = 0; i < NUM_COLORS; i++) {
    if (i == 0) {
      centroidIndex[0] = Math.floor(Math.random() * pixel_array_length);
    } else {
      let differentValue = false;

      while (!differentValue) {
        let newValue = Math.floor(Math.random() * pixel_array_length);
        // compare against all previous values
        for (let j = 0; j < i; j++) {
          if (newValue != centroidIndex[j]) {
            differentValue = true;
            centroidIndex[i] = newValue;
          } else {
            differentValue = false;
            break;
          }
        }
      }
    }
  }

  image_to_load.loadPixels();
  // Populate centroid array
  for (i = 0; i < NUM_COLORS; i++) {
    let centroid_row = floor(centroidIndex[i] / image_to_load.width);
    let centroid_col = centroidIndex[i] % image_to_load.width;
    let index =
      (centroid_col + centroid_row * image_to_load.width * density) * 4;
    centroid[i] = chroma(
      image_to_load.pixels[index],
      image_to_load.pixels[index + 1],
      image_to_load.pixels[index + 2],
      "rgb"
    );
  }

  const NUMBER_OF_K_MEANS_ITERATIONS = 1;
  for (let iters = 0; iters < NUMBER_OF_K_MEANS_ITERATIONS; iters++) {
    // Step 2:
    // Assign all the points to the closest cluster centroid
    distArray = new Array(NUM_COLORS);
    for (let rows = 0; rows < image_to_load.height; rows++) {
      for (let cols = 0; cols < image_to_load.width; cols++) {
        let index = (cols + rows * image_to_load.width * density) * 4;
        for (let i = 0; i < NUM_COLORS; i++) {
          distArray[i] = chroma.distance(
            centroid[i],
            chroma(
              image_to_load.pixels[index],
              image_to_load.pixels[index + 1],
              image_to_load.pixels[index + 2],
              "rgb"
            )
          );
        }
        clusters[distArray.indexOf(Math.min(...distArray))].push({
          index: index,
        });
      }
    }

    // Step 3
    // Recompute the centroids of newly formed clusters
    for (let cluster = 0; cluster < clusters.length; cluster++) {
      let red_mean = 0;
      let green_mean = 0;
      let blue_mean = 0;
      for (let c of clusters[cluster]) {
        red_mean += image_to_load.pixels[c.index];
        green_mean += image_to_load.pixels[c.index + 1];
        blue_mean += image_to_load.pixels[c.index + 2];
      }
      red_mean /= clusters[cluster].length;
      green_mean /= clusters[cluster].length;
      blue_mean /= clusters[cluster].length;

      centroid[i] = chroma(red_mean, green_mean, blue_mean, "rgb");
    }
  }

  // show clusters debug
  for (let cluster = 0; cluster < clusters.length; cluster++) {
    for (let c of clusters[cluster]) {
      image_to_load.pixels[c.index] = color_array[cluster].get("rgb.r");
      image_to_load.pixels[c.index + 1] = color_array[cluster].get("rgb.g");
      image_to_load.pixels[c.index + 2] = color_array[cluster].get("rgb.b");
    }
  }

  image_to_load.updatePixels();

  image(image_to_load, start_pos, start_pos, border_size, border_size);

  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(google_font);
  text(">> 25.16", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
