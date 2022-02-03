import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { TodoContext } from "./TodoSection";

let EmptyTodoView = function EmptyTodoView({
  todo, emptyTodos
}) {
  const todos = useContext(TodoContext);
  return (
    <form
      id="empty-todo"
      onSubmit={action(() => test(todos, emptyTodos, todo)) }>
      <input
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


const test = (todos, emptyTodos, todo) => {
  const n = emptyTodos.get();
  n.splice(n.indexOf(todo),1);
  todos.set(todos.get().concat(todo));
  emptyTodos.set(n);
}