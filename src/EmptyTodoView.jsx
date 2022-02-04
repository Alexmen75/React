import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { TodoContext } from "./App";
import {state} from "./tasks";

let EmptyTodoView = function EmptyTodoView({
  todo
}) {
  const todos = useContext(TodoContext);
  if(todo.state === state.fail){
    return(
      (<div id={"todo"}>
      {todo.error}
      <input 
        type="button"
        value="try Again"
        onClick={() =>todos.saveEmpty(todo)}>
      </input>
    </div>)
    )
  }

  return (
    <form
      id="empty-todo"
      onSubmit={(e) => {
        e.preventDefault();
        todos.saveEmpty(todo);
      }}>
      <input
        disabled = {todo.state === 1}
        placeholder="Title"
        value={todo.title}
        onInput={action((e) => todo.title = e.target.value)}>
      </input>
      <input
        type="submit"
        value="Create">
      </input>
    </form>
  );
};

EmptyTodoView = observer(EmptyTodoView);

export default EmptyTodoView;
