/* This file contains all of my flood fill algorithms */

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
function flood_fill_4(y, x, grid_array, background_color, fill_color) {
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
  let grid_height = grid_array.length;
  let grid_width = grid_array[0].length;
  stack.push([y, x]);
  while (!stack.isEmpty()) {
    let pop_result = stack.pop();
    y = pop_result[0];
    x = pop_result[1];

    if (color_compare(grid_array[y][x], background_color)) {
      grid_array[y][x] = fill_color;
      if (x > 0) {
        stack.push([y, x - 1]);
      }
      if (x < grid_width - 1) {
        stack.push([y, x + 1]);
      }
      if (y > 0) {
        stack.push([y - 1, x]);
      }
      if (y < grid_height - 1) {
        stack.push([y + 1, x]);
      }
    }
  }
}

/* Looks at all surrounding neighbors; e.g. N,S,E,W, NE, NW, SW, SE */
function flood_fill_8(x, y) {
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
  let grid_height = grid_array.length;
  let grid_width = grid_array[0].length;
  stack.push([y, x]);
  while (!stack.isEmpty()) {
    let pop_result = stack.pop();
    y = pop_result[0];
    x = pop_result[1];

    if (color_compare(grid_array[y][x], background_color)) {
      grid_array[y][x] = fill_color;

      if (x > 0 && y > 0) {
        stack.push([y - 1, x - 1]);
      }
      if (x > 0 && y < grid_height - 1) {
        stack.push([y + 1, x - 1]);
      }
      if (x < grid_width - 1 && y < grid_height - 1) {
        stack.push([y + 1, x + 1]);
      }
      if (x < grid_width - 1 && y > 0) {
        stack.push([y - 1, x + 1]);
      }

      if (x > 0) {
        stack.push([y, x - 1]);
      }
      if (x < grid_width - 1) {
        stack.push([y, x + 1]);
      }
      if (y > 0) {
        stack.push([y - 1, x]);
      }
      if (y < grid_height - 1) {
        stack.push([y + 1, x]);
      }
    }
  }
}
