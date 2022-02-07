import React from "react";
import { observer } from "mobx-react-lite";
import TodoView from "./TodoView";

let Todos = function Todos({
  filtered
}: {
  filtered : number[]
}){
  console.log("Todos ");
  return (
    <div>
      {filtered.map(id => (
        <TodoView key={id} id={id}/>
      ))}
    </div>
  );
};

Todos = observer(Todos);

export default Todos;