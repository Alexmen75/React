import { makeObservable, observable, action, runInAction } from "mobx";
import { TaskManager } from "./tasks";



export class Todo {
  id : number;
  title : string;
  isDone : boolean;
  constructor(id: number, title: string, isDone = false){
    this.id = id;
    this.title = title;
    this.isDone = isDone;
    makeObservable(this, {
      id: observable,
      isDone: observable,
      title: observable
    });
  }
}

export class Todos {
  todos = new Map<number, Todo>();
  _tasks = new TaskManager();

  constructor() {
    makeObservable(this, {
      todos: observable,
      seed: action,
      saveEmpty: action,
      toogle: action,
    });
  }

  filter = (searchQuerry : string) => 
    Array.from(this.todos.values())
      .filter(todo => todo.title.includes(searchQuerry))
      .map(todo => todo.id);

  get count() {
    return this.todos.size;
  }

  get countCompleted() {
    return Array.from(this.todos.values())
      .filter(todo => todo.isDone)
      .length;
  }

  find = (id: number) => this.todos.get(id);

  getTask = (name : string) => this._tasks.getTask(name);

  seed = async () => {
    const task = this._tasks.getTask("seed");
    if (!task.isFresh) {
       return;
    }

    task.start();

    const result = await maybeDelay(2000, "asdf");

    runInAction(() => {
      if (result.isOk) {
        Array.from({ length: 6 }, (_, i) => new Todo(++Todos.ID_GENERATOR, `Task ${i}`))
          .forEach(todo => this.todos.set(todo.id, todo));
        task.succseed();
      } else {
        task.fail(result.result);
      }
    });
  }

  createEmpty = (title = "") => {
    return new Todo(0, title, false);
  }

  saveEmpty = async (todo : Todo[]) => {
    const task = this._tasks.getTask("createNew");
    if(task.isPending){
      return;
    }
    task.start();

    const result = await maybeDelay(2000, "Create Error");

    runInAction(() => {
      if(result.isOk){
        todo[0].id = ++Todos.ID_GENERATOR;
        this.todos.set(todo[0].id, todo[0]);
        todo.pop();
        task.succseed();
      } else {
        task.fail(result.reason);
      }
    })

    console.log(todo, this.todos);
  }
  
  toogle = async (id: number) => {
    const task = this._tasks.getTask("toogle-" + id);

    if (task.isPending) {
      return;
    }
    task.start();

    const result = await maybeDelay(2000, "Error");

    runInAction(() => {
      if (result.isOk) {
        const todo = this.todos.get(id) as Todo;
        todo.isDone = !todo.isDone;
        task.succseed();
      } else {
        task.fail(result.reason);
      }
    });
  }
  static ID_GENERATOR = 0;
}



const delay = (num : number) =>
  new Promise(resolve => setTimeout(resolve, num, "Delay"));

const maybeDelay = (num : number, reason : string)  => 
  new Promise<any>((resolve, reject) =>
    setTimeout(() => 
      Math.random() > 0.5 
      ? resolve({ isOk: true }) 
      : resolve({ isOk: false, reason }), num, "Delay"));
