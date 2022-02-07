import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { action, IObservableValue } from "mobx";
import { TodoContext } from "./App";
import { Todo } from "./model";

let MultipleMarker = function MultipleMarker({
  searchQuerry, todos
}: {
  todos: number[],
  searchQuerry: IObservableValue<string>,
}) {
  return (
    searchQuerry.get() ?
      <MarkButton todos={todos} /> :
      null
  );
};

MultipleMarker = observer(MultipleMarker);


const MarkButton = function MarkButton({
  todos: todosId
}: {
  todos: number[]
}) {
  const todos = useContext(TodoContext);
  return (
    <span>
      <input
        type="button"
        value="Mark All"
        onClick={action(() => todosId.forEach(todo => (todos.find(todo) as Todo).isDone = true))}>
      </input>
      <input
        type="button"
        value="Cancel All"
        onClick={action(() => todosId.forEach(todo => (todos.find(todo) as Todo).isDone = false))}>
      </input>
    </span>
  )
}

export default MultipleMarker;