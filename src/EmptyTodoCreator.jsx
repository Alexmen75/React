import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action, autorun } from "mobx";
import Todo from "./model";
import { TodoContext } from "./TodoSection";


let EmptyTodoCreator = function EmptyTodoCreator({
  emptyTodos
}) {
  const todos = useContext(TodoContext);

  return (
    <div>
      <input
        type="button"
        value="Add"
        onClick={action(() => emptyTodos.set(emptyTodos.get().concat([new Todo(-todos.get().length-emptyTodos.get().length, "", false)])))}
      />
    </div>
  );
};

EmptyTodoCreator = observer(EmptyTodoCreator);

export default EmptyTodoCreator;
