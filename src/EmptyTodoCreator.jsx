import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action, autorun } from "mobx";
import Todo from "./model";
import { TodoContext } from "./App";


let EmptyTodoCreator = function EmptyTodoCreator() {
  const todos = useContext(TodoContext);

  return (
    <div>
      <input
        type="button"
        value="Add"
        onClick={() => todos.addEmpty()}
      />
    </div>
  );
};

EmptyTodoCreator = observer(EmptyTodoCreator);

export default EmptyTodoCreator;
