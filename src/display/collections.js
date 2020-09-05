import React from "react";

import { ContactList } from "./contact-list.js";

import { navigator, itemManager } from "../index.js";

class ProjectCollection extends React.Component {
	render() {
		return (
			<div>
				<h2>Projects</h2>
				{itemManager.projects.map(this.renderProject)}
				<button onClick={() => navigator.showAddWindow()}>
					Add Project
				</button>
			</div>
		);
	}

	renderProject(project) {
		return (
			<div>
				<span onClick={navTo(project)}>{project.title}</span>
				<button
					onClick={() => {
						itemManager.projects.remove(project);
						navigator.goTo(itemManager.projects);
					}}
				>
					del
				</button>
			</div>
		);
	}
}

class CategoryCollection extends React.Component {
	render() {
		return (
			<div>
				<h2>Categories</h2>
				{itemManager.categories.map(this.renderCategory)}
				<button onClick={() => navigator.showAddWindow()}>
					Add Category
				</button>
			</div>
		);
	}

	renderCategory(category) {
		return (
			<div>
				<span onClick={navTo(category)}>{category.title}</span>
				<button
					onClick={() => {
						itemManager.categories.remove(category);
						navigator.goTo(itemManager.categories);
					}}
				>
					del
				</button>
			</div>
		);
	}
}

class ContactCollection extends React.Component {
	render() {
		return (
			<div>
				<h2>Contacts</h2>
				<ContactList />
			</div>
		);
	}
}

function navTo(item) {
	return () => navigator.goTo(item);
}

export { ProjectCollection, CategoryCollection, ContactCollection };
