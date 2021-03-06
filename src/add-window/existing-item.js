import React from "react";

import { itemManager } from "../index.js";

export class ExistingItem extends React.Component {
	#collections = {
		todo: itemManager.todos,
		project: itemManager.projects,
		category: itemManager.categories,
		contact: itemManager.contacts,
	};

	constructor(props) {
		super(props);
		this.state = { selection: null };
		this.destination = this.props.destination;
		this.type = this.props.type;
		this.renderSelection = this.renderSelection.bind(this);
	}

	selectItem(selection) {
		this.props.carrier.item = selection;
		this.setState({ selection });
	}

	renderSelection(item) {
		return (
			<div
				onClick={() => this.selectItem(item)}
				className={item === this.state.selection ? "selected" : ""}
			>
				{item.title ||
					item.contactName.last + ", " + item.contactName.first}
			</div>
		);
	}

	todoFilter() {
		const context = this.props.context;
		const todoList = this.destination.list();
		return (item) =>
			!todoList.includes(item) &&
			!(item === context) &&
			!(context.itemType === "project" && context.isChildOf(item));
	}

	tagFilter() {
		const context = this.props.context;
		return (item) =>
			!(item === context) &&
			!(item.itemType === "project" && item.isChildOf(context)) &&
			!item.todoList.list().includes(context);
	}

	contactFilter() {
		const context = this.props.context;
		if (context.itemType === "category")
			return (contact) => !contact.tags.list().includes(context);
		else return (contact) => !contact.todoList.list().includes(context);
	}

	render() {
		const filter = this.destination.tags
			? this.tagFilter()
			: this.destination.contact
			? this.contactFilter()
			: this.todoFilter();
		const collection = this.#collections[this.type];
		return (
			<div className="item-form">
				{collection.filter(filter).map(this.renderSelection)}
			</div>
		);
	}
}
