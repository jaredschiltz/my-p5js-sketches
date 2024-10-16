class Cell {
  constructor(col, row, box) {
    this.col = col;
    this.row = row;
    this.box = box;
    this.values = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
    };
    this.num_values = 9

  }

  update() {
   // print(this.row)
    /*
     this.pos.x = this.pos.x + random(-1,1);
     this.pos.y = this.pos.y + random(-1,1)
     */
  }
}
