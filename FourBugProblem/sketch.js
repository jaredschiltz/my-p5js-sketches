let bug1
let bug2
let bug3
let bug4
let box_size = 800
function setup() {
  createCanvas(windowWidth, windowHeight);
  bug1 = new Bug(0,0,color(0,0,0))
  bug2 = new Bug(box_size, 0,color(0,0,0))
  bug3 = new Bug(box_size,box_size,color(0,0,0))
  bug4 = new Bug(0,box_size,color(0,0,0))
  noLoop();
}

function draw() {
  background(255)
  translate(10,10)
  smooth()
  stroke(0)
  strokeCap(ROUND)
  strokeJoin(ROUND)
  strokeWeight(3)
  bug1.show()
  bug2.show()
  bug3.show()
  bug4.show()

  for(i = 0; i < 800; i++){
    let bug1_current_position = createVector(bug1.get_position().x, bug1.get_position().y)
    let bug2_current_position = createVector(bug2.get_position().x, bug2.get_position().y)
    let bug3_current_position = createVector(bug3.get_position().x, bug3.get_position().y)
    let bug4_current_position = createVector(bug4.get_position().x, bug4.get_position().y)
    if (i % 10 == 0) {
      line(bug1_current_position.x, bug1_current_position.y, bug2_current_position.x, bug2_current_position.y)
      line(bug2_current_position.x, bug2_current_position.y, bug3_current_position.x, bug3_current_position.y)
      line(bug3_current_position.x, bug3_current_position.y, bug4_current_position.x, bug4_current_position.y)
      line(bug4_current_position.x, bug4_current_position.y, bug1_current_position.x, bug1_current_position.y)
    }
    bug1.update(bug2_current_position)
    bug2.update(bug3_current_position)
    bug3.update(bug4_current_position)
    bug4.update(bug1_current_position)
    bug1.show()
    bug2.show()
    bug3.show()
    bug4.show()
  }
}

function windowRebox_sized() {
  rebox_sizeCanvas(windowWidth, windowHeight);
}
