import React from "react";

import { Todo } from "../model/todo.js";

export class AddTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { displayPopup: false };
		this.displayPopup = this.displayPopup.bind(this);
		this.hidePopup = this.hidePopup.bind(this);
	}

	render() {
		return (
			<div>
				{this.state.displayPopup ? (
					<div className="popup-container">
						<AddTodoForm
							addTodo={this.props.addTodo}
							hidePopup={this.hidePopup}
						/>
					</div>
				) : null}
				<button onClick={this.displayPopup}>Add Todo</button>
			</div>
		);
	}

	displayPopup() {
		this.setState({ displayPopup: true });
	}

	hidePopup() {
		this.setState({ displayPopup: false });
	}
}

class AddTodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { todoName: "" };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSubmit(event) {
		this.props.hidePopup();
		this.props.addTodo(new Todo(this.state.todoName));
		event.preventDefault();
	}

	handleCancel(event) {
		this.setState({ todoName: "" });
		this.props.hidePopup();
	}

	handleAttrChange(attrName, event) {
		this.setState({ [attrName]: event.target.value });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						name="todo-name"
						onChange={this.handleAttrChange.bind(this, "todoName")}
					/>
				</label>
				<button onClick={this.handleCancel}>Cancel</button>
				<input type="submit" value="Add" />
			</form>
		);
	}
}
