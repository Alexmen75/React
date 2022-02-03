import React from "react";
import { observer } from "mobx-react-lite";
import {action} from "mobx"

let TodoView = function TodoView({
  todo
}){
  return (
    <label id={"todo"}>
      <input 
        type="checkbox"
        checked={todo.isDone}
        onChange={action(() => todo.isDone = !todo.isDone)}>
      </input>
      {todo.title}
    </label>
  );
};

TodoView = observer(TodoView);

export default TodoView;