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
			<div>
				<h2>{project.title}</h2>
				<p>{project.description}</p>
				<button onClick={this.toggleView}>
					{this.state.showContacts ? "Todo List" : "Contacts"}
				</button>
				{this.state.showContacts ? (
					<ContactList item={project} />
				) : (
					<TodoList focus={project} />
				)}
				<Tags tags={project.tags} />
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
			<div>
				<h2>{todo.title}</h2>
				<p>{todo.description}</p>
				<button onClick={this.toggleView}>
					{this.state.showContacts
						? "Show Contacts"
						: "Hide Contacts"}
				</button>
				{this.state.showContacts ? <ContactList item={todo} /> : null}
				<Tags tags={todo.tags} />
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
			<div>
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
		return <div>Displaying Contact</div>;
	}
}

export { Project, Todo, Category, Contact };
