import React from "react";

import { TodoList } from "./todo-list.js";
import { ContactList } from "./contact-list.js";
import { Tags } from "./tags.js";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showContacts: false };
		this.toggleView = this.toggleView.bind(this);
	}

	render() {
		const project = this.props.focus;
		return (
			<div className="item-display">
				<h2>{project.title}</h2>
				{project.description ? <p>{project.description}</p> : null}
				<button onClick={this.toggleView}>
					{this.state.showContacts ? "Todo List" : "Contacts"}
				</button>
				{this.state.showContacts ? (
					<ContactList item={project} />
				) : (
					<TodoList focus={project} />
				)}
				<Tags focus={project} />
			</div>
		);
	}

	toggleView() {
		this.setState({ showContacts: !this.state.showContacts });
	}
}

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showContacts: false };
		this.toggleView = this.toggleView.bind(this);
	}
	render() {
		const todo = this.props.focus;
		return (
			<div className="item-display">
				<h2>{todo.title}</h2>
				<p>{todo.description}</p>
				<button onClick={this.toggleView}>
					{this.state.showContacts
						? "Hide Contacts"
						: "Show Contacts"}
				</button>
				{this.state.showContacts ? <ContactList item={todo} /> : null}
				<Tags focus={todo} />
			</div>
		);
	}

	toggleView() {
		this.setState({ showContacts: !this.state.showContacts });
	}
}

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showContacts: false };
		this.toggleView = this.toggleView.bind(this);
	}
	render() {
		const category = this.props.focus;
		return (
			<div className="item-display">
				<h2>{category.title}</h2>
				<button onClick={this.toggleView}>
					{this.state.showContacts ? "Project List" : "Contacts"}
				</button>
				{this.state.showContacts ? (
					<ContactList item={category} />
				) : (
					<TodoList focus={category} />
				)}
			</div>
		);
	}

	toggleView() {
		this.setState({ showContacts: !this.state.showContacts });
	}
}

class Contact extends React.Component {
	render() {
		const contact = this.props.focus;
		return (
			<div className="item-display">
				<h2>
					{contact.contactName.first + " " + contact.contactName.last}
				</h2>
				<span>{contact.email}</span>
				<span>{contact.phone}</span>
				<span>{contact.organization}</span>
				<TodoList focus={contact} />
				<Tags focus={contact} />
			</div>
		);
	}
}

export { Project, Todo, Category, Contact };
