import React from "react";

import { navigator, itemManager } from "../index.js";

export class ContactList extends React.Component {
	constructor(props) {
		super(props);
		const item = props.item;
		this.addContact = {
			add: (contact) => {
				if (!item);
				else if (item.itemType === "category") contact.tags.add(item);
				else contact.todoList.add(item);
			},
			contact: true,
		};
	}
	render() {
		const item = this.props.item;
		const list = !item
			? itemManager.contacts
			: itemManager.contacts.filter((contact) =>
					item.itemType !== "category"
						? contact.todoList.list().includes(item)
						: contact.tags.list().includes(item)
			  );
		return (
			<div className="contact-list">
				{list.map((contact) => this.renderContact(contact))}
				<div
					className="contact"
					onClick={() => navigator.showAddWindow(this.addContact)}
				>
					Add Contact
				</div>
			</div>
		);
	}

	renderContact(contact) {
		return (
			<div className="contact" onClick={() => navigator.goTo(contact)}>
				{`${contact.contactName.last}, ${contact.contactName.first}`}
			</div>
		);
	}
}
