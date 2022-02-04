import { makeObservable, observable, action, computed, flow, runInAction } from "mobx";

const state = {
  fresh: 0,
  pending: 1,
  succsess: 2,
  fail: 3,
}


export class Todo {
  id;
  title;
  isDone;
  state;
  error;
  constructor(id, title, isDone = false){
    this.id = id;
    this.title = title;
    this.isDone = isDone;
    this.state = state.fresh;
    makeObservable(this, {
      id: observable,
      isDone: observable,
      title: observable,
      isPersisted: computed,
      state: observable,
      toogle: action,
      // error: observable,
    });
  }

  get isPersisted() {
    return this.id > 0;
  }
  

  toogle = async () => {
    this.state = state.pending;
    try{
      await maybeDelay(2000, "Ошибка");
      runInAction(() => {
        this.isDone = !this.isDone;
        this.state = state.succsess;
      })
    }
    catch(error){
      runInAction(() => {
        this.state = state.fail;
        this.error = error;
      })
    }
  };
}

export class Todos {
  todos = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      seed: action,
      addEmpty: action,
      saveEmpty: action
    });
  }

  filter = (searchQuerry) => 
    this.todos.filter(todo => todo.isPersisted && todo.title.includes(searchQuerry)).map(todo => todo);

  get empties() {
    return this.todos.filter(todo => !todo.isPersisted).map(todo => todo);
  }

  find = (id) => this.todos.find(todo => todo.id === id);

  seed = () => {
    this.todos.push(...Array.from({ length: 6 }, (_, i) => new Todo(++Todos.ID_GENERATOR, `Task ${i}`)));
  }

  addEmpty = (title = "") => {
    this.todos.push(new Todo(--Todos.EMPTY_ID_GENERATOR, title, false));
  }

  saveEmpty = async (todo) => {
    todo.state = state.pending;
    try{
      await maybeDelay(2000, "Ошиба");
      runInAction(() => {
        todo.id = ++Todos.ID_GENERATOR;
        todo.state = state.succsess;
      });
    }
    catch(error){
      runInAction(() => {
        todo.state = state.fail;
        todo.error = error; 
      })
    }
  }
}

Todos.ID_GENERATOR = 0;
Todos.EMPTY_ID_GENERATOR = 0;




const delay = num =>
  new Promise(resolve => setTimeout(resolve, num, "Delay"));

  const maybeDelay = (num, reason) =>
  new Promise((resolve, reject) =>
    setTimeout(() => Math.random() > 0.5 ? resolve() : reject(reason), num, "Delay"));

