import React from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

let MultipleMarker = function MultipleMarker({
  searchQuerry, todos
}) {
  return (
    searchQuerry.get() ?
      <MarkButton todos={todos} /> :
      null
  );
};

MultipleMarker = observer(MultipleMarker);


const MarkButton = function MarkButton({
  todos
}) {
  return (
    <span>
      <input
        type="button"
        value="Mark All"
        onClick={action(() => todos.forEach(todo => todo.isDone = true))}>
      </input>
      <input
        type="button"
        value="Cancel All"
        onClick={action(() => todos.forEach(todo => todo.isDone = false))}>
      </input>
    </span>
  )
}

export default MultipleMarker;