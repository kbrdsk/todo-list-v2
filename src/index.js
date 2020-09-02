import React from "react";
import ReactDOM from "react-dom";

import { Todo } from "./model/todo.js";

import { TodoList } from "./components/todo-list.js";
import { AddTodo } from "./components/add-todo-popup.js";

import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items: []};
		this.addTodo = this.addTodo.bind(this);
	}

	render() {
		return (
			<div className="app">
				<TodoList list={this.state.items} />
				<AddTodo addTodo={this.addTodo}/>
			</div>
		);
	}

	addTodo(todo){
		this.setState({items: [...this.state.items, todo]})
	}
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
