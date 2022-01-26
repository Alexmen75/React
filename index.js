import Model from "./todo-model.js";
import "./style.css"
import React from 'react';
import ReactDOM from 'react-dom';



class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      filtered: props.model.todos,
      searchQuerry: '',

    }
  }

  render() {
    return (
      <TodoSection
        model={this.state.model}
        setState={(state) => this.setState(state)}
        filtered={this.state.filtered}
        searchQuerry={this.searchQuerry} />
    )
  }

  // renderTodo(todo) {
  //   return (
  //     <label id="todo">
  //       <input
  //         type="checkbox"
  //         checked={todo.isDone}
  //         onChange={() => this.setState({ model: this.state.model.toogle(todo) })}>
  //       </input>
  //       {todo.title}
  //     </label>
  //   )
  // }

  // renderCompleated() {
  //   const todos = this.state.model.todos;
  //   return `${todos.filter(todo => todo.isDone).length}/${todos.length}`;
  // }



}


function SearchBar(props) {
  const filtered = props.model.todos.slice().filter(todo => todo.title.includes(props.searchQuerry));
  const filterState = { filtered: filtered };
  return (
    <div>
      <input
        placeholder="Search"
        onInput={(e) => {
          props.setState({searchQuerry: e.target.value});
        }}></input>
    </div>
  )
}


function TodoSection(props) {
  return (
    <div>
      <SearchBar
        model={props.model}
        filtered={props.filtered}
        searchQuerry={props.searchQuerry}
        setState={props.setState} />
      <Compleated
        todos={props.model.todos} />
      <Todos
        model={props.model}
        setState={(props.setState)}
      />
    </div>
  )
}


function Compleated(props) {
  const todos = props.todos;
  return `${todos.filter(todo => todo.isDone).length}/${todos.length}`;
}


function Todos(props) {
  const todos = props.model.todos.map(todo =>
    <Todo
      setState={props.setState}
      model={props.model}
      todo={todo} />);
  return (
    <div className="todos">
      {todos}
    </div>
  );
}

function Todo(props) {
  const state = { model: props.model.toogle(props.todo) }
  return (
    <label id="todo">
      <input
        type="checkbox"
        checked={props.todo.isDone}
        onChange={() => props.setState(state)}>
      </input>
      {props.todo.title}
    </label>
  )
}

ReactDOM.render(
  <View
    model={new Model().seedTodos()} />,
  document.getElementById('root')
);