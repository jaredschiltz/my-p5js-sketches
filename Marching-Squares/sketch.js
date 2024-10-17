// https://github.com/blindman67/SimplexNoiseJS
//  just using different random seeds - not a gif loop
let inc = 0.1;
let zoff = 0;
let openSimplex
let field = [];
let rez = 20;
let xoff = 0;
let yoff = 0;
let cols, rows;

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  openSimplex = openSimplexNoise(random(42))
  cols = width / rez;
  rows = height / rez;
  //frameRate(10);


}





function draw() {
  background(0);
  xoff = 0;
  for (let i = 0; i <= rows; i++) {
    xoff += inc;
    yoff = 0;
    field[i] = [];
    for (let j = 0; j <= cols; j++) {
      field[i][j] = openSimplex.noise3D(xoff, yoff, zoff);
      yoff += inc;
    }
  }
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      stroke(0,field[i][j] * 255,0);
      strokeWeight(rez * 0.4);
      point(j * rez, i * rez);
      drawDiagonal(i, j);
    }
  }

  zoff += 0.05;
}

function drawDiagonal(i, j) {

  // Square Indices To Bit Value
  //  3 ______ 2
  //  |        |
  //  |        |
  //  0 ______ 1

  let bitZero;
  let bitOne;
  let bitTwo;
  let bitThree;

  // Get Corner Values
  if (i < (rows) && j < (cols)) {
    bitZero = ceil(field[i + 1][j]);
    bitOne = ceil(field[i + 1][j + 1]);
    bitTwo = ceil(field[i][j + 1]);
    bitThree = ceil(field[i][j]);

    //Draw 
    strokeWeight(rez * 0.1);
    stroke(0, 255, 0);
    switch (bitThree << 3 | bitTwo << 2 | bitOne << 1 | bitZero) {
      case 0:
        //No Isoline
        break;

      case 1:
        line(j * rez, i * rez + rez / 2, j * rez + rez / 2, i * rez + rez);
        break;

      case 2:
        line(j * rez + rez / 2, i * rez + rez, j * rez + rez, i * rez + rez / 2);
        break;

      case 3:
        line(j * rez, i * rez + rez / 2, j * rez + rez, i * rez + rez / 2);
        break;

      case 4:
        line(j * rez + rez / 2, i * rez, j * rez + rez, i * rez + rez / 2);
        break;

      case 5:
        line(j * rez, i * rez + rez / 2, j * rez + rez / 2, i * rez);
        line(j * rez + rez / 2, i * rez + rez, j * rez + rez, i * rez + rez / 2);
        break;

      case 6:
        line(j * rez + rez / 2, i * rez, j * rez + rez / 2, i * rez + rez);
        break;

      case 7:
        line(j * rez, i * rez + rez / 2, j * rez + rez / 2, i * rez);
        break;

      case 8:
        line(j * rez, i * rez + rez / 2, j * rez + rez / 2, i * rez);
        break;

      case 9:
        line(j * rez + rez / 2, i * rez, j * rez + rez / 2, i * rez + rez);
        break;

      case 10:
        line(j * rez + rez / 2, i * rez, j * rez + rez, i * rez + rez / 2);
        line(j * rez, i * rez + rez / 2, j * rez + rez / 2, i * rez + rez);
        break;

      case 11:
        line(j * rez + rez / 2, i * rez, j * rez + rez, i * rez + rez / 2);
        break;

      case 12:
        line(j * rez, i * rez + rez / 2, j * rez + rez, i * rez + rez / 2);
        break;

      case 13:
        line(j * rez + rez / 2, i * rez + rez, j * rez + rez, i * rez + rez / 2);
        break;

      case 14:
        line(j * rez, i * rez + rez / 2, j * rez + rez / 2, i * rez + rez);
        break;

      case 15:
        //No Isoline
        break;

      default:

    }
  }

}



