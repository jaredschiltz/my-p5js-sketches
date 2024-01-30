const WIDTH_HEIGHT = 800;
let world;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  world = b2newWorld(50, b2V(0, 10));
  let b = new b2Body("polygon", true, b2V(200, 200), [
    b2V(20, 0),
    b2V(-20, 0),
    b2V(0, 30),
  ]);
  b = new b2Body("circle", true, b2V(200, 100), b2V(20, 20));
  b.addTo("box", b2V(0, 15), b2V(20, 10));
  new b2Body("edge", false, b2V(width / 2, height - 4), [
    b2V(-width / 2, 0),
    b2V(width / 2, 0),
  ]);
}

function mouseDragged() {}

function draw() {
  background(227);
  text(
    "Click to shoot triangles\nColor changes to blue or green at the start of a collision",
    20,
    20
  );
  text(
    "Example taken from this site, which has lots of Box2D examples ported to P5js\nhttps://sites.google.com/site/professorcookga/planck-box2d-physics-for-javascript-p5",
    20,
    100
  );

  b2Update();
  b2Draw();
}
function mousePressed() {
  var b = new b2Body(
    "polygon",
    true,
    b2V(mouseX, mouseY),
    [b2V(20, 0), b2V(-20, 0), b2V(0, 30)],
    { display: userDraw, collision: bump }
  );
  b.impulse = b2V(5, 0);
  b.color = "red";
}

function userDraw(body) {
  fill(body.color);
  body.draw();
}

function bump(f1, f2) {
  b2getBodyFromFixture(f1).color = "green";
  b2getBodyFromFixture(f2).color = "blue";
}
