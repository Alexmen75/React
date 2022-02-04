import { makeObservable, observable, runInAction, action } from "mobx";

export const state = {
  fresh: 0,
  pending: 1,
  succsess: 2,
  fail: 3,
}

export class Task {
  id;
  state;
  result;
  action;
  constructor(id, action) {
    this.id = id;
    this.action = action;
    this.state = state.fresh;
    makeObservable(this, {
      state: observable,
      run: action
    })
  }

  run = async () => {
    this.state = state.pending
    try {
      await this.action();
      runInAction(() => {
        this.state = state.succsess
      });
    }
    catch (error) {
      this.state = state.fail;
      this.result = error;
    }
  }

  rerun = async () => {
    this.state = state.fresh;
    await this.run();
  }
}


export default Task;