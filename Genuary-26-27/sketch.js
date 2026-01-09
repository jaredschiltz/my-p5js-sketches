/*
Genuary 2026 - January 27th: Lifeform. A shape or structure that 
behaves as if it’s alive or growing.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let tips = [];

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#228b22");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  background(background_color);
  stroke(foreground_color);
  noFill();

  tips.push({
    pos: createVector(width / 2, height / 2),
    dir: p5.Vector.random2D(),
    life: 2000,
  });
  //noLoop();
}

function draw() {
  for (let loops = 0; loops < 5; loops++) {
    if (tips.length < 2000) {
      for (let n = 0; n < 40; n++) {
        let newTips = [];

        for (let t of tips) {
          if (t.life <= 0) continue;

          let prev = t.pos.copy();

          // Small steering noise
          let angle = noise(t.pos.x * 0.01, t.pos.y * 0.01, frameCount * 0.005);
          t.dir.rotate(map(angle, 0, 1, -0.3, 0.3));

          t.pos.add(p5.Vector.mult(t.dir, 10));
          line(prev.x, prev.y, t.pos.x, t.pos.y);

          t.life--;

          // Occasional branching
          if (random() < 0.1) {
            newTips.push({
              pos: t.pos.copy(),
              dir: t.dir.copy().rotate(random(-0.6, 0.6)),
              life: t.life * 0.7,
            });
          }

          // Keep original
          newTips.push(t);
        }

        tips = newTips;
      }
    }
  }

  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.27", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
