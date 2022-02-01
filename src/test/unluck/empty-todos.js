import React, { useContext } from 'react';
// import { Todo } from "./todo-model.js";
import { DispatchContext } from "./context.js";
import { actions } from './todo-model.js';



function EmptyTodos({ emptyTodoList }) {
  return (
    <div>
      {emptyTodoList.map(todo =>
        <EmptyTodo
          todo={todo}
          key={todo.id} />)}
    </div>
  )
}

const EmptyTodo = React.memo(function EmptyTodo({ todo }) {
  const dispatch = useContext(DispatchContext);
  return (
    // <form id="empty-todo">
    <form id="empty-todo" onSubmit={() =>{
      dispatch({type: actions.createTodo, todo: todo})
    } }>
      <input
        placeholder="Title"
        value={todo.title}
        onInput={e => dispatch({type: actions.saveValue, todo: todo, value: e.target.value})}>
      </input>
      <input
        type="submit"
        value="Create">
      </input>
    </form>
  )
})

// function EmptyTodo({ todo }) {
//   const [saveValue, createTodo] = useContext(NewTodoContext);
//   return (
//     <form onSubmit={() => createTodo(todo)}>
//       <input
//         placeholder="Title"
//         value={todo.title}
//         onInput={e => saveValue(todo, e.target.value)}>
//       </input>
//       <input
//         type="submit"
//         value="Create">
//       </input>
//     </form>
//   )
// }




export default EmptyTodos;