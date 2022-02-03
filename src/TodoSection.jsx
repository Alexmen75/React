import React from "react";
import { observer } from "mobx-react-lite";
import Todos from './Todos';
import Compleated from './Compleated';
import Search from './Search';
import MultipleMarker from "./MultipleMarker";
import EmptyTodoCreator from "./EmptyTodoCreator";
import EmptyTodos from "./EmptyTodos";


export const TodoContext = React.createContext([]);

let TodoSection = function TodoSection({
  todos, emptyTodos, searchQuerry
}) {
  const filtered = todos.get().filter(todo => todo.title.includes(searchQuerry.get()));
  console.log("Todo Section render");
  return (
    <div>
        <Search searchQuerry={searchQuerry} />
        <MultipleMarker
          searchQuerry={searchQuerry}
          todos={filtered} />
        <EmptyTodoCreator
          emptyTodos={emptyTodos}
        />
        <Compleated todos={filtered} />
        <Todos todos={filtered} />
      <TodoContext.Provider value={todos}>
        <EmptyTodos emptyTodos={emptyTodos} />
      </TodoContext.Provider>

    </div>
  );
};

TodoSection = observer(TodoSection);

export default TodoSection;