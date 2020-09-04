import React from "react";

import { navigator, itemManager } from "../index.js";

export class NavMenu extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.navTo("projects")}>Projects</button>
				<button onClick={this.navTo("categories")}>Categories</button>
				<button onClick={this.navTo("contacts")}>Contacts</button>
			</div>
		);
	}

	navTo(collection) {
		return () => navigator.goTo(itemManager[collection]);
	}
}
