import React from "react";
import { observer } from "mobx-react-lite";

let Compleated = function Compleated({
  todos 
}){
  return (
    <div>
      {todos.filter(todo => todo.isDone).length + "/" + todos.length}
    </div>
  );
};

Compleated = observer(Compleated);

export default Compleated;