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
			<div className="todo-list-item" key={item.storageId}>
				<div
					className={"checkbox" + (item.isDone?" done":"")}
					onClick={this.toggleDone.bind(this, item)}
				>
				</div>
				<div onClick={() => navigator.goTo(item)}>{item.title}</div>
				<button
					onClick={() => {
						this.props.focus.todoList.remove(item);
						item.tags.remove(this.props.focus);
						navigator.goTo(this.props.focus);
					}}
					className="delete"
				>
					{"\u2715"}
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
			<div
				className="todo-list-item"
				onClick={() => navigator.showAddWindow(focus.todoList)}
			>
				{title}
			</div>
		);
	}
}
