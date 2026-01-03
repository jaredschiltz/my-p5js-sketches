class Matrix2D {
  constructor(m) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.e = m.e;
    this.f = m.f;
  }

  apply(x, y) {
    return {
      x: this.a * x + this.c * y + this.e,
      y: this.b * x + this.d * y + this.f,
    };
  }
}

function getMatrix() {
  return new Matrix2D(drawingContext.getTransform());
}
