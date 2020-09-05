import React from "react";

import { navigator } from "../index.js";

export class Tags extends React.Component {
	render() {
		const list = this.props.focus.tags.list();
		return (
			<div className="tag-list">
				<div
					className="item"
					onClick={() =>
						navigator.showAddWindow(this.props.focus.tags)
					}
				>
					New Tag
				</div>
				{list.map((item) => this.renderItem(item))}
			</div>
		);
	}

	renderItem(item) {
		return (
			<div className="item">
				<span onClick={() => navigator.goTo(item)}>{item.title}</span>
				<button
					onClick={() => {
						item.todoList.remove(this.props.focus);
						this.props.focus.tags.remove(item);
						navigator.goTo(this.props.focus);
					}}
				>
					del
				</button>
			</div>
		);
	}
}
