let slider

function setup() {
  createCanvas(800, 800);
  radius1Slider = createSlider(5, 200, 100);
  radius1Slider.position(10, 10);
  radius1Slider.style('width', '80px');
  radius2Slider = createSlider(5, 200, 25);
  radius2Slider.position(10, 30);
  radius2Slider.style('width', '80px');
  ratioSlider = createSlider(1, 100, 20);
  ratioSlider.position(10, 50);
  ratioSlider.style('width', '80px');
  
}

function draw() {
  background(0);
  stroke(255,0,0);
  push();
  translate(width / 2, height / 2);
  let theta = 0;
  let oldx;
  let oldy;
  let newx;
  let newy;
  let cx = 0;
  let cy = 0;
  
  let radius1 = radius1Slider.value();
  let radius2 = radius2Slider.value();
  let ratio = ratioSlider.value();
  
  oldx = cx + radius1 * cos(theta) + radius2 * cos(theta * ratio);
  oldy = cy + radius1 * sin(theta) + radius2 * sin(theta * ratio);
  
  for (theta = 0; theta < TWO_PI; theta += 0.001)
    {
      newx = cx + radius1 * cos(theta) + radius2 * cos(theta * ratio);
      newy = cy + radius1 * sin(theta) + radius2 * sin(theta * ratio);
      line(oldx, oldy, newx, newy)
      oldx = newx;
      oldy = newy;
    }
  pop();
}
