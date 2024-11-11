let source_image;
let emoji_sprite_sheet;
let number_of_horizontal_cells = 120;
let number_of_vertical_cells;
let cell_size;
let emoji_size;
let kd_tree;
const number_of_horizontal_vertical_emojis = 57;

function preload() {
  source_image = loadImage("cow.jpg");
  emoji_sprite_sheet = loadImage("google-emoji-spritesheet.png");
}

function setup() {
  cell_size = floor(source_image.width / number_of_horizontal_cells);
  // Re-assign horizontal size now
  number_of_horizontal_cells = floor(source_image.width / cell_size);
  number_of_vertical_cells = floor(source_image.height / cell_size);
  emoji_size = emoji_sprite_sheet.width / number_of_horizontal_vertical_emojis;
  /*
  print(`source image w: ${source_image.width} h: ${source_image.height}`);
  print(
    `cell_size: ${cell_size} horiz_cells: ${number_of_horizontal_cells} vert_cells ${number_of_vertical_cells}`
  );
  */
  createCanvas(
    number_of_horizontal_cells * cell_size,
    number_of_vertical_cells * cell_size
  );
  noLoop();
}

function draw() {
  background(255, 0, 0);
  // image(
  //   source_image,
  //   0,
  //   0,
  //   source_image.width,
  //   number_of_vertical_cells * cell_size
  // );
  // // Draw the cells
  // stroke(255, 0, 0);
  // noFill();
  // for (let row = 0; row < number_of_vertical_cells; row++) {
  //   for (let col = 0; col < number_of_horizontal_cells; col++) {
  //     rect(col * cell_size, row * cell_size, cell_size, cell_size);
  //   }
  // }
  let new_background_color = color(0, 0, 0, 255);
  let alpha_threshold = 128;
  let emojis = compute_emoji_color_averages(alpha_threshold);
  replace_transparent_background(new_background_color, alpha_threshold);
  let cell_colors = compute_cell_color_averages();
  // Create emoji color list
  let emoji_colors = [];
  for (let name in emojis) {
    let average_color = emojis[name].average_color;
    average_color.name = name;
    average_color.row = emojis[name].row;
    average_color.col = emojis[name].col;
    emoji_colors.push(average_color);
  }
  let color_distance = function (a, b) {
    return pow(a.r - b.r, 2) + pow(a.g - b.g, 2) + pow(a.b - b.b, 2);
  };
  kd_tree = new kdTree(emoji_colors, color_distance, ["r", "g", "b"]);

  // Test cell_colors
  /*
  for (c in cell_colors) {
    let cell_color = color(
      cell_colors[c].average_color.r,
      cell_colors[c].average_color.g,
      cell_colors[c].average_color.b
    );
    fill(cell_color);
    rect(
      cell_colors[c].col * cell_size,
      cell_colors[c].row * cell_size,
      cell_size,
      cell_size
    );
  }
    */

  // Get closet emoji
  for (c in cell_colors) {
    //print(cell_colors[c].average_color);
    let nearest = kd_tree.nearest(cell_colors[c].average_color, 1);
    let emoji_row = nearest[0][0].row;
    let emoji_col = nearest[0][0].col;
    let image_row = cell_colors[c].row;
    let image_col = cell_colors[c].col;
    image(
      emoji_sprite_sheet,
      image_col * cell_size,
      image_row * cell_size,
      cell_size,
      cell_size,
      emoji_col * emoji_size,
      emoji_row * emoji_size,
      emoji_size,
      emoji_size
    );
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function replace_transparent_background(new_background_color, alpha_threshold) {
  emoji_sprite_sheet.loadPixels();
  for (let row = 0; row < emoji_sprite_sheet.height; row++) {
    for (let col = 0; col < emoji_sprite_sheet.width; col++) {
      let index = 4 * (row * emoji_sprite_sheet.width + col);
      let r = emoji_sprite_sheet.pixels[index + 0];
      let g = emoji_sprite_sheet.pixels[index + 1];
      let b = emoji_sprite_sheet.pixels[index + 2];
      let a = emoji_sprite_sheet.pixels[index + 3];
      //print(`red: ${r},green: ${g},blue: ${b},alpha: ${a}`);

      if (a < alpha_threshold) {
        emoji_sprite_sheet.pixels[index + 0] = new_background_color.levels[0];
        emoji_sprite_sheet.pixels[index + 1] = new_background_color.levels[1];
        emoji_sprite_sheet.pixels[index + 2] = new_background_color.levels[2];
        emoji_sprite_sheet.pixels[index + 3] = new_background_color.levels[3];
      }
    }
  }
  emoji_sprite_sheet.updatePixels();
}

function compute_emoji_color_averages(alpha_threshold) {
  // Compute the average RGB values of each emoji, ignoring alpha values
  // below the specified threshold. Add each of the emojis to an object that
  // we can use to search when we try to find the closest match to the average
  // source image pixels values
  let emojis = {};

  emoji_sprite_sheet.loadPixels();

  for (
    let sprite_row = 0;
    sprite_row < number_of_horizontal_vertical_emojis;
    sprite_row++
  ) {
    for (
      let sprite_col = 0;
      sprite_col < number_of_horizontal_vertical_emojis;
      sprite_col++
    ) {
      let total_number_of_pixels = 0; // these are all of the non-transparent pixels
      let red_average = 0;
      let green_average = 0;
      let blue_average = 0;
      for (
        let row = sprite_row * emoji_size;
        row < (sprite_row + 1) * emoji_size;
        row++
      ) {
        for (
          let col = sprite_col * emoji_size;
          col < (sprite_col + 1) * emoji_size;
          col++
        ) {
          let index = 4 * (row * emoji_sprite_sheet.width + col);

          let r = emoji_sprite_sheet.pixels[index + 0];
          let g = emoji_sprite_sheet.pixels[index + 1];
          let b = emoji_sprite_sheet.pixels[index + 2];
          let a = emoji_sprite_sheet.pixels[index + 3];
          if (a >= alpha_threshold) {
            total_number_of_pixels++;
            red_average += r;
            green_average += g;
            blue_average += b;
          }
        }
      }
      red_average /= total_number_of_pixels;
      green_average /= total_number_of_pixels;
      blue_average /= total_number_of_pixels;
      red_average = floor(red_average);
      blue_average = floor(blue_average);
      green_average = floor(green_average);
      //print(`${red_average} ${green_average} ${blue_average}`);
      let emoji_name = `row_${String(sprite_row).padStart(2, "0")}_col_${String(
        sprite_col
      ).padStart(2, "0")}`;
      // Ignore all completely transparent emojis
      if (total_number_of_pixels > 0) {
        emojis[emoji_name] = {
          average_color: { r: red_average, g: green_average, b: blue_average },
          row: sprite_row,
          col: sprite_col,
        };
      }
    }
  }
  emoji_sprite_sheet.updatePixels();
  return emojis;
}

function compute_cell_color_averages() {
  // Compute the average RGB values of each emoji, ignoring alpha values
  // below the specified threshold. Add each of the emojis to an object that
  // we can use to search when we try to find the closest match to the average
  // source image pixels values
  let cell_colors = {};

  source_image.loadPixels();

  for (let cell_row = 0; cell_row < number_of_vertical_cells; cell_row++) {
    for (let cell_col = 0; cell_col < number_of_horizontal_cells; cell_col++) {
      let red_average = 0;
      let green_average = 0;
      let blue_average = 0;
      for (
        let row = cell_row * cell_size;
        row < (cell_row + 1) * cell_size;
        row++
      ) {
        for (
          let col = cell_col * cell_size;
          col < (cell_col + 1) * cell_size;
          col++
        ) {
          let index = 4 * (row * source_image.width + col);
          let r = source_image.pixels[index + 0];
          let g = source_image.pixels[index + 1];
          let b = source_image.pixels[index + 2];
          let a = source_image.pixels[index + 3];
          red_average += r;
          green_average += g;
          blue_average += b;
        }
      }
      let total_number_of_pixels = cell_size * cell_size;
      red_average /= total_number_of_pixels;
      green_average /= total_number_of_pixels;
      blue_average /= total_number_of_pixels;
      red_average = floor(red_average);
      blue_average = floor(blue_average);
      green_average = floor(green_average);
      //print(`${red_average} ${green_average} ${blue_average}`);
      let cell_name = `row_${String(cell_row).padStart(2, "0")}_col_${String(
        cell_col
      ).padStart(2, "0")}`;
      cell_colors[cell_name] = {
        average_color: { r: red_average, g: green_average, b: blue_average },
        row: cell_row,
        col: cell_col,
      };
    }
  }
  source_image.updatePixels();
  return cell_colors;
}
