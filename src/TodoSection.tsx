import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Todos from './Todos';
import Compleated from './Compleated';
import Search from './Search';
import MultipleMarker from "./MultipleMarker";
import EmptyTodoCreator from "./EmptyTodoCreator";
import { TodoContext } from "./App";
import { useObservable } from "./useObservable";

export const EmptyTodosContext = React.createContext(null);

let TodoSection = function TodoSection() {


  const todos = useContext(TodoContext);

  const a = todos.getTask("seed").isFresh;
  todos.seed();

  const searchQuerry = useObservable("");

  const filtered = todos.filter(searchQuerry.get());

  console.log("Todo Section render");

  return (
    <div className="todo-section">
        <Search searchQuerry={searchQuerry} />
        <MultipleMarker
          searchQuerry={searchQuerry}
          todos={filtered} />
        <Compleated />
        <Todos
          filtered={filtered}
        />

        <EmptyTodoCreator />
    </div>
  );
};

TodoSection = observer(TodoSection);

export default TodoSection;