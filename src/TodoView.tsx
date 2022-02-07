import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TodoContext } from "./App";
import { Todo } from "./model";

let TodoView = function TodoView({
  id
}: {
  id: number;
}) {
  const todos = useContext(TodoContext);
  const todo = todos.find(id) as Todo;
  const task = todos.getTask("toogle-" + id);


  return (
    <label id={"todo"}>
      <input
        disabled={task.isPending}
        type="checkbox"
        checked={todo.isDone}
        onChange={() => todos.toogle(todo.id)}>
      </input>
      {todo.title}
      <span id={"l"}>
        {task.isPending ? "Loading..."
          : task.isFailed ? <button onClick={() => task.reset()}>Error: {task.error}</button>
            : null
        }
      </span>

    </label>
  );
};

TodoView = observer(TodoView);

export default TodoView;