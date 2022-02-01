import React from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

let Todo = function Todo({
  todo
}) {
  return (
    <div>
      <label id="todo">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) =>  todo.isDone = !todo.isDone}
        >
        </input>
        {todo.title}
      </label>
    </div>
  );
};

Todo = observer(Todo);

export default Todo;