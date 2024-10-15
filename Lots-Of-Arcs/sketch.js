let colors;
let numSquares = 10;


function setup() {
  createCanvas(600, 600);
  colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
  noLoop();
}

function draw() {
  background(0);
  noStroke();
  for (let y = 0; y < numSquares; y++) {
    for (let x = 0; x < numSquares; x++) {
      fill(colors[random([0, 1, 2,3, 4])]);
      switch (random([0, 1, 2, 3])) {
        case 0:
          // UL
          arc(
            (x * width) / numSquares,
            (y * width) / numSquares,
            (width / numSquares) * 2,
            (width / numSquares) * 2,
            0,
            PI / 2
          );

          break;
        case 1:
          // UR
          push();
          translate(width / numSquares, 0);
          arc(
            (x * width) / numSquares,
            (y * width) / numSquares,
            (width / numSquares) * 2,
            (width / numSquares) * 2,
            PI / 2,
            PI
          );
          pop();

          break;
        case 2:
          // LR
          push();
          translate(width / numSquares, width / numSquares);
          arc(
            (x * width) / numSquares,
            (y * width) / numSquares,
            (width / numSquares) * 2,
            (width / numSquares) * 2,
            PI,
            (TWO_PI * 3) / 4
          );
          pop();

          break;
        case 3:
          push();
          // LL
          translate(0, width / numSquares);
          arc(
            (x * width) / numSquares,
            (y * width) / numSquares,
            (width / numSquares) * 2,
            (width / numSquares) * 2,
            (TWO_PI * 3) / 4,
            TWO_PI
          );
          pop();
          break;
      }
    }
  }
}

function keyPressed() {
  if (key === 's') {
    save('art.jpg')
  }
}
