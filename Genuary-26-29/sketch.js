/*
Genuary 2026 - January 29th: Genetic evolution and mutation
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let population = [];
const MAX_TIPS = 1000;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#ffffff");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  background(background_color);
  strokeWeight(2);
  noFill();

  colorMode(HSB, 360, 100, 100);

  // Start with a single tip
  population.push({
    pos: createVector(width / 2, height / 2),
    dir: p5.Vector.random2D(),
    life: 1000,
    growthRate: 3.0,
    color: color(random(360), 80, 100), // Hue random for starting tip
    branchProb: 0.02,
    mutationRate: 0.1,
    fitness: 1, // initial fitness
  });
  //noLoop();
}

function draw() {
  let newPopulation = [];

  for (let t of population) {
    if (t.life <= 0) continue;

    let prev = t.pos.copy();

    // Move tip
    t.pos.add(p5.Vector.mult(t.dir, t.growthRate));

    // Compute fitness: how far inside the canvas
    t.fitness = constrain(
      min(t.pos.x, width - t.pos.x, t.pos.y, height - t.pos.y) / 100,
      0,
      1
    );

    // Kill if outside
    if (t.fitness <= 0) {
      t.life = 0;
      continue;
    }

    // Small directional noise
    let angleNoise = map(
      noise(t.pos.x * 0.01, t.pos.y * 0.01, frameCount * 0.01),
      0,
      1,
      -0.2,
      0.2
    );
    t.dir.rotate(angleNoise);

    // Draw line
    stroke(t.color);
    line(prev.x, prev.y, t.pos.x, t.pos.y);

    t.life--;

    // Branching depends on fitness: fitter tips branch more
    let effectiveBranchProb = t.branchProb * t.fitness;
    if (random() < effectiveBranchProb) {
      let child = {
        pos: t.pos.copy(),
        dir: t.dir.copy().rotate(random(-PI / 4, PI / 4)),
        life: t.life * 0.7,
        growthRate: t.growthRate,
        color: t.color,
        branchProb: t.branchProb,
        mutationRate: t.mutationRate,
        fitness: t.fitness,
      };

      // Mutation applied to offspring
      /*
      if (random() < child.mutationRate) {
        child.dir.rotate(random(-PI / 8, PI / 8));
        child.growthRate *= random(0.8, 1.2);
        child.color = color(
          (hue(child.color) + random(-20, 20)) % 360,
          saturation(child.color),
          brightness(child.color)
        );
      }
        */
      // Remove probability check, apply mutation always:
      let h = (hue(child.color) + random(-90, 90)) % 360;
      let s = constrain(saturation(child.color) + random(-10, 10), 0, 100);
      let b = constrain(brightness(child.color) + random(-10, 10), 0, 100);

      child.color = color(h, s, b);

      newPopulation.push(child);
    }

    newPopulation.push(t); // keep the original tip
  }

  population = newPopulation;

  // Optional: stop if too many tips
  if (population.length > MAX_TIPS) noLoop();
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
  text(">> 26.29", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    //saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
