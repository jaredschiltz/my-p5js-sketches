let num_drips = 20;
let line_width;
let drip_heights;
let drip_speeds;
let drip_current_positions;
const light_offset = 6;

function setup() {
  createCanvas(1080 / 2, 1350 / 2); // 4:5 aspect ratio
  colorMode(HSB);
  line_width = width / num_drips;
  drip_heights = new Array(num_drips);
  for (let i = 0; i < num_drips; i++) {
    drip_heights[i] = random(height * 0.25, height - line_width);
  }
  drip_current_positions = new Array(num_drips);
  for (let i = 0; i < num_drips; i++) {
    drip_current_positions[i] = 0;
  }
  drip_speeds = new Array(num_drips);
  for (let i = 0; i < num_drips; i++) {
    drip_speeds[i] = random(1, 2.5);
  }
  //noLoop()
}

function draw() {
  background(255);

  for (let i = 0; i < num_drips; i++) {
     strokeCap(ROUND);
    strokeWeight(line_width);
    stroke(map(i, 0, num_drips, 0, 320), 255, 255);
    line(
      i * line_width + line_width / 2,
      0,
      i * line_width + line_width / 2,
      drip_current_positions[i]
    );
    ellipse(i * line_width + line_width / 2,drip_current_positions[i],10,10)
      stroke(255);
    noFill();
       strokeWeight(2);
    strokeCap(ROUND)
 
    line(
      i * line_width + line_width / 2 - light_offset,
      0,
      i * line_width + line_width / 2 - light_offset,
      drip_current_positions[i] - 20
    );
    
    arc(
      i * line_width + line_width / 2,
      drip_current_positions[i],
      24,
      24,
      PI / 4,
      PI,
      OPEN
    );
    
    if (drip_current_positions[i] < drip_heights[i]) {
      drip_current_positions[i] += drip_speeds[i];
    }
  
  }
}
