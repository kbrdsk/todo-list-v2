import React from "react";

import {
	ProjectCollection,
	CategoryCollection,
	ContactCollection,
} from "./collections.js";
import { Todo, Project, Category, Contact } from "./items.js";

import "./style.css";

export class Display extends React.Component {
	render() {
		const focus = this.props.focus;
		return (
			<div id="display">
				{focus.itemType
					? this.displayItem(focus.itemType)
					: this.displayCollection(focus.collectionType)}
			</div>
		);
	}

	displayItem(itemType) {
		switch (itemType) {
			case "todo":
				return <Todo focus={this.props.focus} />;
			case "project":
				return <Project focus={this.props.focus} />;
			case "category":
				return <Category focus={this.props.focus} />;
			case "contact":
				return <Contact focus={this.props.focus} />;
			default:
				throw new Error("item type not recognized");
		}
	}

	displayCollection(collectionType) {
		switch (collectionType) {
			case "project":
				return <ProjectCollection focus={this.props.focus} />;
			case "category":
				return <CategoryCollection focus={this.props.focus} />;
			case "contact":
				return <ContactCollection focus={this.props.focus} />;
			default:
				throw new Error("collection type not recognized");
		}
	}
}
