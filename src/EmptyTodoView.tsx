import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action, IObservableArray } from "mobx";
import { TodoContext } from "./App";
import { Todo } from "./model";

let EmptyTodoView = function EmptyTodoView({
  empty
}: {
  empty: IObservableArray<Todo>
}) {
  const todos = useContext(TodoContext);
  const task = todos.getTask("createNew");


  return (
    <div>
      { }
      <form
        onSubmit={action((e) => {
          e.preventDefault();
          todos.saveEmpty(empty);
        })}>

        <input
          placeholder="Title"
          value={empty.map(todo => todo.title)}
          disabled={task.isPending}
          onInput={action((e) => empty.forEach(todo => todo.title = e.currentTarget.value))}>
        </input>
        <input
          type="submit"
          value="Create">
        </input>
        <span id={"l"}>
          {task.isPending ? "Loading"
            : task.isFailed ? <button onClick={() => task.reset()}>Error: {task.error}</button>
              : null}
        </span>
      </form>
    </div>
  );
};

EmptyTodoView = observer(EmptyTodoView);

export default EmptyTodoView;
