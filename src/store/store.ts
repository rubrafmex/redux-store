export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
  }

  private reduce(state, action) {
    const newState = {};
    // iterate in our reducers to bind new state
    for (const prop in this.reducers) {
      // newState[prop] = this.reducers[prop](state[prop], action); is doing:
      // newState.todos = this.reducers.todos(state.todos, action);
      // Because each reducer manages its own piece of state, we use this.reducers[prop] and we pass only state[prop]
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
