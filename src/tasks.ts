import { makeAutoObservable } from "mobx";

const TaskState = {
  fresh: 0,
  pending: 1,
  succsess: 2,
  fail: 3,
}

export class Task {
  state = TaskState.fresh;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  get isFresh() {
    return this.state === TaskState.fresh;
  }
  get isPending() {
    return this.state === TaskState.pending;
  }
  get isScuccess() {
    return this.state === TaskState.succsess;
  }
  get isFailed() {
    return this.state === TaskState.fail;
  }

  reset = () => {
    this.state = TaskState.fresh;
    this.error = "";
  }
  
  start = () => {
    this.state = TaskState.pending;
    this.error = "";
  }

  succseed = () => {
    this.state = TaskState.succsess;
    this.error = "";
  }

  fail = (error = "") => {
    this.state = TaskState.fail;
    this.error = error;
  }

  


}

export class TaskManager {
  tasks = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  getTask = (name : string) : Task => {
    if (this.tasks.has(name)) {
      return this.tasks.get(name);
    } else {
      const task = new Task();
      this.tasks.set(name, task);
      return task;
    }
  }

}