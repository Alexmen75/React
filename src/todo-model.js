
export class Todo {
  id;
  title;
  isDone;

  constructor(id, title, isDone = false) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
  }

  toogle = () =>
    new Todo(this.id, this.title, !this.isDone);

}

class Model {
  todos = [];
  constructor(todos) {
    this.todos = todos || [];
  }
}

export default Model;

const delay = num =>
  new Promise(resolve => setTimeout(resolve, num, "Delay"));


const maybeDelay = (num, reason) =>
  new Promise((resolve, reject) =>
    setTimeout(() => Math.random() > 0.1 ? resolve() : reject(reason), num, "Delay"));

export const actions = {
  seedTodos: 0,
  toogle: 1,
  toogleMany: 2,
  addTodo: 3,
  test: 4,
}

export function modelReducer(model, action) {
  switch (action.type) {
    case actions.seedTodos:
      return new Model(Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)), []);
    case actions.toogle:
      toogle(model, action.todo).then(result =>{
        action.dispatch({type: actions.test, result: result});
      })
      return model;
    case actions.test:
      return action.result;
    case actions.toogleMany:
      return toogleMany(model, action.todos, actions.isDone)
    case actions.addTodo:
      return addTodo(model, action.todo);
    default:
      return model;
  }
}


const toogle = async (model, todo) => {
  await delay(1000);
  const todos = model.todos.slice();
  todos.splice(todos.indexOf(todo), 1, todo.toogle());
  return new Model(todos);
}

const toogleMany = (model, todosList, isDone) => {
  const todos = model.todos.slice();
  todosList.forEach(todo =>
    todos.splice(todos.indexOf(todo), 1, todo.isDone == isDone ? todo : todo.toogle()));
  return new Model(todos);
}

const addTodo = (model, todo) => {
  const newTodo = new Todo(model.todos.length, todo.title, todo.isDone);
  const todos = model.todos.slice().concat([newTodo]);
  return new Model(todos);
}