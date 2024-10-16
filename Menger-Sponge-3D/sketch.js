let easycam;
let iterations = 3;
let cube_width;
let cube_array;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes("antialias", true);

  easycam = createEasyCam();
  // suppress right-click context menu
  document.oncontextmenu = function () {
    return false;
  };
  cube_width = 100;
  cube_array = new Array();
  build_sponge(createVector(0, 0, 0), cube_width, iterations);
}

function draw() {
  noStroke();
  background(20);
  pointLight(255, 255, 0, 150, -250, 300);
  normalMaterial();
  //specularMaterial(255, 255, 255);
  //lights();
  for (let i = 0; i < cube_array.length; i++) {
    push();
    translate(cube_array[i].vector.x, cube_array[i].vector.y, cube_array[i].vector.z);
    box(cube_array[i].cube_width);
    pop();
  }
}

function build_sponge(center, cube_width, iterations) {
  cube_width = cube_width / 3.0;
  if (iterations == 1) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (
            !(i == 0 && j == 0 && k == 0) &&
            !(i == 1 && j == 0 && k == 0) &&
            !(i == -1 && j == 0 && k == 0) &&
            !(i == 0 && j == 1 && k == 0) &&
            !(i == 0 && j == -1 && k == 0) &&
            !(i == 0 && j == 0 && k == 1) &&
            !(i == 0 && j == 0 && k == -1)         
          ) {
            cube_array.push({
              vector: createVector(
                center.x + i * cube_width,
                center.y + j * cube_width,
                center.z + k * cube_width
              ),
              cube_width: cube_width
            }
            );
          }
        }
      }
    }
    return;
  } else {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (
            !(i == 0 && j == 0 && k == 0) &&
            !(i == 1 && j == 0 && k == 0) &&
            !(i == -1 && j == 0 && k == 0) &&
            !(i == 0 && j == 1 && k == 0) &&
            !(i == 0 && j == -1 && k == 0) &&
            !(i == 0 && j == 0 && k == 1) &&
            !(i == 0 && j == 0 && k == -1)         
          ) {
            build_sponge(
              createVector(
                center.x + i * cube_width,
                center.y + j * cube_width,
                center.z + k * cube_width
              ),
              cube_width,
              iterations - 1
            );
          }
        }
      }
    }
  }
}
