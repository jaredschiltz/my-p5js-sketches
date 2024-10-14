
const order = 5;
let N;
let total;

let path = [];

/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

function setup() {
  createCanvas(512, 512, SVG);
  colorMode(HSB, 360, 255, 255);
  background(0);

  N = int(pow(2, order));
  total = N * N;
  let len = width / N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
  noLoop()
}

function draw() {
  background(255);

  stroke(0);
  strokeWeight(1);
  noFill();

  const num_segments = 4 ** order - 1
  for (let i = 1; i < num_segments + 1; i++) {
    let h = map(i, 0, path.length, 0, 360);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
   
  }

   //save("hilbert.svg"); // give file name
}

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}