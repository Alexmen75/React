import { modelReducer, actions } from "./todo-model.js";
import "./style.css"
import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Todos from "./Todo/todos";
import { DispatchContext } from "./context.js";
import EmptyTodos from "./empty-todos.js";
import { observable, action, reaction, autorun } from "mobx";
import { observer } from "mobx-react-lite";
import Search from "./Search/Search"



// const t = observable({
//   a: 4,
//   b: 5 });

// const r = autorun(() => {console.log(t.a)})

// const a = action(t => {t.a = 6});

// a(t);



const searchQuerry = observable({ value: "" });
const filtered = observable({todos: []});

function View() {
  const [model, modelDispatch] = useReducer(modelReducer,
    {
      todos: [],
      emptyTodos: [],
    });
  // const [searchQuerry, setQuerry] = useState("");
  useEffect(() => {
    modelDispatch({ type: actions.seedTodos });
    filtered.todos = model.todos.filter(todo => todo.title.includes(searchQuerry.value));
  }, []);

  filtered.todos = model.todos.filter(todo => todo.title.includes(searchQuerry.value));

  // const filtered = useMemo(() =>
  //   model.todos.filter(todo =>
  //     todo.title.includes(searchQuerry.value)), [model, searchQuerry]);

  // const test = autorun(() => console.log(searchQuerry.value))
  
  try{

    console.log(filtered.todos[0]);
  }
  catch(error){

  }
  // useEffect(() => {
  //   filtered.todos = model.todos.filter(todo => todo.title.includes(searchQuerry.value))
  //   const t = autorun(() => {
  //     filtered.todos = model.todos.filter(todo => todo.title.includes(searchQuerry.value))
  //     console.log(filtered.todos[0]);
  //   });
  //   return t();
  // })
  return (
    <div>
      <DispatchContext.Provider value={modelDispatch}>
        <Search
          searchQuerry={searchQuerry}
        // setQuerry={setQuerry}
        />
        <AddTodo />
        <Compleated todos={model.todos} />
        <Todos
          filtered={filtered}
        />
        <EmptyTodos
          emptyTodoList={model.emptyTodos} />
      </DispatchContext.Provider>
    </div>
  )
}



function AddTodo() {
  const dispatch = useContext(DispatchContext);
  return (
    <button onClick={() => dispatch({ type: actions.addEmpty })}>
      Add
    </button>
  )
}


// function Search({ searchQuerry, setQuerry }) {
//   return (
//     <div>
//       <input
//         placeholder="Search"
//         onInput={e => setQuerry(searchQuerry = e.target.value)}
//       >
//       </input>
//       {searchQuerry ?
//         <ToogleMany /> :
//         null}
//     </div>
//   )
// }



function ToogleMany() {
  const dispatch = useContext(DispatchContext);
  return (
    <span>
      <input
        type="button"
        value="Mark all"
        onClick={() => dispatch({ type: actions.toogleMany, isDone: true })}
      >
      </input>
      <input
        type="button"
        value="Сancel all"
        onClick={() => dispatch({ type: actions.toogleMany, isDone: true })}
      >
      </input>
    </span>
  )
}


function Compleated({ todos }) {
  return (
    <div>
      {todos.filter(todo => todo.isDone).length}/{todos.length}
    </div>
  )
}


ReactDOM.render(
  <View />,
  document.getElementById('root')
);