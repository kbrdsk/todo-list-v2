import React from "react";

export class TodoList extends React.Component {
	renderItem(item) {
		return <TodoListItem item={item} />;
	}

	render() {
		return (
			<div className="todo-list">
				{this.props.list.map((item) => this.renderItem(item))}
			</div>
		);
	}
}

class TodoListItem extends React.Component {
	render() {
		return <div className="todo-list-item">{this.props.item.title}</div>;
	}
}