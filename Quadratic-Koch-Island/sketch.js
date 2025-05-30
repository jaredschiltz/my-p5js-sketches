//Page 20 of Algorithmic Beauty of Plants

let d = 4
let heading = 90
let delta = 90
let x = 0
let y = 0

let n = 3

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES)
  background(0)
  translate(width / 4, height / 1.5)
  stroke(255, 0, 255)
  let w = "F-F-F-F"
  let p = "F-F+F+FF-F-F+F"
  let current_state = w
  let next_state = ""

  for (let i = 0; i < n; i++) {

    for (let e of current_state) {
      if (e === "F") {
        next_state = next_state.concat(p)
      } else {
        next_state = next_state.concat(e)
      }
    }
    current_state = next_state
    next_state = ""

  }

  parseString(current_state)

}

function F() {
  let x_p = x + d * cos(heading)
  let y_p = y - d * sin(heading)
  line(x, y, x_p, y_p)
  x = x_p
  y = y_p
}

function f() {
  let x_p = x + d * cos(heading)
  let y_p = y - d * sin(heading)
  x = x_p
  y = y_p
}

function plus() //turn left
{
  heading = heading + delta
}

function minus() //turn right
{
  heading = heading - delta
}

function parseString(s) {
  for (let e of s) {
    if (e === "F") {
      F()
    } else if (e === "+") {
      plus()
    } else if (e === "-") {
      minus()
    } else {
      print("poop")
    }
  }
}