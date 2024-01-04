/*
  Creates a sprite-sheet (image) using text emoji characters
*/
let fruit_list;
let cnv;
function setup() {
  cnv = createCanvas(800, 800);
  fruit_list = [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🥝",
  ];
  noLoop();
}

function draw() {
  background(0);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  stroke(0);
  // Draw Grid Lines to show each sprite
  /*
  for (let h = 0; h < 10; h++) {
    line(0, h * 80, width, h * 80);
  }
  for (let w = 0; w < 10; w++) {
    line(w * 80, 0, w * 80, height);
  }
  */

  const x_offset = 40;
  const y_offset = 43;
  textSize(60);
  let fruit_index = 0;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      text(fruit_list[fruit_index], x_offset + 80 * i, y_offset + 80 * j);
      fruit_index = (fruit_index + 1) % fruit_list.length;
    }
  }
}

function keyPressed() {
  if (key == "s") {
    // Couldn't find a way to make saveCanvas output image with transparent background
    // TODO: Figure this out if you have extra time (LOL)
    saveCanvas("fruit-sprite-sheet", "jpg");
  }
}
