const ROWS = 50;
const COLS = 80;

let dungeon = new Array(ROWS);

function setup() {
  createCanvas(800, 500);
  for (let row = 0; row < ROWS; row++) {
    dungeon[row] = new Array(COLS);
  }
  dungeon = generatorRandomGrid(dungeon, 0.45);

  /*
  for(let i = 0 ; i < 10; i++){
  dungeon = runCA(dungeon)
    
  }
  */
  print(num_walls_around(dungeon, 0, 0));

  //noLoop();
}

function draw() {
  background(220);
  noStroke();
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (dungeon[row][col] == 1) {
        fill(0, 255, 0);
        // print("green");
      } else {
        fill(0, 0, 0);
        //print("black");
      }
      rect(
        col * floor(width / COLS),
        row * floor(height / ROWS),
        floor(width / COLS),
        floor(height / ROWS)
      );
    }
  }
}

function mouseReleased() {
  dungeon = iterate_grid(dungeon);
}

function generatorRandomGrid(grid, probability) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      let randomNumber = round(random(0, 1));
      if (random(0, 1) < probability) {
        grid[row][col] = 1;
      }
      else {
        grid[row][col] = 0;
      }
    }
  }
  return grid;
}

function iterate_grid(grid) {
  new_grid = new Array(ROWS);
  for (let row = 0; row < ROWS; row++) {
    new_grid[row] = new Array(COLS);
  }
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let num = num_walls_around(grid, i, j);
      if (num >= 5) {
        new_grid[j][i] = 1;
      } else {
        new_grid[j][i] = 0;
      }
    }
  }
  return new_grid;
}

/*
function cloneGrid(grid) {
  // Clone the 1st dimension
  const newGrid = [...grid];
  // Clone each 2nd dimension
  newGrid.forEach((row, rowIndex) => (newGrid[rowIndex] = [...row]));
  return newGrid;
}

*/

function num_walls_around(grid, x, y) {
  let tile_count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (j + x < 0 || j + x >= COLS || y + i < 0 || y + i >= ROWS) {
        tile_count++;
      } else {
        if (grid[i + y][j + x] == 1) {
          tile_count++;
        }
      }
    }
  }
  return tile_count;
}
