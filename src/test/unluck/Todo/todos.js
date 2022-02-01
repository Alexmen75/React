import React from "react";
import { observer } from "mobx-react-lite";
import Todo from "./todo";
import { action } from "mobx";


let Todos = function Todos({
  filtered
}) {
  console.log(filtered.todos);
  return (
    <div id="todos">
      {filtered.todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
        />))}
    </div>
  );
};

Todos = observer(Todos);

export default Todos;