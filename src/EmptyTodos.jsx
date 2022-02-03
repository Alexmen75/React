import React from "react";
import { observer } from "mobx-react-lite";
import EmptyTodoView from "./EmptyTodoView";

let EmptyTodos = function EmptyTodos({
  emptyTodos
}) {
  return (
    <div>
      {emptyTodos.get().map(todo => (
        <EmptyTodoView
          key={todo.id}
          todo={todo} 
          emptyTodos={emptyTodos}/>
      ))}
    </div>
  );
};

EmptyTodos = observer(EmptyTodos);

export default EmptyTodos;