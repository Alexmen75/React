import React from "react";
import { observer } from "mobx-react-lite";
import CreateButton from "./CreateButton";
import { Todo } from "./model";
import { observable } from "mobx";
import EmptyTodoView from "./EmptyTodoView";


const empty = observable<Todo>([]);

let EmptyTodoCreator = function EmptyTodoCreator() {
  return (
    <div id="empty-todo">
      {empty.some(todo => todo)
        ? <EmptyTodoView empty={empty} />
        : <CreateButton empty={empty} />}
    </div>
  );
};

EmptyTodoCreator = observer(EmptyTodoCreator);

export default EmptyTodoCreator;
