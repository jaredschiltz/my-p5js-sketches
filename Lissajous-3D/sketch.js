let sliderY
let sliderX
let sliderZ
let genX
let genY
let genZ
let button
let positions = []
let font;

function setup() {
  pixelDensity(2)
  createCanvas(800, 800, WEBGL)
  sliderY = createSlider(0.0, 0.2, 0.05, 0.005)
  sliderY.style('width', '80px')
  sliderY.position(0, 200)
  sliderX = createSlider(0.0, 0.2, 0.05, 0.005)
  sliderX.style('width', '80px')
  sliderX.position(0, 100) 
  sliderZ = createSlider(0.0, 0.2, 0.05, 0.005)
  sliderZ.style('width', '80px')
  sliderZ.position(0, 300)  
  

  genX = new generator(createVector(0, 0, 0), 200)
  genY = new generator(createVector(0, 0, 0), 200)
  genZ = new generator(createVector(0, 0, 0), 200)
  button = createButton('clear');
  button.position(10, 10);
  button.mousePressed(clearScreen);
  positions.push(createVector(genX.getX(),genY.getY(),genZ.getZ()))
  font = loadFont('Abel-Regular.ttf');
}

function draw() {
  background(0)
  genX.setSpeed(sliderX.value())
  genY.setSpeed(sliderY.value())
  genZ.setSpeed(sliderZ.value())
  stroke(0,255,0)
  textFont(font)
  textSize(20)
  text('X Speed', -width/2, -height/2 + 90)
  text('Y Speed', -width/2, -height/2 + 190)
  text('Z Speed', -width/2, -height/2 + 290)
  
  
  rotateX(millis() * 0.4 / 1000);
  rotateY(millis() * 0.3 / 1000);
  rotateZ(millis() * 0.2 / 1000);


  genX.update()
  genY.update()
  genZ.update() 
  strokeWeight(2)
  stroke(0,255,0)
  if (positions.length > 2000)
    {
      positions.pop()
      positions.unshift(createVector(genX.getX(),genY.getY(),genZ.getZ()))
    }
  else
    {
      positions.unshift(createVector(genX.getX(),genY.getY(),genZ.getZ()))
    }
  
    for (let p = 0; p < positions.length - 1; p++)
      {
        line(positions[p+1].x, positions[p+1].y, positions[p+1].z, positions[p].x, positions[p].y, positions[p].z)
      }
  
}

function clearScreen()
{
   positions=[]
}