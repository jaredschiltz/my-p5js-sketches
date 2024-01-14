class Particle {
    constructor(x,y,img) {
      this.position =  createVector(x, y);
      this.velocity = createVector(random(-2, 2), random(-2, 2));
      this.acceleration = createVector(0, 0);
      this.lifespan = 255.0;
      this.img = img
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2.0;
    }
  
    show() {
        /*
      stroke(255,0,0, this.lifespan);
      fill(255,0,0, this.lifespan);
      circle(this.position.x, this.position.y, 8);
      */
      tint(255,255,255,this.lifespan)
      image(this.img,this.position.x - this.img.width / 2, this.position.y - this.img.height/2)
      noTint()
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
  
    isDead() {
      return (this.lifespan < 0.0);
    }
  
  }