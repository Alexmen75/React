export class Todo{
  id;
  title;
  isDone;
  constructor(id, title, isDone = false){
    this.id = id;
    this.title = title;
    this.isDone = isDone;
  }
}

export default Todo