// My convention for encoding:
// O - 0   O - 3
// O - 1   O - 4
// O - 2   O - 5

let alphabet = {'a' : 0x1, 'b' : 0x3, 'c' : 0x9, 'd' : 0x19, 'e' : 0x11, 'f' : 0xb, 
                'g' : 0x1b, 'h' : 0x13, 'i' : 0xa, 'j' : 0x1a, 'k' : 0x5, 'l' : 0x7,
                'm' : 0xd, 'n' : 0x1d, 'o' : 0x15, 'p' : 0xf, 'q' : 0x1f, 'r' : 0x17,
                's' : 0xe, 't' : 0x1e, 'u' : 0x25, 'v' : 0x27, 'w' : 0x3a, 'x' : 0x2d,
                'y' : 0x3d, 'z' : 0x35, '.' : 0x32, ',' : 0x2, ' ' : 0x0}

let text

function setup() {
  createCanvas(400, 400);
  text = 'abcdefghijklmnopqrstuvwxyz., '
  smooth()
}

function draw() {
  background(220);
  let xSpacing = 60
  let ySpacing = 80
  let xpos = 35
  let ypos = -62
  for (let i = 0; i < text.length; i++) {
    if (i % 6 == 0) {
      xpos = 35
      ypos += ySpacing
     }
      drawCharacters(alphabet[text[i]], xpos, ypos)
      xpos += xSpacing
  }

}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function drawCharacters(char, xpos, ypos){
  let binary
  let circleRadius = 15
  stroke(0)
  strokeWeight(3)
  let xSpacing = 1.5 * circleRadius
  let ySpacing = 1.5 * circleRadius
  
  if (char != undefined) {
    binary = dec2bin(char)
    while(binary.length != 6) {
      binary = '0' + binary
    }

    // Reverse binary string so indexing starts from lsb
    binary = binary.split('').reverse().join('')
    // console.log(binary)
    for (let i = 0; i < binary.length; i++) {
      switch(i) {
        case 0:
          if (binary[i] == '1') {
            fill(0)
            circle(xpos, ypos, circleRadius)
          }
          else {
            fill(255)
            circle(xpos, ypos, circleRadius)
          }
          break
        case 1:
          if (binary[i] == '1') {
            fill(0)
            circle(xpos, ypos + ySpacing, circleRadius)
          }
          else {
            fill(255)
            circle(xpos, ypos + ySpacing, circleRadius)
          }        
          break
        case 2:
          if (binary[i] == '1') {
            fill(0)
            circle(xpos, ypos + ySpacing * 2, circleRadius)
          }
          else {
            fill(255)
            circle(xpos, ypos + ySpacing * 2, circleRadius)
          }
          break
        case 3:
          if (binary[i] == '1') {
            fill(0)
            circle(xpos + xSpacing, ypos, circleRadius)
          }
          else {
            fill(255)
            circle(xpos + xSpacing, ypos, circleRadius)
          }
          break
        case 4:
          if (binary[i] == '1') {
            fill(0)
            circle(xpos + xSpacing, ypos + ySpacing, circleRadius)
          }
          else {
            fill(255)
            circle(xpos + xSpacing, ypos + ySpacing, circleRadius)
          }
          break
        case 5:
          if (binary[i] == '1') {
            fill(0)
            circle(xpos + xSpacing, ypos + ySpacing * 2, circleRadius)
          }
          else {
            fill(255)
            circle(xpos + xSpacing, ypos + ySpacing * 2, circleRadius)
          }
          break
      }
    }
  }
  
}

