// import React, { useContext } from 'react';
// import { DispatchContext } from "./context.js";
// import { actions } from './todo-model.js';

// function Todos(filtered) {
//   console.log(filtered.todos[0]);
//   return (
//     <div id="todos">
//       {filtered.todos.map(todo => (
//         <Todo
//           key={todo.id}
//           todo={todo}
//         />))}
//     </div>
//   )
// }

// const Todo = React.memo(function Todo({ todo }) {
//   const dispatch = useContext(DispatchContext);
//   return (
//     <div>
//       <label id="todo">
//         <input
//           type="checkbox"
//           checked={todo.isDone}
//           onChange={() => dispatch({type: actions.toogle, todo: todo})}>
//         </input>
//         {todo.title}
//       </label>
//     </div>
//   )
// });

// export default Todos;