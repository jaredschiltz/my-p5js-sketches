let polyLineArray;
let polyLineOffsetArray;
let drawOffsetLine;

function setup() {
  createCanvas(400, 400);
  polyLineArray = new Array();
  polyLineOffsetArray = new Array();
  drawOffsetLine = false;
}

function draw() {
  background(220);
  fill(0);

  // Draw PolyLine
  stroke(0);
  strokeWeight(3);
  for (let i = 0; i < polyLineArray.length - 1; i++) {
    line(
      polyLineArray[i].x,
      polyLineArray[i].y,
      polyLineArray[i + 1].x,
      polyLineArray[i + 1].y
    );
  }

  if (drawOffsetLine == true) {
    for (let i = 0; i < polyLineOffsetArray.length - 1; i++) {
      line(
        polyLineOffsetArray[i].x,
        polyLineOffsetArray[i].y,
        polyLineOffsetArray[i + 1].x,
        polyLineOffsetArray[i + 1].y
      );
    }
  }
}
function mouseClicked() {}
function mousePressed() {
  drawOffsetLine = false;
  polyLineArray = [];
  polyLineOffsetArray = [];
  polyLineArray.push(createVector(mouseX, mouseY));
}

function mouseDragged() {
  // Look at previous array element and only add new point
  // if it is different than old point
  if (
    !polyLineArray[polyLineArray.length - 1].equals(
      createVector(mouseX, mouseY)
    )
  ) {
    polyLineArray.push(createVector(mouseX, mouseY));
  }
}
function mouseReleased() {
  // Compute perpendicular vector
  if (polyLineArray.length > 5) {
    for (let i = 0; i < polyLineArray.length - 5; i++) {
      let unitVector = createVector(0, 0);
      let unitVectorPerp = createVector(0, 0);
      unitVector.x = polyLineArray[i + 4].x - polyLineArray[i].x;
      unitVector.y = polyLineArray[i + 4].y - polyLineArray[i].y;
      unitVectorPerp.x = unitVector.y * -1;
      unitVectorPerp.y = unitVector.x;
      unitVectorPerp.normalize();
      unitVectorPerp.mult(50);
      let perpPoint = createVector(
        polyLineArray[i].x + unitVectorPerp.x,
        polyLineArray[i].y + unitVectorPerp.y
      );
      polyLineOffsetArray.push(createVector(perpPoint.x, perpPoint.y));
    }
  }
  drawOffsetLine = true;
}
