let from;
let to;
let iterations
let black_color
let white_color
// Full mandlebrot
/*
let xmin = -2.0
let xmax = 2.0
let ymin = -2.0
let ymax = 2.0
*/
let xmin = -0.56
let xmax = -0.57
let ymin = -0.56
let ymax = -0.57

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  from = color(218, 165, 32);
  to = color(72, 61, 139);
  black_color = color(0,100,100,100)
  white_color = color(100,100,100,100)
  iterations = 100
  

  noLoop();
}

function draw() {
  loadPixels();
  let d = pixelDensity();

  let numPixels = 4 * (width * d) * (height * d);
  let max_distance = sqrt(width ** 2 + height ** 2);
  //print(max_distance)

  for (let i = 0; i < numPixels; i = i + 4) {
    let y_pos = floor(i / (width * d * 4));
    let x_pos = i % (width * 4 * d);
    let convertXPos = map(x_pos, 0, width * 2 * 4 - 4, 0, width * d - 1);
    //print("x_pos: ", convertXPos, " y_pos: ", y_pos)
    // convert pixel locations to cartesian formats
    let x_cart = map(convertXPos, 0, width * 2 - 1, ymin, ymax);
    let y_cart = map(y_pos, 0, height * 2 - 1, xmin, xmax);
    //print("x_cart: ", x_cart, " y_cart: ", y_cart)
    let mandelColor
    let numIterations = mandelbrot(createVector(x_cart, y_cart), iterations) 
    if(numIterations >= iterations){
      mandelColor = white_color
    }
    else {
      mandelColor = color(map(numIterations,0,iterations,0,360),100,100,100)
    }
    /*
    let pixelColor = lerpColor(
      from,
      to,
      map(distance, 0, max_distance, 0.0, 1.0)
    );
    */
    colorMode(RGB)
    pixels[i] = red(mandelColor);
    pixels[i + 1] = green(mandelColor);
    pixels[i + 2] = blue(mandelColor);
    pixels[i + 3] = alpha(mandelColor);
  }
  updatePixels();
  print("done");
}

function mandelbrot(c, max_iter) {
  z = createVector(0, 0);
  let iteration;
  for (iteration = 0; iteration < max_iter; iteration++) {
    // Compute (z^2) + c
    let real = z.x * z.x - z.y * z.y + c.x;
    let imag = 2 * (z.x * z.y) + c.y;
    z.x = real;
    z.y = imag;
    if (z.mag() > 40) {
      break;
    }
  }
  return iteration;
}
