/* Demonstrates you can read an SVG in and display it (beautiful),
   unlike, just reading it in and displaying it on p5js canvas.
   Also demonstrates you can edit the properties of the SVG and
   then save the file, exported as SVG */
const WIDTH_HEIGHT = 800;
let svg_import;
function preload() {
  svg_import = loadSVG("face.svg");
}
function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT, SVG);
}

function draw() {
  background("#cccccc");
  image(svg_import, 0, 0, 400, 400);
  image(svg_import, 400, 400, 400, 400);
  let path = querySVG("path");
  path[0].attribute("stroke", "#000000");
  path[0].attribute("stroke-width", 0.5);
  path[0].attribute("fill", "#FFFF00");

  path[1].attribute("stroke", "#000000");
  path[1].attribute("stroke-width", 0.5);
  path[1].attribute("fill", "#FFFF00");

  noLoop();
}

function keyPressed() {
  if (key === "s") {
    save(); // export SVG
  }
}
