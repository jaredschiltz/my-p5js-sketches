"use strict";
class Box {
  constructor(
    x,
    y,
    w,
    h,
    x_limit,
    y_limit,
    limit_w,
    limit_h,
    stroke_color,
    fill_color
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 5;
    this.random_velocity = p5.Vector.random2D();
    this.x_limit = x_limit;
    this.y_limit = y_limit;
    this.limit_w = limit_w;
    this.limit_h = limit_h;
    this.stroke_color = stroke_color;
    this.fill_true = false;
    this.random_fill_color = ["#071e22", "#1d7874", "#f4c095", "#ee2e31"];
    this.fill_color = color(
      this.random_fill_color[floor(random(this.random_fill_color.length))]
    );
  }

  show() {
    strokeWeight(5);
    stroke(this.stroke_color);
    if (this.fill_true) {
      fill(this.fill_color);
    } else {
      noFill();
    }
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.x += this.random_velocity.x * this.speed;
    this.y += this.random_velocity.y * this.speed;

    // Check limits
    if (this.x <= this.x_limit) {
      this.random_velocity.x *= -1;
    }
    if (this.y <= this.y_limit) {
      this.random_velocity.y *= -1;
    }
    if (this.x >= this.x_limit + this.limit_w - this.w) {
      this.random_velocity.x *= -1;
    }

    if (this.y >= this.y_limit + this.limit_h - this.h) {
      this.random_velocity.y *= -1;
    }
  }
}
