import Model from "./todo-model.js";
import "./style.css"
import React, { useState } from 'react';
import ReactDOM from 'react-dom';



function View({initialModel}){
  const [model, setModel] = useState(initialModel);
  const [searchQuerry, setQuerry] = useState("");
  return (
    <div>
      <Search 
        searchQuerry={searchQuerry}
        setQuerry={setQuerry}
        />
      <Compleated todos={model.todos}/>
      <Todos 
        model={model}
        searchQuerry={searchQuerry}
        setModel={setModel}/> 
    </div>
  )
}



function Search({searchQuerry, setQuerry}) {
  return (
    <input 
      placeholder="Search"
      onInput={e => setQuerry(searchQuerry = e.target.value)}
      >
    </input>
  )
}

function Compleated({todos}) {
  return (
    <div>
      {todos.filter(todo => todo.isDone).length}/{todos.length}
    </div>
  )
}


function Todos({searchQuerry, setModel, model}) {
  return(
    <div id="todos">
      {model.todos.filter(todo => 
        todo.title.includes(searchQuerry)).map(todo => (
                          <Todo 
                            key={todo.id}
                            todo={todo}
                            model={model}
                            setModel={setModel}
                          />))}
    </div>
  )
}

function Todo({todo, setModel, model}) {
  return (
    <label id="todo">
      <input 
        type="checkbox"
        checked={todo.isDone}
        onChange={() => setModel(model.toogle(todo))}>
      </input>
      {todo.title}
    </label>
  )
}



ReactDOM.render(
  <View initialModel={new Model().seedTodos()}/>,
  document.getElementById('root')
);