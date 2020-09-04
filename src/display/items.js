import React from "react";

import { TodoList } from "./todo-list.js";
import { Tags } from "./tags.js";

import { navigator } from "../index.js";

class Project extends React.Component {
	render() {
		const project = this.props.focus;
		return (
			<div>
				Project: {project.title}
				<p>{project.description}</p>
				<TodoList list={project.todoList.list()} />
				<button
					onClick={() => navigator.showAddWindow(project.todoList)}
				>
					Add Todo
				</button>
				<Tags tags={project.tags} />
			</div>
		);
	}
}

class Todo extends React.Component {
	render() {
		const todo = this.props.focus;
		return (
			<div>
				Todo: {todo.title}
				<p>{todo.description}</p>
				<Tags tags={todo.tags} />
			</div>
		);
	}
}

class Category extends React.Component {
	render() {
		const category = this.props.focus;
		return (
			<div>
				Category: {category.title}
				<TodoList list={category.todoList.list()} />
				<button
					onClick={() => navigator.showAddWindow(category.todoList)}
				>
					Add Project
				</button>
			</div>
		);
	}
}

class Contact extends React.Component {
	render() {
		return <div>Displaying Contact</div>;
	}
}

export { Project, Todo, Category, Contact };
