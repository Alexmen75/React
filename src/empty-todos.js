import React, { useContext } from 'react';
// import { Todo } from "./todo-model.js";
import { NewTodoContext, CreateTodoContext, DeleteTodoContext} from "./context.js";



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
  const saveValue = useContext(NewTodoContext);
  const addNewTodo = useContext(CreateTodoContext);
  const deleteEmptyTodo = useContext(DeleteTodoContext);
  return (
    // <form id="empty-todo">
    <form id="empty-todo" onSubmit={() =>{
      addNewTodo(todo);
      deleteEmptyTodo(todo);
    } }>
      <input
        placeholder="Title"
        value={todo.title}
        onInput={e => saveValue(todo, e.target.value)}>
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