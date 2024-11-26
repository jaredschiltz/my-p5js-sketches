const WIDTH_HEIGHT = 800;
// https://github.com/blindman67/SimplexNoiseJS
//  just using different random seeds - not a gif loop
let inc = 0.1;
let zoff = 0;
let openSimplex;
let field = [];
let rez;
let xoff = 0;
let yoff = 0;
let cols, rows;
const NUMBER_CELLS_PER_WIDTH_HEIGHT = 30;

let contour_points = [];

function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  openSimplex = openSimplexNoise(random(42));
  cols = NUMBER_CELLS_PER_WIDTH_HEIGHT;
  rows = NUMBER_CELLS_PER_WIDTH_HEIGHT;
  rez = width / NUMBER_CELLS_PER_WIDTH_HEIGHT;
  noLoop();
}

function draw() {
  background(0);
  xoff = 0;
  for (let i = 0; i <= rows; i++) {
    xoff += inc;
    yoff = 0;
    field[i] = [];
    for (let j = 0; j <= cols; j++) {
      field[i][j] = map(openSimplex.noise3D(xoff, yoff, zoff), -1, 1, 0, 1);
      yoff += inc;
    }
  }
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let noise_value = field[i][j];
      stroke(noise_value * 255, noise_value * 255, noise_value * 255);
      strokeWeight(rez * 0.4);
      point(j * rez, i * rez);
      compute_contours(i, j, 0.7, color(255, 255, 0));
      //compute_contours(i, j, 0.6, color(255, 0, 0));
    }
  }

  zoff += 0.05;
  make_contour_chains();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function compute_contours(i, j, threshold, stroke_colour) {
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
  if (i < rows && j < cols) {
    bitZero = field[i + 1][j] < threshold ? 0 : 1;
    bitOne = field[i + 1][j + 1] < threshold ? 0 : 1;
    bitTwo = field[i][j + 1] < threshold ? 0 : 1;
    bitThree = field[i][j] < threshold ? 0 : 1;

    //Draw
    strokeWeight(rez * 0.1);
    stroke(stroke_colour);
    let x1;
    let y1;
    let x2;
    let y2;
    switch ((bitThree << 3) | (bitTwo << 2) | (bitOne << 1) | bitZero) {
      // Specify Contour Points in clock-wise order
      case 0:
        //No Isoline
        //  O ______ O
        //  |        |
        //  |        |
        //  |        |
        //  O ______ O

        break;

      case 1:
        //  O ______ O
        //  |        |
        //  |\       |
        //  | \      |
        //  X__\_____O

        x1 = floor(j * rez);
        y1 = floor(i * rez + rez / 2);
        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez + rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 2:
        //  O ______ O
        //  |        |
        //  |       /|
        //  |      / |
        //  O_____/__X

        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez + rez);
        x2 = floor(j * rez + rez);
        y2 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 3:
        //  O ______ O
        //  |        |
        //  |--------|
        //  |        |
        //  X________X

        x1 = floor(j * rez);
        y1 = floor(i * rez + rez / 2);
        x2 = floor(j * rez + rez);
        y2 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 4:
        //  O ______ X
        //  |     \  |
        //  |      \ |
        //  |        |
        //  O________O

        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez);
        x1 = floor(j * rez + rez);
        y1 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 5:
        //  O ______ X
        //  |  /     |
        //  | /     /|
        //  |/     / |
        //  X_____/__O

        x1 = floor(j * rez);
        y1 = floor(i * rez + rez / 2);
        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);

        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez + rez);
        x1 = floor(j * rez + rez);
        y1 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 6:
        //  O ______ X
        //  |    |   |
        //  |    |   |
        //  |    |   |
        //  O____|___X

        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez);
        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez + rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 7:
        //  O ______ X
        //  |  /     |
        //  | /      |
        //  |        |
        //  X________X

        x1 = floor(j * rez);
        y1 = floor(i * rez + rez / 2);
        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });
        line(x1, y1, x2, y2);
        break;

      case 8:
        //  X ______ O
        //  |  /     |
        //  | /      |
        //  |        |
        //  O________O

        x2 = floor(j * rez);
        y2 = floor(i * rez + rez / 2);
        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });
        line(x1, y1, x2, y2);
        break;

      case 9:
        //  X ______ O
        //  |    |   |
        //  |    |   |
        //  |    |   |
        //  X____|___O

        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez);
        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez + rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 10:
        //  X ______ O
        //  |     \  |
        //  |\     \ |
        //  | \     \|
        //  O__\_____X

        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez);
        x2 = floor(j * rez + rez);
        y2 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);

        x2 = floor(j * rez);
        y2 = floor(i * rez + rez / 2);
        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez + rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 11:
        //  X ______ O
        //  |     \  |
        //  |      \ |
        //  |        |
        //  X________X

        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez);
        x2 = floor(j * rez + rez);
        y2 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 12:
        //  X ______ X
        //  |        |
        //  |--------|
        //  |        |
        //  O________O

        x2 = floor(j * rez);
        y2 = floor(i * rez + rez / 2);
        x1 = floor(j * rez + rez);
        y1 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });
        line(x1, y1, x2, y2);
        break;

      case 13:
        //  X ______ X
        //  |        |
        //  |       /|
        //  |      / |
        //  X_____/__O

        x2 = floor(j * rez + rez / 2);
        y2 = floor(i * rez + rez);
        x1 = floor(j * rez + rez);
        y1 = floor(i * rez + rez / 2);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 14:
        //  X ______ X
        //  |        |
        //  |\       |
        //  | \      |
        //  O__\_____X

        x2 = floor(j * rez);
        y2 = floor(i * rez + rez / 2);
        x1 = floor(j * rez + rez / 2);
        y1 = floor(i * rez + rez);

        contour_points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
        });

        line(x1, y1, x2, y2);
        break;

      case 15:
        //No Isoline
        //  X ______ X
        //  |        |
        //  |        |
        //  |        |
        //  X ______ X

        break;

      default:
    }
  }
}

function make_contour_chains() {
  let chains = new Array();
  let chain_number = 0;
  chains[chain_number] = new Array();
  let chain_valid = { cw: true, ccw: true };
  let current_index_to_remove = contour_points.length - 1;
  let point_to_start_search = contour_points[contour_points.length - 1];
  while (contour_points.length) {
    if (chain_valid.cw) {
      let pop_value = contour_points.splice(current_index_to_remove, 1)[0];
      // console.log(
      //   `removed point: x1: ${pop_value.x1} y1: ${pop_value.y1} x2: ${pop_value.x2} y2: ${pop_value.y2}`
      // );
      chains[chain_number].push({ x: pop_value.x1, y: pop_value.y1 });
      current_index_to_remove = contour_points.findIndex((element) => {
        return element.x1 === pop_value.x2 && element.y1 === pop_value.y2;
      });
      if (current_index_to_remove === -1) {
        //console.log(`can't find any more cw nodes`);
        chains[chain_number].push({ x: pop_value.x2, y: pop_value.y2 });
        chain_valid.cw = false;
        // Calculate next CCW point
        // console.log(
        //   `start point: x1: ${point_to_start_search.x1} y1: ${point_to_start_search.y1} x2: ${point_to_start_search.x2} y2: ${point_to_start_search.y2}`
        // );
        //console.log("these points are left:");
        //console.log(contour_points);
        current_index_to_remove = contour_points.findIndex((element) => {
          return (
            element.x2 === point_to_start_search.x1 &&
            element.y2 === point_to_start_search.y1
          );
        });
        //console.log(`itr: ${current_index_to_remove}`);
        if (current_index_to_remove === -1) {
          chain_valid.ccw = false;
        }
      }
    } else if (chain_valid.ccw) {
      //console.log("clockwise baby");
      let pop_value = contour_points.splice(current_index_to_remove, 1)[0];
      // console.log(
      //   `removed point: x1: ${pop_value.x1} y1: ${pop_value.y1} x2: ${pop_value.x2} y2: ${pop_value.y2}`
      // );
      chains[chain_number].unshift({ x: pop_value.x1, y: pop_value.y1 });
      current_index_to_remove = contour_points.findIndex((element) => {
        return element.x2 === pop_value.x1 && element.y2 === pop_value.y1;
      });
      if (current_index_to_remove === -1) {
        // console.log(`can't find any more ccw nodes`);
        //chains[chain_number].unshift({ x: pop_value.x1, y: pop_value.y1 });
        chain_valid.ccw = false;
      }
    } else {
      // Time to make a new chain
      //console.log("new chain");
      chain_number++;
      chains[chain_number] = new Array();
      chain_valid = { cw: true, ccw: true };
      current_index_to_remove = contour_points.length - 1;
      point_to_start_search = contour_points[contour_points.length - 1];
    }
  }
  // At this point, all the points in the chains
  // However, all of the chains that are complete rings; i.e., don't go offscreen,
  // have duplicate points at the start and end
  // Remove duplicates
  for (let chain = 0; chain < chains.length; chain++) {
    if (
      chains[chain][0].x === chains[chain][chains[chain].length - 1].x &&
      chains[chain][0].y === chains[chain][chains[chain].length - 1].y
    ) {
      chains[chain].pop();
    }
  }

  // Draw the chains
  for (let chain = 0; chain < chains.length; chain++) {
    for (
      let point_index = 0;
      point_index < chains[chain].length;
      point_index++
    ) {
      if (point_index === 0) {
        stroke(0, 255, 0);
      } else if (point_index === chains[chain].length - 1) {
        stroke(255, 0, 0);
      } else {
        stroke(255, 0, 255);
      }
      point(chains[chain][point_index].x, chains[chain][point_index].y);
    }
  }
}
