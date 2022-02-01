
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
  test: 3,
  saveValue: 4,
  addEmpty: 5,
  createTodo: 6,
}

export function modelReducer(model, action) {
  switch (action.type) {

    case actions.seedTodos:
      return modelCreate(Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)), model.emptyTodos);

    case actions.toogle:
      return modelCreate(toogle(model, action.todo), model.emptyTodos);

    case actions.toogleMany:
      return modelCreate(toogleMany(model, action.todos, actions.isDone), model.emptyTodos);

    case actions.saveValue:
      return modelCreate(model.todos, changeValue(action.todo, model.emptyTodos, action.value));

    case actions.addEmpty:
      return modelCreate(model.todos, addEmpty(model.emptyTodos, -model.todos.length - model.emptyTodos.length));

    case actions.createTodo:
      return modelCreate(...createTodo(model.todos, model.emptyTodos, action.todo));

    default:
      return model;
  }
}

// case actions.addTodo:
//   return modelCreate(addTodo(model, action.todo), model.emptyTodos);


const addEmpty = (emptyTodos, id) => {
  return emptyTodos.concat([new Todo(id, "", false)]);
}

function changeValue(todo, listTodo, value) {
  const newList = listTodo.slice();
  newList.splice(listTodo.indexOf(todo), 1, new Todo(todo.id, value, todo.isDone));
  return newList;
}


const toogle = (model, todo) => {
  const todos = model.todos.slice();
  todos.splice(todos.indexOf(todo), 1, todo.toogle());
  return todos;
}

const toogleMany = (model, todosList, isDone) => {
  const todos = model.todos.slice();
  todosList.forEach(todo =>
    todos.splice(todos.indexOf(todo), 1, todo.isDone === isDone ? todo : todo.toogle()));
  return todos;
}


const createTodo = (todos, emptyTodos, todo) => {
  const newTodo = new Todo(todos.length, todo.title, todo.isDone);
  const newTodos = todos.slice().concat([newTodo]);
  const newEmptyTodos = emptyTodos.slice();
  newEmptyTodos.splice(emptyTodos.indexOf(todo), 1);
  return [newTodos, newEmptyTodos];
}

// const addTodo = (model, todo) => {
//   const newTodo = new Todo(model.todos.length, todo.title, todo.isDone);
//   const todos = model.todos.slice().concat([newTodo]);
//   return new Model(todos);
// }


// const addNewTodo = (model, todo) => {
//   modelDispatch({ type: actions.addTodo, todo: todo });
// }



const modelCreate = (todos, emptyTodos) => ({
  todos: todos,
  emptyTodos: emptyTodos
});

