"use strict";

// This is static class
class BirdFactory {
  constructor() {
    if (this instanceof BirdFactory) {
      throw Error("A static class cannot be instantiated.");
    }
  }

  static return_bird(
    bird_array,
    bird_size,
    bird_start_position,
    wire_start_position,
    line_spacing,
    bird_color
  ) {
    let bird_array_rows = bird_array.length;
    let bird_array_columns = bird_array[0].length;
    for (let row = 0; row < bird_array_rows; row++) {
      for (let col = 0; col < bird_array_columns; col++) {
        if (bird_array[row][col].note == 1) {
          let random_bird_type = floor(random(30)); // Select among 30 different birds
          switch (random_bird_type) {
            case 0:
              bird_array[row][col].bird_object = new Bird1(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 1:
              bird_array[row][col].bird_object = new Bird2(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 2:
              bird_array[row][col].bird_object = new Bird3(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 3:
              bird_array[row][col].bird_object = new Bird4(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 4:
              bird_array[row][col].bird_object = new Bird5(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 5:
              bird_array[row][col].bird_object = new Bird6(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 6:
              bird_array[row][col].bird_object = new Bird7(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 7:
              bird_array[row][col].bird_object = new Bird8(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 8:
              bird_array[row][col].bird_object = new Bird9(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 9:
              bird_array[row][col].bird_object = new Bird10(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;
            case 10:
              bird_array[row][col].bird_object = new Bird11(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 11:
              bird_array[row][col].bird_object = new Bird12(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 12:
              bird_array[row][col].bird_object = new Bird13(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 13:
              bird_array[row][col].bird_object = new Bird14(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 14:
              bird_array[row][col].bird_object = new Bird15(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 15:
              bird_array[row][col].bird_object = new Bird16(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 16:
              bird_array[row][col].bird_object = new Bird17(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 17:
              bird_array[row][col].bird_object = new Bird18(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 18:
              bird_array[row][col].bird_object = new Bird19(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 19:
              bird_array[row][col].bird_object = new Bird20(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 20:
              bird_array[row][col].bird_object = new Bird21(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 21:
              bird_array[row][col].bird_object = new Bird22(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 22:
              bird_array[row][col].bird_object = new Bird23(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 23:
              bird_array[row][col].bird_object = new Bird24(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 24:
              bird_array[row][col].bird_object = new Bird25(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 25:
              bird_array[row][col].bird_object = new Bird26(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 26:
              bird_array[row][col].bird_object = new Bird27(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 27:
              bird_array[row][col].bird_object = new Bird28(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 28:
              bird_array[row][col].bird_object = new Bird29(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            case 29:
              bird_array[row][col].bird_object = new Bird30(
                createVector(
                  col * bird_size + bird_start_position,
                  wire_start_position + row * line_spacing
                ),
                bird_color,
                bird_size
              );
              break;

            default:
              throw Error("Inconceivable!");
          }
        }
      }
    }

    return bird_array;
  }
}
