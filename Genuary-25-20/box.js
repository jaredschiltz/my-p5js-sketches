"use strict";
class Box {
  constructor(x, y, w, h, wall_colour, window_colour, trim_colour) {
    this.options = {
      friction: 1,
      restitution: 0,
    };
    this.body = Bodies.rectangle(x, y, w, h, this.options);
    World.add(world, this.body);
    this.w = w;
    this.h = h;
    this.wall_color = wall_colour;
    this.window_colour = window_colour;
    this.trim_colour = trim_colour;
  }

  show() {
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    strokeWeight(10);
    fill(this.wall_color);
    //stroke(this.color);
    rect(0, 0, this.w, this.h);
    pop();
    rectMode(CORNER);
    fill(this.window_colour);
    push();
    translate(-this.w / 2 + 5, -this.h / 2 + 5);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        rect(pos.x + col * 20, pos.y + row * 20, 10, 10);
      }
    }
    translate(-5, -5);
    fill(this.trim_colour);
    rect(pos.x, pos.y, this.w, 5);

    pop();
  }
}
