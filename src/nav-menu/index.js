import React from "react";

import { navigator, itemManager } from "../index.js";

import "./style.css";

export class NavMenu extends React.Component {
	render() {
		return (
			<div id="nav-menu">
				<button className="projects" onClick={this.navTo("projects")}>
					Projects
				</button>
				<button
					className="categories"
					onClick={this.navTo("categories")}
				>
					Categories
				</button>
				<button className="contacts" onClick={this.navTo("contacts")}>
					Contacts
				</button>
			</div>
		);
	}

	navTo(collection) {
		return () => navigator.goTo(itemManager[collection]);
	}
}
