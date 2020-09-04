import React from "react";

import { navigator, itemManager } from "../index.js";

class ProjectCollection extends React.Component {
	render() {
		return (
			<div>
				Displaying Project Collection
				{itemManager.projects.map(this.renderProject)}
				<button onClick={() => navigator.showAddWindow()}>
					Add Project
				</button>
			</div>
		);
	}

	renderProject(project) {
		return <div onClick={navTo(project)}>{project.title}</div>;
	}
}

class CategoryCollection extends React.Component {
	render() {
		return (
			<div>
				Displaying Category Collection
				{itemManager.categories.map(this.renderCategory)}
				<button onClick={() => navigator.showAddWindow()}>
					Add Category
				</button>
			</div>
		);
	}

	renderCategory(category) {
		return <div onClick={navTo(category)}>{category.title}</div>;
	}
}

class ContactCollection extends React.Component {
	render() {
		return <div>Displaying Contact Collection</div>;
	}
}

function navTo(item) {
	return () => navigator.goTo(item);
}

export { ProjectCollection, CategoryCollection, ContactCollection };
