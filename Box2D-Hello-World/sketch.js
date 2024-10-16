let gravity
let world
let groundBodyDef
let groundBody
let groundBox
let dynamicBody
let dynamicBox
let fixtureDef
const velocityIterations = 6
const positionIterations = 2
const max_number_boxes = 200
let box_counter = 0

const PIXELS_TO_METER = 10
let frame_counter = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = planck.Vec2(0.0, -10.0)
  world = planck.World({gravity: gravity})
  groundBodyDef = {position: planck.Vec2(40.0, 0.0)}
  groundBody = world.createBody(groundBodyDef)
  groundBox = planck.Box(30.0, 1.0)
  groundBody.createFixture(groundBox, 0.0)


  frameRate(60)

}

function draw() {
  background(0)
  noStroke()
  fill(0,255,0)
  rectMode(RADIUS)
  rect(groundBodyDef.position.x * PIXELS_TO_METER, windowHeight - groundBodyDef.position.y * PIXELS_TO_METER,
     PIXELS_TO_METER * abs(groundBox.m_vertices[0].x), PIXELS_TO_METER * abs(groundBox.m_vertices[0].y))

  if (frame_counter % 10 == 0 && box_counter < max_number_boxes) {
    createBox()
    box_counter++
  }
  
  world.step(1/30.0, velocityIterations, positionIterations)
  for (let b = world.getBodyList(); b; b = b.getNext()) {
    if (b.m_type == "static") {
      continue
    }
    let box_position = b.getPosition()
    let box_angle = -1.0 * b.getAngle()
    push()
      translate(box_position.x * PIXELS_TO_METER, windowHeight - box_position.y * PIXELS_TO_METER)
      rotate(box_angle)
      fill(b.getUserData().color)
      rect(0, 0, PIXELS_TO_METER * abs(b.m_fixtureList.m_shape.m_vertices[0].x), PIXELS_TO_METER * abs(b.m_fixtureList.m_shape.m_vertices[0].y))
    pop() 
  }
  
  frame_counter++
}

function createBox() {
  dynamicBody = world.createBody({
    type: "dynamic",
    position: planck.Vec2(random(10.0, 70.0), 80.0),
  })
  let random_box_width = random(0.5, 5)
  let random_box_height = random(0.5, 5)
  dynamicBox = planck.Box(random_box_width, random_box_height)

  fixtureDef = {
    shape: dynamicBox,
    density: 10.0,
   // friction: 0.1,
    //restitution: 0.0
  }
  random_color = color(random(0,256), random(0,256), random(0,256))
  dynamicBody.setUserData({color: random_color})
  dynamicBody.setMassData({
    mass: 10,
    center: planck.Vec2(),
    I: 0
  })
  dynamicBody.createFixture(fixtureDef)  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
