'use strict'
let Engine = Matter.Engine
let World = Matter.World
let Bodies = Matter.Bodies

let engine
let world

let ground

let circles = []
//let boxes = []
let boundaries = []


function setup() {
  createCanvas(400, 400);
  engine = Engine.create()
  world = engine.world
  boundaries.push(new Boundary(200, height * 0.7, width, 20, 0.3))
  boundaries.push(new Boundary(width * 0.7, height / 4, width * 0.6, 20, -0.3))
  World.add(world, boundaries)
  Engine.run(engine)
}

function mouseDragged() {
  circles.push(new Circle(mouseX, mouseY, random(5, 10)))
  //boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)))
}

function draw() {
  //Engine.update(engine)
  background(220)
  for (let bounds of boundaries) {
    bounds.show()
  }

  /*
  for (let box of boxes)
    {
      box.show()
    }
    */
  for (let circle of circles) {
    circle.show()
    if(circle.isOffScreen())
      {
        circle.removeFromWorld()
      }
  }

  circles = circles.filter((items, index) => {return ! items.isOffScreen()})
  
  //console.log(circles.length, world.bodies.length)
}