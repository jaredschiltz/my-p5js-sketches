/* This file contains all of my flood fill algorithms */

// All functions in this file assume that loadPixels() has been called!
// Don't need to pass in the grid array, since the image access is global

function color_compare(color1, color2) {
  // Compare individual color channels: R, G, B
  if (
    color1.levels[0] == color2.levels[0] &&
    color1.levels[1] == color2.levels[1] &&
    color1.levels[2] == color2.levels[2]
  ) {
    return true;
  } else {
    return false;
  }
}

/* Only looks at the North, West, South, and East neighbors */
function flood_fill_4(
  y,
  x,
  image_width,
  image_height,
  background_color,
  fill_color
) {
  // image_width = retina resolution width; e.g. if canvas is set to width of 800, this value would be 1600
  let stack = new Stack();
  /*
Create a stack from Stack.js import
Following methods are supported:

Push → Add an element to the stack.
Pop → Delete an element from the stack.
Peek → Get the top element of the stack.
Length → Return the length of the stack.
Search → Search for the element in the stack.
IsEmpty → Check if the stack is empty.
Print → Print the elements of the stack.
*/
  stack.push([y, x]);
  while (!stack.isEmpty()) {
    let pop_result = stack.pop();
    y = pop_result[0];
    x = pop_result[1];
    let index = (x + y * image_width) * 4;
    let image_red = pixels[index];
    let image_green = pixels[index + 1];
    let image_blue = pixels[index + 2];
    let image_pixel_color = color(image_red, image_green, image_blue);
    if (color_compare(image_pixel_color, background_color)) {
      pixels[index] = fill_color.levels[0];
      pixels[index + 1] = fill_color.levels[1];
      pixels[index + 2] = fill_color.levels[2];
      if (x > 0) {
        stack.push([y, x - 1]);
      }
      if (x < image_width - 1) {
        stack.push([y, x + 1]);
      }
      if (y > 0) {
        stack.push([y - 1, x]);
      }
      if (y < image_height - 1) {
        stack.push([y + 1, x]);
      }
    }
  }
}
