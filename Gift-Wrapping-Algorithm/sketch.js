//https://en.wikipedia.org/wiki/Gift_wrapping_algorithm
// Using jarvis method

let S; // Set of Points
let P; // Points in the hull
const NUM_POINTS = 20;
const OFFSET = 30;

let on_hull;
let next_point;

function setup() {
  createCanvas(600, 600);
  S = new Array(NUM_POINTS);
  P = new Array();
  for (let i = 0; i < S.length; i++) {
    S[i] = createVector(
      int(random(OFFSET, width - OFFSET)),
      int(random(OFFSET, height - OFFSET))
    );
  }
  S.sort((a, b) => a.x - b.x);
  noLoop()
}

function draw() {
  background(220);
  gift_wrapping()
  
  stroke(255,0,0)
  fill(255,0,0,120)
  beginShape()
  for(let i = 0; i < P.length; i++){
    vertex(P[i].x, P[i].y)
  }
  
  endShape(CLOSE)

  noStroke();
   fill(255, 0, 0);
    for (let i = 0; i < P.length; i++) {
    ellipse(P[i].x, P[i].y, 10);
  }

  
  fill(0);
  for (let i = 0; i < S.length; i++) {
    ellipse(S[i].x, S[i].y, 5);
  }
}

function orientation(p1, p2, p3) {
  let d = (p3.y - p2.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p3.x - p2.x);
  if (d > 0) {
    return 1;
  } else {
    if (d < 0) {
      return -1;
    } else {
      return 0;
    }
  }
}

function gift_wrapping() {
  on_hull = S[0].copy();
  while (1) {
    P.push(on_hull);
    next_point = S[0].copy();
    for (let i = 0; i < S.length; i++) {
      let o = orientation(on_hull, next_point, S[i]);
      if (
        next_point.equals(on_hull) ||
        o == 1 ||
        (o == 0 &&
          p5.Vector.dist(on_hull, S[i]) > p5.Vector.dist(on_hull, next_point))
      ) {
        next_point = S[i].copy();
      }
    }
    
    on_hull = next_point.copy();
    if (on_hull.equals(P[0])) {
      print('done')
      break;
    }
  }
}
