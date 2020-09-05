import React from "react";

import { navigator } from "../index.js";

export class TodoList extends React.Component {
	render() {
		const list = this.props.focus.todoList.list();
		return (
			<div className="todo-list">
				{list.map((item) => this.renderItem(item))}
				{this.renderAddButton()}
			</div>
		);
	}

	renderItem(item) {
		return (
			<div
				className="todo-list-item"
				onClick={() => navigator.goTo(item)}
			>
				{item.title}
			</div>
		);
	}

	renderAddButton() {
		const focus = this.props.focus;
		const title =
			focus.itemType === "category" ? "Add Project" : "Add Todo";
		return (
			<button onClick={() => navigator.showAddWindow(focus.todoList)}>
				{title}
			</button>
		);
	}
}
