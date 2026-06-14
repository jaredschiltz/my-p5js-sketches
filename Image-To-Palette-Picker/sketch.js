/*
This sketch allows you to load up an image and 
pick colors from it

'c/C' clear the current palette.
's/S' saves the current palette to json file
clicking on a point adds a color. click on the point again removes it




*/
let noun_strings;
let adjective_strings;
let palette_name;
let image_palette;
let palette_array = [];

const color_palette_height = 100;

async function setup() {
  image_palette = await loadImage("image_palette.jpg");
  createCanvas(
    image_palette.width,
    image_palette.height + color_palette_height,
  );

  noun_strings = await loadStrings("./Word-Lists/nounlist.txt");
  adjective_strings = await loadStrings("./Word-Lists/adjectivelist.txt");
  palette_name = get_new_name();
}

function draw() {
  background(220);
  image(image_palette, 0, 0);
  textSize(24);
  text(palette_name, 0, image_palette.height + 20);
  for (let i = 0; i < palette_array.length; i++) {
    noStroke();
    fill(color(palette_array[i]));
    rect(
      (i * image_palette.width) / palette_array.length,
      image_palette.height,
      image_palette.width / palette_array.length,
      color_palette_height,
    );
  }
  fill(0);
  text(palette_name, 0, image_palette.height + 20);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    // Clear Palette
  } else if (key == "c" || key == "C") {
    palette_name = get_new_name();
    palette_array = [];
  }
}

function mousePressed() {
  palette_array.push(color_to_hex_string(getAverageColor(mouseX, mouseY, 5)));
  // Generate JSON format
  let palette_string = [];
  palette_string += '{ "';
  palette_string += palette_name;
  palette_string += '":[';
  for (let i = 0; i < palette_array.length; i++) {
    palette_string += '"';
    palette_string += palette_array[i];
    if (i != palette_array.length - 1) {
      palette_string += '",';
    } else {
      palette_string += '"';
    }
  }
  palette_string += palette_string = "]";
  palette_string += "}";
  // print out the entire palette
  // in developer console for quick copy and paste
  print(palette_string);
}

function get_new_name() {
  return get_adjective() + " " + get_noun();
}

function get_noun() {
  return noun_strings[floor(random(0, noun_strings.length))];
}

function get_adjective() {
  return adjective_strings[floor(random(0, adjective_strings.length))];
}

function color_to_hex_string(rgba_array) {
  return (
    "#" + hex(rgba_array[0], 2) + hex(rgba_array[1], 2) + hex(rgba_array[2], 2)
  );
}

function getAverageColor(mx, my, radius) {
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  mx = floor(mx);
  my = floor(my);

  for (let x = mx - radius; x <= mx + radius; x++) {
    for (let y = my - radius; y <= my + radius; y++) {
      if (
        x >= 0 &&
        x < image_palette.width &&
        y >= 0 &&
        y < image_palette.height
      ) {
        let c = image_palette.get(x, y);

        r += c[0];
        g += c[1];
        b += c[2];
        count++;
      }
    }
  }

  return [r / count, g / count, b / count, 255];
}
