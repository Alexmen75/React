import React, { useContext, useState } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import Todos from './Todos';
import Compleated from './Compleated';
import Search from './Search';
import MultipleMarker from "./MultipleMarker";
import EmptyTodoCreator from "./EmptyTodoCreator";
import { TodoContext } from "./App";


const useObservable = (value) => useState(() => observable.box(value))[0];


let TodoSection = function TodoSection() {

  const todos = useContext(TodoContext);
  const searchQuerry = useObservable("");

  const filtered = todos.filter(searchQuerry.get());
  
  console.log("Todo Section render");
  return (
    <div className="todo-section">
        <Search searchQuerry={searchQuerry} />
        <MultipleMarker
          searchQuerry={searchQuerry}
          todos={filtered} />

        <EmptyTodoCreator/>

        <Compleated todos={filtered} />
        <Todos 
          filtered={filtered} 
          empties={todos.empties}
          />
    </div>
  );
};

TodoSection = observer(TodoSection);

export default TodoSection;