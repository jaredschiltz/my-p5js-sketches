"use strict";
class Particle {
  constructor(pos, repel_radius) {
    this.pos = createVector(pos.x, pos.y);
    this.repel_radius = repel_radius;
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.speed = 0.01;
    this.speed_max = 0.5;
  }

  update(particle_array, i) {
    this.pos.add(this.velocity);
    if (this.pos.x < -10) {
      this.pos.x = width;
    }
    if (this.pos.y < -10) {
      this.pos.y = height;
    }
    if (this.pos.x > width + 10) {
      this.pos.x = 0;
    }
    if (this.pos.y > 10 + height) {
      this.pos.y = 0;
    }
    this.velocity.x = constrain(
      this.velocity.x + random(-1.0 * this.speed, this.speed),
      -this.speed_max,
      this.speed_max
    );
    this.velocity.y = constrain(
      this.velocity.y + random(-1.0 * this.speed, this.speed),
      -this.speed_max,
      this.speed_max
    );

    // Check for "collisions"
    for (let j = i + 1; j < particle_array.length; j++) {
      let ang = Math.atan2(
        this.pos.y - particle_array[j].pos.y,
        this.pos.x - particle_array[j].pos.x
      );
      let dist = this.pos.dist(particle_array[j].pos);
      if (dist < this.repel_radius) {
        if (dist < this.repel_radius * 0.5) {
          strokeWeight(map(dist, 0, this.repel_radius, 1, 0));
          let h = map(this.pos.x,0,width,0,255)
          stroke(h,map(dist, 0, this.repel_radius, 255, 0),255);
          line(
            this.pos.x,
            this.pos.y,
            particle_array[j].pos.x,
            particle_array[j].pos.y
          );
        }
        let force = map(dist, 0, this.repel_radius, 4, 0);
        this.velocity.x += force * Math.cos(ang);
        this.velocity.y += force * Math.sin(ang);
      }
    }
  }

  show() {
    noStroke();
    let h = map(this.pos.x,0,width,0,255)
    fill(h,255,255);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}
