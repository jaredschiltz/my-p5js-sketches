let width_input;
let height_input;

function setup() {
  createCanvas(600, 600);
  width_input = createInput();
  height_input = createInput();
  width_input.position(160, 5);
  height_input.position(160, 35);
}

function draw() {
  background(220);
  textSize(20);
  text("Paper Width", 30, 20);
  text("Paper Height", 30, 52);
  let paper_width = abs(parseFloat(width_input.value()));
  let paper_height = abs(parseFloat(height_input.value()));
  if (!isNaN(paper_width) && !isNaN(paper_height)) {
    // print(`${paper_width * paper_height}`)
    // Valid width and height
    let paper_area = paper_width * paper_height;
    let golden_ratio = (1 + sqrt(5)) / 2.0;
    let image_area = paper_area / golden_ratio;
    // Variable definitions:
    // b = border width
    // iw = image width
    // ih = image height
    // pw = picture width
    // ph = picture height
    // ia = image area
    //
    // We have these two equations
    // 2b + iw = pw
    // 2b + ih = ph
    // Solve these to remove 2*b
    // ih - iw = ph - pw
    // ih = ph - pw + iw
    //
    // Now, we have these two equations:
    // 1) ih = ph - pw + iw
    // 2) ih * iw = ia
    // where ia, is the paper area divided by the golden ratio
    //
    // plug ih in(1) into (2):
    // (ph - pw + iw) * iw = ia
    // collect terms and move ia to other side,
    // yields this quadratic equation:
    // (iw) ^ 2 + iw * (ph - pw) - ia = 0
    // solving for iw:
    // iw = ((pw - ph) +/- sqrt((ph - pw)^2 + 4*ia)) / 2
    let image_width_solution_1 =
      (paper_width -
        paper_height +
        sqrt((paper_height - paper_width) ** 2 + 4 * image_area)) /
      2.0;
    //print(`solution1 : ${image_width_solution_1}`);
    let image_width_solution_2 =
      (paper_width -
        paper_height -
        sqrt((paper_height - paper_width) ** 2 + 4 * image_area)) /
      2.0;
    //print(`solution2: ${image_width_solution_2}`);
    // We only want positive solution
    let image_width = 0;
    if (image_width_solution_1 >= image_width_solution_2) {
      image_width = image_width_solution_1;
    } else {
      image_width = image_width_solution_2;
    }
    // border thickness for equation above:
    // 2b + iw = pw
    // b = (pw - iw) / 2
    let border_thickness = (paper_width - image_width) / 2;
    let image_height = image_area / image_width;
    //print(border_thickness)

    // Draw picture
    rectMode(CENTER);
    fill(0);
    noStroke();

    const MAX_DISPLAY_HEIGHT = 400;
    const MAX_DISPLAY_WIDTH = 400;

    let scaled_paper_height = 0;
    let scaled_paper_width = 0;
    // Scale our paper width / paper height to fill max screen area
    if (paper_height >= paper_width) {
      scaled_paper_height = MAX_DISPLAY_HEIGHT;
      scaled_paper_width = (paper_width * MAX_DISPLAY_HEIGHT) / paper_height;
    } else {
      scaled_paper_width = MAX_DISPLAY_WIDTH;
      scaled_paper_height = (paper_height * MAX_DISPLAY_WIDTH) / paper_width;
    }

    // Draw Paper
    rect(width / 2, height / 2, scaled_paper_width, scaled_paper_height);

    // Draw Image
    fill(120);
    // compute scaled image_width using same equations above
    let scaled_paper_area = scaled_paper_width * scaled_paper_height;
    let scaled_image_area = scaled_paper_area / golden_ratio;
    let scaled_image_width_solution_1 =
      (scaled_paper_width -
        scaled_paper_height +
        sqrt(
          (scaled_paper_height - scaled_paper_width) ** 2 +
            4 * scaled_image_area
        )) /
      2.0;
    //print(`solution1 : ${image_width_solution_1}`);
    let scaled_image_width_solution_2 =
      (scaled_paper_width -
        scaled_paper_height -
        sqrt(
          (scaled_paper_height - scaled_paper_width) ** 2 +
            4 * scaled_image_area
        )) /
      2.0;
    //print(`solution2: ${image_width_solution_2}`);
    // We only want positive solution
    let scaled_image_width = 0;
    if (scaled_image_width_solution_1 >= scaled_image_width_solution_2) {
      scaled_image_width = scaled_image_width_solution_1;
    } else {
      scaled_image_width = scaled_image_width_solution_2;
    }
    let scaled_image_height = scaled_image_area / scaled_image_width;
    rect(width / 2, height / 2, scaled_image_width, scaled_image_height);

    // Print out all the specifications
    text(`Paper width: ${paper_width.toFixed(4)}`, 30, 525);
    text(`Paper height: ${paper_height.toFixed(4)}`, 30, 545);
    text(`Image height: ${image_width.toFixed(4)}`, 30, 565);
    text(`Image height: ${image_height.toFixed(4)}`, 30, 585);

    text(`Border Thickness: ${border_thickness.toFixed(4)}`, 30, 84);
  }
}
