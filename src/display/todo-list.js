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
			<div className="todo-list-item">
				<span
					onClick={this.toggleDone.bind(this, item)}
				>
					{item.isDone ? "X" : "_"}
				</span>
				<span onClick={() => navigator.goTo(item)}>{item.title}</span>
				<button
					onClick={() => {
						this.props.focus.todoList.remove(item);
						item.tags.remove(this.props.focus);
						navigator.goTo(this.props.focus);
					}}
				>
					del
				</button>
			</div>
		);
	}

	toggleDone(item) {
		item.isDone = !item.isDone;
		navigator.goTo(this.props.focus);
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
