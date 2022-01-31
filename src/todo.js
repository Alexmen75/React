import React, { useContext } from 'react';
import { TodoContext } from "./context.js";

function Todos({ todos }) {

  return (
    <div id="todos">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
        />))}
    </div>
  )
}

const Todo = React.memo(function Todo({ todo }) {

  const toogle = useContext(TodoContext);
  return (
    <div>
      <label id="todo">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => toogle(todo)}>
        </input>
        {todo.title}
      </label>
    </div>
  )
});

export default Todos;