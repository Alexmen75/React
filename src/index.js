import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import Todo from "./model"
import "./style.css";
import TodoSection from './TodoSection';



let View = function View() {
  const todos = observable.box(Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)));
  const searchQuerry = observable.box("");
  const emptyTodos = observable.box([]);
  console.log("View render");
  // const filtered = todos.filter(todo => todo.title.includes(searchQuerry.get()));
  return (
    <div>
      <TodoSection 
        todos={todos}
        searchQuerry={searchQuerry}
        emptyTodos={emptyTodos}/>
    </div>
  )
}

View = observer(View);


console.log("psaf");

ReactDOM.render(
  <View />,
  document.getElementById('root')
);

