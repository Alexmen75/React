import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { observable, action, reaction, autorun } from "mobx";
import { observer } from "mobx-react-lite";
import Todo from "./model"
import "./style.css";

const todos = observable(Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)));


// const t = autorun(() => console.log(todos[0]));
// const r = action(() => todos[0] = new Todo(todos[0].id, todos[0].title, !todos[0].isDone));


let View = function View() {
  return (
    <div>
      <Todos
        todos={todos} />
    </div>
  )
}

View = observer(View);

let Todos = function Todos({ todos }) {
  return (
    <div>
      {/* {todos.map(todo => (
        <TodoView
          key={todo.id}
          todo={todo}
        />
      ))} */}
      <label id="todo">
        <input
          type="checkbox"
          checked={todos[0].isDone}
          onChange={action(() =>
            todos[0] = new Todo(todos[0].id, todos[0].title, !todos[0].isDone))}>
        </input>
        {todos[0].title}
      </label>
    </div>
  )
}

Todos = observer(Todos);


let TodoView = function TodoView({ todo }) {
  return (
    <label id="todo">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={action(() =>
          todo = new Todo(todo.id, todo.title, !todo.isDone))}>
      </input>
      {todo.title}
    </label>
  )
}

TodoView = observer(TodoView);

ReactDOM.render(
  <View />,
  document.getElementById('root')
);

