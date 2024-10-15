function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(width/2, height/2)
let x, y;
 let torWidth = 10;
  let r = 80
  let ptsInCircle = 360
  
fill('#ff0000');
  noStroke()

beginShape();
// Draw outer edge of donut
for (let i = 0; i < ptsInCircle; i++){
      //...compute r, theta...
      x = r*cos(i/(ptsInCircle - 1) * TWO_PI);
      y = r*sin(i/(ptsInCircle - 1) * TWO_PI);
      curveVertex(x,y);
}
// trace inner edge of donut, in OPPOSITE direction
for (let i = ptsInCircle-1; i >= 0 ; i--){
      //...compute r, theta...
      x = (r-torWidth)*cos(i/(ptsInCircle - 1) * TWO_PI);
      y = (r-torWidth)*sin(i/(ptsInCircle - 1) * TWO_PI);
      curveVertex(x,y);
}
endShape();
}