export const state = {
  fresh: 0,
  pending: 1,
  success: 2,
  fail: 3,
}

export class Task{
  id;
  state;
  action;
  constructor(id, action){
    this.id = id;
    this.action = action;
    this.state = state.fresh
  }
}

export const run = async(task) => {

}

export const rerun = async(task) => {
  await run(task);
}


export default Task;