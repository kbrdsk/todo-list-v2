import React from "react";

import { navigator, itemManager } from "../index.js";

export class ContactList extends React.Component {
	render() {
		const item = this.props.item;
		const list = itemManager.contacts.filter((contact) =>
			item.itemType !== "category"
				? contact.todoList.list().includes(item)
				: contact.tags.list().includes(item)
		);
		return (
			<div className="contact-list">
				{list.map((contact) => this.rendercontact(contact))}
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
