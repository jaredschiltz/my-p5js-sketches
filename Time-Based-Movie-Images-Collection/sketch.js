const WIDTH = 800;
let movie;
let number_of_tiles_X = 12;
let number_of_tiles_Y;
let tile_width_X;
let tile_width_Y;
let current_X = 0;
let current_Y = 0;
let current_image_count = 0;
let position_X = 0;
let position_Y = 0;
let start_movie = false;

function preload() {
  movie = createVideo("./assets/fingers.mov");
}

function setup() {
  // N.B. For whatever reason, the movie objects dimensions for the width and
  // height are not correct here. Apparently, it isn't fully loaded ... but,
  // where do these wrong values (w: 300, h:500) come from? For now, hardcoding
  // the aspect ratio of the movie loaded above.

  // print(`movie dimensions -- w: ${movie.width} h: ${movie.height}`);
  let movie_aspect_ratio = 320 / 240;
  number_of_tiles_Y = number_of_tiles_X / movie_aspect_ratio;
  createCanvas(WIDTH, WIDTH / movie_aspect_ratio);
  tile_width_X = width / number_of_tiles_X;
  tile_width_Y = height / number_of_tiles_Y;
  setTimeout(() => {
    start_movie = true;
  }, 2000); // delay start of the movie so it doesn't start playing until it is
  // fully ready. Again, preload() does not handle this for some reason
}

function draw() {
  if (start_movie) {
    if (movie.elt.readyState == 4) {
      // Ready to move on to next frame
      position_X = tile_width_X * current_X;
      position_Y = tile_width_Y * current_Y;
      image(movie, position_X, position_Y, tile_width_X, tile_width_Y);

      let next_time = map(
        current_image_count,
        0,
        number_of_tiles_X * number_of_tiles_Y,
        0,
        movie.duration()
      );
      movie.time(next_time); // seek to next frame position
      current_image_count++;
      current_X++;
      if (current_X >= number_of_tiles_X) {
        current_X = 0;
        current_Y++;
      }
      if (current_image_count >= number_of_tiles_X * number_of_tiles_Y) {
        noLoop();
        print("Done playing all images");
      }
    }
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
