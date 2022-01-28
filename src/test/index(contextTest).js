import Model from "./todo-model.js";
import "./style.css"
import React from 'react';
import ReactDOM from 'react-dom';

const baseContext = { model: new Model().seedTodos() };
const TodoContext = React.createContext(baseContext);

class View extends React.Component {
  constructor(props) {
    super(props);

    this.toogleTodo = (todo) => {
      this.setState(({model}) => ({
        model: model.toogle(todo)
      }))
    };

    this.state = {
      model: baseContext.model,
      toogle: this.toogleTodo,
    }
  }

  render() {
    return (
      <div>
      <TodoContext.Provider value={this.state}>
        <TodoSection />
      </TodoContext.Provider>
      </div>
    )
  }
}

function SearchBox(){
  return (
    <input placeholder="Search">
    </input>
  )
}


function TodoSection() {
  return (
    <div>
      <SearchBox/>
      <Compleated />
      <Todos />
    </div>
  )
}


function Compleated() {
  return (
    <TodoContext.Consumer>
      {({ model }) => {
        const todos = model.todos;
        return (
          <div>
            {todos.filter(todo => todo.isDone).length}/{todos.length}
          </div>
        )
      }}
    </TodoContext.Consumer>
  )
}

function Todos() {
  return (
    <div className="todos">
      <TodoContext.Consumer>
        {({ model, toogle }) =>
        (model.todos.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
            onChange={toogle}
          />)))}
      </TodoContext.Consumer>
    </div>
  )
}


function Todo({ todo, onChange }) {
  return (
    <label id="todo">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={e => onChange(todo)}
      ></input>
      {todo.title}
    </label>
  )
}


ReactDOM.render(
  <View />,
  document.getElementById('root')
);