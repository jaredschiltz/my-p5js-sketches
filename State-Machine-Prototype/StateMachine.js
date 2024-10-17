class StateMachine {
  constructor(states, currentState) {
    this.states = states
    this.currentState = currentState
  }

  change(stateName, enterParams) {
    this.states[this.currentState].exit()
    this.currentState = stateName
    this.states[this.currentState].enter(enterParams)
  }
  
  update(dt) {
    this.states[this.currentState].update(dt)
  }
  
  render() {
    this.states[this.currentState].render()
  }
  
}