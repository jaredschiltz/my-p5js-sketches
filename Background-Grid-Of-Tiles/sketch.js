let board;
let board_width = 30;
let board_height = 30;
let draw_tiles = false; // Draw background tiles

function setup() {
  createCanvas(600, 600);
  smooth();
  board = new Array(board_height);
  for (let b = 0; b < board.length; b++) {
    board[b] = new Array(board_width);
  }
  for (let rows = 0; rows < board_height; rows++) {
    for (let cols = 0; cols < board_width; cols++) {
      board[cols][rows] = new Cell();
    }
  }
  noLoop();
}

function draw() {
  background(230, 212, 167);
  build_grid();
  print(board);
  draw_grid();
  /*
  for (let variable in window) {
    if (window.hasOwnProperty(variable)) {
      console.log(variable);
    }
  }
  */
  
}

function build_grid() {
  for (let rows = 0; rows < board_height; rows++) {
    for (let cols = 0; cols < board_width; cols++) {
      place_cell(cols, rows);
    }
  }
}

function place_cell(x, y) {
  let numExits = 0;
  while (numExits < 2) {
    board[y][x].t = board[y][x].r = board[y][x].b = board[y][x].l = -1;

    if (x > 0) {
      board[y][x].l = board[y][x - 1].r;
    }
    if (y > 0) {
      board[y][x].t = board[y - 1][x].b;
    }

    if (board[y][x].t < 0) board[y][x].t = random(100) > 50 ? 1 : 0;
    if (board[y][x].r < 0) board[y][x].r = random(100) > 50 ? 1 : 0;
    if (board[y][x].b < 0) board[y][x].b = random(100) > 50 ? 1 : 0;
    if (board[y][x].l < 0) board[y][x].l = random(100) > 50 ? 1 : 0;
    numExits = board[y][x].t + board[y][x].r + board[y][x].b + board[y][x].l;
  }
}

function draw_grid() {
  let cwid = (width * 1.0) / board_width;
  let chgt = (height * 1.0) / board_height;
  for (let y = 0; y < board_height; y++) {
    for (let x = 0; x < board_width; x++) {
      let lx = x * cwid;
      let hx = lx + cwid;
      let ly = y * chgt;
      let hy = ly + chgt;
      let mx = (lx + hx) / 2;
      let my = (ly + hy) / 2;
      noStroke();
      fill(130, 68, 54);
      if (draw_tiles) {
        if (board[y][x].t == 1) triangle(lx, ly, mx, my, hx, ly);
        if (board[y][x].r == 1) triangle(hx, ly, mx, my, hx, hy);
        if (board[y][x].b == 1) triangle(hx, hy, mx, my, lx, hy);
        if (board[y][x].l == 1) triangle(lx, hy, mx, my, lx, ly);
      }
      noFill();

      stroke(88, 138, 119);
      strokeWeight(9);
      if (board[y][x].t == 1 && board[y][x].r == 1) {
        arc(hx, ly, cwid, chgt, HALF_PI, PI);
      }
      if (board[y][x].r == 1 && board[y][x].b == 1) {
        arc(hx, hy, cwid, chgt, PI, 3 * HALF_PI);
      }
      if (board[y][x].b == 1 && board[y][x].l == 1) {
        arc(lx, hy, cwid, chgt, 3 * HALF_PI, TWO_PI);
      }
      if (board[y][x].l == 1 && board[y][x].t == 1) {
        arc(lx, ly, cwid, chgt, 0, HALF_PI);
      }
      if (board[y][x].t == 1 && board[y][x].b == 1) {
        line(mx, ly, mx, hy);
      }
      if (board[y][x].l == 1 && board[y][x].r == 1) {
        line(lx, my, hx, my);
      }
    }
  }
}
