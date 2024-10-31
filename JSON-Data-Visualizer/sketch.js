// Pull 7 day hourly forecast for Denver using this link
// https://api.weather.gov/gridpoints/BOU/63,62/forecast/hourly
let weather_data;
const WIDTH_HEIGHT = 800;
function preload() {
  weather_data = loadJSON("weather.json");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background(20);
  noFill();
  stroke("#FF4433");
  strokeWeight(3);
  beginShape();
  const scaling_factor = 20;
  const offset = 500;
  let i = 0;
  vertex(i, height / 2);
  let point_spacing = width / (weather_data.properties.periods.length - 1);
  for (let p of weather_data.properties.periods) {
    vertex(i * point_spacing, offset + height - p.temperature * scaling_factor);
    //print(`time: ${p.startTime} temp: ${p.temperature}`);
    i++;
  }
  endShape();
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
