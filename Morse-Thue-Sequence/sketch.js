// Generate Morse-Thue Sequence using substitution Rules

let mt_sequence
function setup() {
  createCanvas(400, 400);
  mt_sequence = new Array()
  noLoop()
}

function draw() {
  background(220);
  number_of_iterations = 6
  mt_sequence.push(0)
  for (i = 0; i < number_of_iterations; i++) {
    for (index = mt_sequence.length - 1; index >= 0; index--) {
      if(mt_sequence[index] == 0) {
        mt_sequence.splice(index,1,0, 1)
      }
      else {
        mt_sequence.splice(index,1,1, 0)
      }
    }
  }
 print(mt_sequence)
}