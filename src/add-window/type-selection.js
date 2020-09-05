import React from "react";

export class TypeSelection extends React.Component {
	next(newItem, itemType) {
		return () => this.props.next(newItem, itemType);
	}
	render() {
		const tag = !!this.props.destination.tags;
		const contact = this.props.destination.contact;
		const context = this.props.context;
		return (
			<div className="popup" onClick={(e) => e.stopPropagation()}>
				{!contact && !tag && context !== "category" ? (
					<button onClick={this.next(true, "todo")}>New Todo</button>
				) : null}
				{!contact && !tag && context !== "category" ? (
					<button onClick={this.next(false, "todo")}>
						Existing Todo
					</button>
				) : null}
				{!contact ? (
					<button onClick={this.next(true, "project")}>
						New Project
					</button>
				) : null}
				{!contact ? (
					<button onClick={this.next(false, "project")}>
						Existing Project
					</button>
				) : null}
				{tag ? (
					<button onClick={this.next(true, "category")}>
						New Category
					</button>
				) : null}
				{tag ? (
					<button onClick={this.next(false, "category")}>
						Existing Category
					</button>
				) : null}
				{contact ? (
					<button onClick={this.next(true, "contact")}>
						New Contact
					</button>
				) : null}
				{contact ? (
					<button onClick={this.next(false, "contact")}>
						Existing Contact
					</button>
				) : null}
			</div>
		);
	}
}
