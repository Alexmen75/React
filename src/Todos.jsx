import React from "react";
import { observer } from "mobx-react-lite";
import TodoView from "./TodoView";

let Todos = function Todos({
  todos
}){
  return (
    <div>
      {todos.map(todo => (
        <TodoView
          key={todo.id}
          todo={todo}/>
      ))}
    </div>
  );
};

Todos = observer(Todos);

export default Todos;