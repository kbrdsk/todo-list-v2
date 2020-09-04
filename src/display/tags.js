import React from "react";

import { navigator } from "../index.js";

export class Tags extends React.Component {
	render() {
		const list = this.props.tags.list();
		return (
			<div className="tag-list">
				<div
					className="item"
					onClick={() => navigator.showAddWindow(this.props.tags)}
				>
					New Tag
				</div>
				{list.map((item) => this.renderItem(item))}
			</div>
		);
	}

	renderItem(item) {
		return (
			<div className="item" onClick={() => navigator.goTo(item)}>
				{item.title}
			</div>
		);
	}
}
