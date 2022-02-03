import { makeObservable, observable } from "mobx";

export class Todo{
  id;
  title;
  isDone;
  constructor(id, title, isDone = false){
    this.id = id;
    this.title = title;
    this.isDone = isDone;
    makeObservable(this,{
      isDone: observable,
      title: observable,
    });
  }
}

export default Todo