/**
 * generates specific color palettes
 *
 * MOUSE
 * position x/y        : row and coloum count
 *
 * KEYS
 * 0-9                 : creates specific color palettes
 * s                   : save png
 * c                   : save color palette
 */
"use strict";

var tileCountX = 50;
var tileCountY = 10;

var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  // init with random values
  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = random(360);
    saturationValues[i] = random(100);
    brightnessValues[i] = random(100);
  }
}

function draw() {
  // white back
  background(0, 0, 100);

  // limit mouse coordinates to canvas
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  // tile counter
  var counter = 0;

  // map mouse to grid resolution
  var currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  var currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  var tileWidth = width / currentTileCountX;
  var tileHeight = height / currentTileCountY;

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      var index = counter % currentTileCountX;

      // get component color values
      fill(hueValues[index], saturationValues[index], brightnessValues[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter++;
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (key == "c" || key == "C") {
    // -- save an ase file (adobe swatch export) --
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(
        color(hueValues[i], saturationValues[i], brightnessValues[i])
      );
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), "ase");
  }

  // The three arrays are filled with random values. This means
  // any color can appear in the palette.
  if (key == "1") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(360);
      saturationValues[i] = random(100);
      brightnessValues[i] = random(100);
    }
  }

  // Brightness fixed at 100.
  // The result is a palette dominated by bright colors
  if (key == "2") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(360);
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  // Saturation fixed at 100.
  // The result is a palette with no pastel tones
  if (key == "3") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(360);
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    }
  }

  // Palette is just colors from black to white, through shades of grey
  if (key == "4") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 0;
      saturationValues[i] = 0;
      brightnessValues[i] = random(100);
    }
  }

  // Palette of dark blues
  if (key == "5") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    }
  }

  // Palette of light blues
  if (key == "6") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  // The hues are only selected from first half of color wheel.
  // Resulting in a palette of warm colors
  if (key == "7") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(180);
      saturationValues[i] = random(80, 100);
      brightnessValues[i] = random(50, 90);
    }
  }

  // The hues are only selected from second half of color wheel.
  // Resulting in a palette of cool colors
  if (key == "8") {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(180, 360);
      saturationValues[i] = random(80, 100);
      brightnessValues[i] = random(50, 90);
    }
  }

  // Mix of two color palettes
  if (key == "9") {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 == 0) {
        // Darker, more saturated color saved in the array
        hueValues[i] = random(360);
        saturationValues[i] = 100;
        brightnessValues[i] = random(100);
      } else {
        // Produce bright blue tones
        hueValues[i] = 195;
        saturationValues[i] = random(100);
        brightnessValues[i] = 100;
      }
    }
  }

  // Palette of blues and greens
  if (key == "0") {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 == 0) {
        hueValues[i] = 140;
        saturationValues[i] = random(30, 100);
        brightnessValues[i] = random(40, 100);
      } else {
        hueValues[i] = 210;
        saturationValues[i] = random(40, 100);
        brightnessValues[i] = random(50, 100);
      }
    }
  }
}
