class Element {
  constructor(ellipseRadius) {
    this.radius = ellipseRadius;
    this.width = random(0, 4 * ellipseRadius);
    this.height = random(0, 4 * ellipseRadius);
    this.rotation = random(0, PI);
    this.xPos = random(-20, 20);
    this.yPos = random(-20, 20);
    this.mouseXPos;
  }

  draw() {
    push()
    rotate(map(this.mouseXPos, 0, width, 0, this.rotation));
    ellipse(
      map(this.mouseXPos, 0, width, 0, this.xPos),
      map(this.mouseXPos, 0, width, 0, this.yPos),
      map(this.mouseXPos, 0, width, this.radius, this.width),
      map(this.mouseXPos, 0, width, this.radius, this.height)
    );
    pop()
  }

  update(mouseXPos) {
    this.mouseXPos = mouseXPos;
  }
}
