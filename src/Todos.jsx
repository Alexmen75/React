import React from "react";
import { observer } from "mobx-react-lite";
import TodoView from "./TodoView";
import EmptyTodoView from "./EmptyTodoView";
import Task from "./tasks";

let Todos = function Todos({
  filtered,
  empties
}) {
  console.log("Todos ");
  return (
    <div>
      {filtered.map(todo => (
        <TodoView key={todo.id} todo={todo} />
      ))}

      {empties.map(todo => (
        <EmptyTodoView key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

Todos = observer(Todos);

export default Todos;