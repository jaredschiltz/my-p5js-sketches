const WIDTH_HEIGHT = 800;

// Module aliases
let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Composite = Matter.Composite;

let engine;
let world;

//let circles = []
let boxes = [];
let boundaries = [];

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  engine = Engine.create();
  world = engine.world;
  boundaries.push(
    new Boundary(WIDTH_HEIGHT / 2, WIDTH_HEIGHT - 200, width / 2, 20, 0.0)
  );
  /*
  boundaries.push(new Boundary(200, height * 0.7, width, 20, 0.3))
  boundaries.push(new Boundary(width * 0.7, height / 4, width * 0.6, 20, -0.3))
  */
  World.add(world, boundaries);
  Matter.Runner.run(engine);
}

function mouseDragged() {
  //circles.push(new Circle(mouseX, mouseY, random(5, 10)))
  boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}

function draw() {
  //Engine.update(engine)
  background(220);
  for (let bounds of boundaries) {
    bounds.show();
  }

  for (let box of boxes) {
    box.show();
    //console.log(box.body.position.y)
  }
  /*
  for (let circle of circles) {
    circle.show()
    if(circle.isOffScreen())
      {
        circle.removeFromWorld()
      }
  }
  */

  //circles = circles.filter((items, index) => {return ! items.isOffScreen()})

  //console.log(circles.length, world.bodies.length)
}
