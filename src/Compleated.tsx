import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TodoContext } from "./App"

let Compleated = function Compleated() {
  const todos = useContext(TodoContext);

  const task = todos.getTask("seed");

  return (
    <div >
      { todos.countCompleted + "/" + todos.count }
      {   task.isPending  ? "Loading..."
        : task.isFailed   ? <button onClick={() => task.reset()}>Error: {task.error}</button>
        :                   null 
      }
    </div>
  );
};

Compleated = observer(Compleated);

export default Compleated;