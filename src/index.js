import Model from "./todo-model.js";
import "./style.css"
import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';



function View(){
  const [model, setModel] = useState(new Model().seedTodos());

  useEffect(() => {
    setModel(model.seedTodos());
  }, []);

  const toogle = todo => setModel(model.toogle(todo));

  const [searchQuerry, setQuerry] = useState("");
  return (
    <div>
      <Search 
        searchQuerry={searchQuerry}
        setQuerry={setQuerry}
        />
      <Compleated todos={model.todos}/>
      <Todos 
        toogle = {toogle}
        todos = {model.todos}
        searchQuerry={searchQuerry}
      /> 
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


function Todos({searchQuerry, toogle, todos}) {
  return(
    <div id="todos">
      {todos.filter(todo => 
        todo.title.includes(searchQuerry)).map(todo => (
                          <Todo 
                            key={todo.id}
                            todo={todo}
                            toogle = {toogle}
                          />))}
    </div>
  )
}

function Todo({todo, toogle}) {
  return (
    <label id="todo">
      <input 
        type="checkbox"
        checked={todo.isDone}
        onChange={() => toogle(todo)}>
      </input>
      {todo.title}
    </label>
  )
}


 
ReactDOM.render(
  <View />,
  document.getElementById('root')
);