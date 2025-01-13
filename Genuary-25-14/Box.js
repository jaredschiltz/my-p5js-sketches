class Box {
  constructor(position, w, h) {
    this.position = position;
    this.w = w;
    this.h = h;
  }
  show() {
    noStroke();
    fill(0);
    rect(
      this.position.x * CELL_SIZE,
      this.position.y * CELL_SIZE,
      this.w * CELL_SIZE,
      this.h * CELL_SIZE
    );
  }
}
