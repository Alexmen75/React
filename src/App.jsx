import "./style.css";
import React from 'react';
import { observer } from "mobx-react-lite";
import { Todos } from "./model"
import TodoSection from './TodoSection';

export const TodoContext = React.createContext(null);

const todos = new Todos();
todos.seed();
// const emptyTodos = observable.box([]);

let App = function App() {
  console.log("View render");

  return (
    <div className="todo-app">
      <TodoContext.Provider value={todos}> {/* Типа локальная копия базы данных */}
        <TodoSection />
        {/* <TodoSection /> */}
      </TodoContext.Provider>
    </div>
  )
}

App = observer(App);

export default App;
