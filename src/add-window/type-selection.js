import React from "react";

export class TypeSelection extends React.Component {
	next(newItem, itemType) {
		return () => this.props.next(newItem, itemType);
	}
	render() {
		const tag = !!this.props.destination.tags;
		const context = this.props.context;
		return (
			<div>
				{!tag && context === "project" ? (
					<button onClick={this.next(true, "todo")}>New Todo</button>
				) : null}
				{!tag && context === "project" ? (
					<button onClick={this.next(false, "todo")}>
						Existing Todo
					</button>
				) : null}
				<button onClick={this.next(true, "project")}>
					New Project
				</button>
				<button onClick={this.next(false, "project")}>
					Existing Project
				</button>
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
			</div>
		);
	}
}
