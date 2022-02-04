import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action, observable } from "mobx";
import { TodoContext } from "./App";
import Task, { state } from "./tasks";

let TodoView = function TodoView({
  todo: todoId
}) {
  const todos = useContext(TodoContext);
  const todo = todos.find(todoId.id);
  if (todo.state === state.fail) {
    return (
      <div id={"todo"}>
        {todo.error}
        <input
          type="button"
          value="try Again"
          onClick={() => todo.toogle()}>
        </input>
      </div>)
  }
  return (
    <label id={"todo"}>
      <input
        type="checkbox"
        checked={todo.isDone}
        disabled={todo.state === 1}
        onChange={() => todo.toogle()}>
      </input>
      {todo.title}
    </label>
  );
};


let ErrorView = function ErrorView(message) {
  return (
    <div>
      {message}
    </div>
  )
}

ErrorView = observable(ErrorView);

TodoView = observer(TodoView);

export default TodoView;


