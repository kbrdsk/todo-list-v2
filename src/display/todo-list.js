import React from "react";

import { navigator } from "../index.js";

export class TodoList extends React.Component {
	render() {
		return (
			<div className="todo-list">
				{this.props.list.map((item) => this.renderItem(item))}
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
}
