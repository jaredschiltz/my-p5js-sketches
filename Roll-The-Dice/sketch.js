let diceSize = 30;
let yPos;
let numberArray;

function setup() {
  createCanvas(400, 400);
  yPos = height / 2 - diceSize / 2;
  numberArray = new Array(6);
  for (let i = 0; i < 6; i++) {
    numberArray[i] = floor(random(1, 7));
  }
}

function draw() {
  background(220);

  translate(diceSize, yPos);
  for (let i = 0; i < 6; i++) {
    drawDice(numberArray[i]);
    translate(diceSize * 2, 0);
  }
}

function drawDice(number) {
  fill(170);
  noStroke();
  rect(0, 0, diceSize, diceSize, 5);
  fill(255);
  let dotSize = diceSize / 6;
  switch (number) {
    case 1:
      circle(diceSize / 2, diceSize / 2, dotSize);
      break;
    case 2:
      circle(diceSize / 4, diceSize / 4, dotSize);
      circle((diceSize * 3) / 4, (diceSize * 3) / 4, dotSize);
      break;
    case 3:
      circle(diceSize / 4, diceSize / 4, dotSize);
      circle(diceSize / 2, diceSize / 2, dotSize);
      circle((diceSize * 3) / 4, (diceSize * 3) / 4, dotSize);
      break;
    case 4:
      circle(diceSize / 4, diceSize / 4, dotSize);
      circle((diceSize * 3) / 4, (diceSize * 3) / 4, dotSize);
      circle((diceSize * 3) / 4, diceSize / 4, dotSize);
      circle(diceSize / 4, (diceSize * 3) / 4, dotSize);
      break;
    case 5:
      circle(diceSize / 2, diceSize / 2, dotSize);
      circle(diceSize / 4, diceSize / 4, dotSize);
      circle((diceSize * 3) / 4, (diceSize * 3) / 4, dotSize);
      circle((diceSize * 3) / 4, diceSize / 4, dotSize);
      circle(diceSize / 4, (diceSize * 3) / 4, dotSize);
      break;
    case 6:
      circle(diceSize / 4, diceSize / 2, dotSize);
      circle((diceSize * 3) / 4, diceSize / 2, dotSize);
      circle(diceSize / 4, diceSize / 4, dotSize);
      circle((diceSize * 3) / 4, (diceSize * 3) / 4, dotSize);
      circle((diceSize * 3) / 4, diceSize / 4, dotSize);
      circle(diceSize / 4, (diceSize * 3) / 4, dotSize);
      break;
  }
}

function mousePressed() {
  for (let i = 0; i < 6; i++) {
    numberArray[i] = floor(random(1, 7));
  }
}
