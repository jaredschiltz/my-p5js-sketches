const SIZE = 500;

function preload() {
  img = loadImage("https://picsum.photos/" + str(SIZE));
}
function setup() {
  createCanvas(2 * SIZE, SIZE);
  noLoop();
}

function draw() {
  background(220);
  image(img, 0, 0);
  img.loadPixels();

  // Load pixels into data structure for sorting
  let brightnessArray = [];
  for (let i = 0; i < img.pixels.length; i = i + 4) {
    brightnessArray.push({
      index: i,
      brightness: hue(
        /* change hue to hue for different effect */
        color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2])
      ),
    });
  }

  // Sort array by brightness
  brightnessArray.sort(function (a, b) {
    if (a.brightness < b.brightness) return -1;
    if (a.brightness > b.brightness) return 1;
    return 0;
  });

  // Create sorted image array based on sorted brightness pixels
  let sorted = createImage(img.width, img.height);
  sorted.loadPixels();
  for (let i = 0; i < brightnessArray.length; i++) {
    sorted.pixels[i * 4] = img.pixels[brightnessArray[i].index];
    sorted.pixels[i * 4 + 1] = img.pixels[brightnessArray[i].index + 1];
    sorted.pixels[i * 4 + 2] = img.pixels[brightnessArray[i].index + 2];
    sorted.pixels[i * 4 + 3] = 255;
  }

  sorted.updatePixels();
  image(sorted, SIZE, 0, SIZE, SIZE);
}
