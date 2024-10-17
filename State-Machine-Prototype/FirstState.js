class FirstState {
  constructor() {
    this.color = color(255, 0, 0);
    this.params = null;
    this.stateMachineReference = null
  }
  
  init(stateMachineReference) {
    this.stateMachineReference = stateMachineReference
  }

  enter(params) {
    // Called when entering state params are passed from previous state
    this.params = params;
    console.log('In First State! got params:' + this.params)
  }

  update(dt) {
    if(mousePress) {
      mousePress = false
      this.stateMachineReference.change("Second State", "here are some params")
    }
  }

  render() {
    background(0);
    fill(this.color);
    rect(0, 0, 200, 200);
  }

  exit() {}
}
