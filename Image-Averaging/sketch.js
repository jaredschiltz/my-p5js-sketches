let imageArray;
let finalImage;

function preload() {
  imageArray = new Array(12);
  for (let i = 0; i < imageArray.length; i++) {
    imageArray[i] = loadImage("clock" + str(i) + ".jpg");
  }
}

function setup() {
  createCanvas(280, 154);

  finalImage = imageArray[0];

  for (let rows = 0; rows < height; rows++) {
    for (let cols = 0; cols < width; cols++) {
      let green = 0;
      let red = 0;
      let blue = 0;
      for (let img = 0; img < 12; img++) {
        let c = imageArray[img].get(cols, rows);
        red += c[0];
        green += c[1];
        blue += c[2];
      }
      red = red / 12;
      green = green / 12;
      blue = blue / 12;
      finalImage.set(cols, rows, [red, green, blue, 255]);
    }
  }

  //let c = imageArray[9].get(100,50)
  // console.log(c)
  // finalImage.set(10,10,[255,0,0,255])
  finalImage.updatePixels();

  image(finalImage, 0, 0);

  noLoop();
}

function draw() {}
