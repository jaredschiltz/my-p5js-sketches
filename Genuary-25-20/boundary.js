"use strict";
class Boundary {
  constructor(x, y, w, h, angle, colour) {
    this.options = {
      friction: 0,
      restitution: 0,
      isStatic: true,
      angle: angle,
    };
    this.body = Bodies.rectangle(x, y, w, h, this.options);
    World.add(world, this.body);
    this.w = w;
    this.h = h;
    this.colour = colour;
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(this.colour);
    rect(0, 0, this.w, this.h);

    pop();
  }
}
