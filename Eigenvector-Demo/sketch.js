let vectorX;
let vectorAX;
const matrix = [[0.8, 0.3], [0.2, 0.7]];

function setup() {
  createCanvas(400, 400);
  vectorX = new VectorObj(width/2, height/2);
  vectorAX = new VectorObj(width/2, height/2);
}

function draw() {
  background(0);
  textSize(32);
  fill(255);
  text('x: ' + vectorX.dir.x.toFixed(3) + ' y: ' +  vectorX.dir.y.toFixed(3),10,30)
  vectorX.lookAt(mouseX, mouseY);
  vectorX.show('white');
  vectorAX.dir.x = matrix[0][0] * vectorX.dir.x + matrix[0][1] * vectorX.dir.y;
  vectorAX.dir.y = matrix[1][0] * vectorX.dir.x + matrix[1][1] * vectorX.dir.y;
  vectorAX.show('red');

}