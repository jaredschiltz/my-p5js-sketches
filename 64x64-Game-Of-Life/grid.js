class Grid {
  constructor(grid_size, screen_size) {
    this.grid_size = grid_size;
    this.cell_size = {
      w: screen_size.w / grid_size.w,
      h: screen_size.h / grid_size.h,
    };
    this.grid = Array.from({ length: grid_size.h }, () =>
      Array(grid_size.w).fill(color(0, 0, 0))
    );
  }

  set_pixel(pos, colour) {
    if (
      pos.x >= 0 &&
      pos.x < this.grid_size.w &&
      pos.y >= 0 &&
      pos.y < this.grid_size.h
    ) {
      this.grid[pos.y][pos.x] = colour;
    }
  }

  draw_horizontal_line(x_start, x_end, y, colour) {
    for (let x = x_start; x <= x_end; x++) {
      this.set_pixel(createVector(x, y), colour);
    }
  }

  draw_vertical_line(y_start, y_end, x, colour) {
    for (let y = y_start; y <= y_end; y++) {
      this.set_pixel(createVector(x, y), colour);
    }
  }

  // Midpoint Ellipse Algorithm
  draw_ellipse_filled(center, radius, colour) {
    let xc = center.x;
    let yc = center.y;
    let rx = radius.x;
    let ry = radius.y;

    let x = 0;
    let y = ry;

    const rxSq = rx * rx;
    const rySq = ry * ry;
    let dx = 2 * rySq * x;
    let dy = 2 * rxSq * y;

    // Region 1
    let d1 = rySq - rxSq * ry + 0.25 * rxSq;
    while (dx < dy) {
      this.draw_horizontal_line(xc - x, xc + x, yc + y, colour);
      this.draw_horizontal_line(xc - x, xc + x, yc - y, colour);
      if (d1 < 0) {
        x++;
        dx = dx + 2 * rySq;
        d1 = d1 + dx + rySq;
      } else {
        x++;
        y--;
        dx = dx + 2 * rySq;
        dy = dy - 2 * rxSq;
        d1 = d1 + dx - dy + rySq;
      }
    }

    // Region 2
    let d2 =
      rySq * ((x + 0.5) * (x + 0.5)) + rxSq * ((y - 1) * (y - 1)) - rxSq * rySq;
    while (y >= 0) {
      this.draw_horizontal_line(xc - x, xc + x, yc + y, colour);
      this.draw_horizontal_line(xc - x, xc + x, yc - y, colour);
      if (d2 > 0) {
        y--;
        dy = dy - 2 * rxSq;
        d2 = d2 + rxSq - dy;
      } else {
        y--;
        x++;
        dx = dx + 2 * rySq;
        dy = dy - 2 * rxSq;
        d2 = d2 + dx - dy + rxSq;
      }
    }
  }

  // Midpoint Ellipse Algorithm
  draw_ellipse_unfilled(center, radius, colour) {
    let xc = center.x;
    let yc = center.y;
    let rx = radius.x;
    let ry = radius.y;
    let x = 0;
    let y = ry;

    const rxSq = rx * rx;
    const rySq = ry * ry;
    let dx = 2 * rySq * x;
    let dy = 2 * rxSq * y;

    // Region 1
    let d1 = rySq - rxSq * ry + 0.25 * rxSq;
    while (dx < dy) {
      this.plot_ellipse_points(xc, yc, x, y, colour);
      if (d1 < 0) {
        x++;
        dx = dx + 2 * rySq;
        d1 = d1 + dx + rySq;
      } else {
        x++;
        y--;
        dx = dx + 2 * rySq;
        dy = dy - 2 * rxSq;
        d1 = d1 + dx - dy + rySq;
      }
    }

    // Region 2
    let d2 =
      rySq * ((x + 0.5) * (x + 0.5)) + rxSq * ((y - 1) * (y - 1)) - rxSq * rySq;
    while (y >= 0) {
      this.plot_ellipse_points(xc, yc, x, y, colour);
      if (d2 > 0) {
        y--;
        dy = dy - 2 * rxSq;
        d2 = d2 + rxSq - dy;
      } else {
        y--;
        x++;
        dx = dx + 2 * rySq;
        dy = dy - 2 * rxSq;
        d2 = d2 + dx - dy + rxSq;
      }
    }
  }

  plot_ellipse_points(xc, yc, x, y, colour) {
    this.set_pixel(createVector(xc + x, yc + y), colour); // Quadrant I
    this.set_pixel(createVector(xc - x, yc + y), colour); // Quadrant II
    this.set_pixel(createVector(xc - x, yc - y), colour); // Quadrant III
    this.set_pixel(createVector(xc + x, yc - y), colour); // Quadrant IV
  }

  // Bresenham's Line Algorithm
  draw_line(start, stop, colour) {
    let x0 = start.x;
    let y0 = start.y;
    let x1 = stop.x;
    let y1 = stop.y;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.set_pixel(createVector(x0, y0), colour); // Your function to light a pixel

      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  draw_rect_unfilled(start, size, colour) {
    this.draw_horizontal_line(start.x, start.x + size.x, start.y, colour);
    this.draw_horizontal_line(
      start.x,
      start.x + size.x,
      start.y + size.y,
      colour
    );
    this.draw_vertical_line(start.y, start.y + size.y, start.x, colour);
    this.draw_vertical_line(
      start.y,
      start.y + size.y,
      start.x + size.x,
      colour
    );
  }

  draw_rect_filled(start, size, colour) {
    for (let y = start.y; y <= start.y + size.y; y++) {
      this.draw_horizontal_line(start.x, start.x + size.x, y, colour);
    }
  }
  // TODO
  // Things to implement:
  /*
  drawTriangle(x0, y0, x1, y1, x2, y2)	Draws lines between 3 points
  fillTriangle(...)	Fills a triangle using scanline fill or barycentric coords
  drawPolygon(points[])	Connects a list of vertices
  drawBezier(p0, p1, p2[, p3])	Quadratic or cubic Bezier curves
  drawArc(x, y, r, startAngle, endAngle)	Partial circle (arc) using polar coords
  drawDottedLine(x0, y0, x1, y1)	Like drawLine() but with spacing
  drawCheckerboard(x, y, w, h, cellSize)	Generates a checkerboard pattern
  drawGradient(x, y, w, h)	Fills a region with a color or brightness gradient
  drawNoise(x, y, w, h)	Random noise for static/fx
  */

  show() {
    noStroke();
    for (let y = 0; y < this.grid_size.h; y++) {
      for (let x = 0; x < this.grid_size.w; x++) {
        fill(this.grid[y][x]);
        rect(
          x * this.cell_size.w,
          y * this.cell_size.h,
          this.cell_size.w,
          this.cell_size.h
        );
      }
    }
  }
}
