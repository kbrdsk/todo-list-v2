import React from "react";

import { itemManager } from "../index.js";

export class NewItem extends React.Component {
	#generators = {
		todo: itemManager.todos.add,
		project: itemManager.projects.add,
		category: itemManager.categories.add,
		contact: itemManager.contacts.add,
	};

	constructor(props) {
		super(props);
		const generator = this.#generators[this.props.type];
		const attributes = {};
		this.state = { attributes };
		Object.defineProperty(this.props.carrier, "item", {
			get() {
				const item = generator(attributes.first, attributes.last);
				for (let attr in attributes) {
					item[attr] = attributes[attr];
				}
				return item;
			},
		});
	}

	updateAttr(name, event) {
		this.setState({
			attributes: Object.assign(this.state.attributes, {
				[name]: event.target.value,
			}),
		});
	}

	render() {
		const type = this.props.type;
		return (
			<div className="item-form">
				{["project", "todo", "category"].includes(type) ? (
					<input
						type="text"
						placeholder="Title"
						onChange={this.updateAttr.bind(this, "title")}
					/>
				) : null}
				{["project", "todo"].includes(type) ? (
					<input
						type="text"
						placeholder="Description"
						onChange={this.updateAttr.bind(this, "description")}
					/>
				) : null}
				{type === "contact" ? (
					<input
						type="text"
						placeholder="First"
						onChange={this.updateAttr.bind(this, "first")}
					/>
				) : null}
				{type === "contact" ? (
					<input
						type="text"
						placeholder="Last"
						onChange={this.updateAttr.bind(this, "last")}
					/>
				) : null}
				{type === "contact" ? (
					<input
						type="email"
						placeholder="email@domain"
						onChange={this.updateAttr.bind(this, "email")}
					/>
				) : null}
				{type === "contact" ? (
					<input
						type="tel"
						placeholder="(xxx) xxx-xxxx"
						onChange={this.updateAttr.bind(this, "phone")}
					/>
				) : null}
				{type === "contact" ? (
					<input
						type="text"
						placeholder="Organization"
						onChange={this.updateAttr.bind(this, "organization")}
					/>
				) : null}
			</div>
		);
	}
}