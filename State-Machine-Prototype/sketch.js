let firstState
let secondState
let thirdState
let stateMachine
let mousePress = false

function setup() {
  createCanvas(400, 400);
  firstState = new FirstState()
  secondState = new SecondState()
  thirdState = new ThirdState()
  let states = {"First State" : firstState, "Second State" : secondState,
                "Third State" : thirdState}
  stateMachine = new StateMachine(states, "First State")
  states["First State"].init(stateMachine)
  states["Second State"].init(stateMachine)
  states["Third State"].init(stateMachine)
  
}

function draw() {
  stateMachine.update(deltaTime)
  stateMachine.render()
}

function mousePressed(){
  mousePress = true
}