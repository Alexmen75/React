import Model, { Todo, modelReducer, actions } from "./todo-model.js";
import "./style.css"
import React, { useState, useEffect, useCallback, useContext, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Todos from "./todo";
import { TodoContext, ToogleManyComtext, NewTodoContext, CreateTodoContext, DeleteTodoContext } from "./context.js";
import EmptyTodos from "./empty-todos.js";




function View() {
  const [model, modelDispatch] = useReducer(modelReducer, new Model());
  const [searchQuerry, setQuerry] = useState("");
  const [emptyTodos, setEmptyTodos] = useState([]);


  useEffect(() => {
    modelDispatch({type: actions.seedTodos});
  }, []);

  const filtered = useMemo(() =>
    model.todos.filter(todo =>
      todo.title.includes(searchQuerry)), [model, searchQuerry]);




  const toogle = useCallback(todo => modelDispatch({type: actions.toogle, todo: todo, dispatch: modelDispatch}), []);

  const addTodo = () => setEmptyTodos(emptyTodos.concat([new Todo(-model.todos.length - emptyTodos.length, "", false)]));

  const saveValue = useCallback((todo, value) => setEmptyTodos(emptyTodos => changeValue(todo, emptyTodos, value)), []);

  const toogleMany = state => modelDispatch({type: actions.toogleMany, todos: filtered, isDone: state});

  const addNewTodo = useCallback(todo => modelDispatch({type: actions.addTodo, todo: todo}),[]);

  const deleteEmptyTodo = useCallback(todo => setEmptyTodos(emptyTodos =>deleteTodo(emptyTodos, todo)), []);

  return (
    <div>
      <ToogleManyComtext.Provider value={toogleMany}>
        <Search
          searchQuerry={searchQuerry}
          setQuerry={setQuerry}
        />
      </ToogleManyComtext.Provider>
      <AddTodo addTodo={addTodo} />
      <TodoContext.Provider value={toogle}>
        <Compleated todos={model.todos} />
        <Todos
          todos={filtered}
        />
      </TodoContext.Provider>
      <NewTodoContext.Provider value={saveValue}>
        <CreateTodoContext.Provider value={addNewTodo}>
          <DeleteTodoContext.Provider value={deleteEmptyTodo}>
          <EmptyTodos
            emptyTodoList={emptyTodos}
            setEmptyTodos={setEmptyTodos} />
          </DeleteTodoContext.Provider>
        </CreateTodoContext.Provider>
      </NewTodoContext.Provider>
    </div>
  )
}

const deleteTodo = (todos, todo) =>{
    const newTodos = todos.slice();
    newTodos.splice(todos.indexOf(todo), 1);
    return newTodos;
} 

function changeValue(todo, listTodo, value) {
  const newList = listTodo.slice();
  newList.splice(listTodo.indexOf(todo), 1, new Todo(todo.id, value, todo.isDone));
  return newList;
}


function AddTodo({ addTodo }) {
  return (
    <button onClick={addTodo}>
      Add
    </button>
  )
}


function Search({ searchQuerry, setQuerry }) {
  return (
    <div>
      <input
        placeholder="Search"
        onInput={e => setQuerry(searchQuerry = e.target.value)}
      >
      </input>
      {searchQuerry ?
        <ToogleMany /> :
        null}
    </div>
  )
}


function ToogleMany() {
  const toogleMany = useContext(ToogleManyComtext);
  return (
    <span>
      <input
        type="button"
        value="Mark all"
        onClick={() => toogleMany(true)}
      >
      </input>
      <input
        type="button"
        value="Сancel all"
        onClick={() => toogleMany(false)}
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