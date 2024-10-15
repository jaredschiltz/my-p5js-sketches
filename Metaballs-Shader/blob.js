// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

class Blob {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    let angle = Math.random() * 2 * Math.PI;
    this.xspeed = (Math.random() * 3 + 2) * Math.cos(angle);
    this.yspeed = (Math.random() * 3 + 2) * Math.sin(angle);
    this.r = 10;
  }

  get_position() {
    let position = [];
    position[0] = this.x;
    position[1] = this.y;
    return position;
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.x > width || this.x < 0) this.xspeed *= -1;
    if (this.y > height || this.y < 0) this.yspeed *= -1;
  }

  show() {
    noFill();
    stroke(0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}
