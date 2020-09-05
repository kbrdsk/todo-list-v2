import React from "react";

import { navigator } from "../index.js";
import { NewItem } from "./new-item.js";
import { ExistingItem } from "./existing-item.js";

export class ItemDetermination extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.carrier = {};
	}

	handleSubmit(event) {
		this.props.destination.add(this.carrier.item);
		navigator.hideAddWindow();
	}

	render() {
		return (
			<div className="popup" onClick={(e) => e.stopPropagation()}>
				{this.props.new ? (
					<NewItem carrier={this.carrier} type={this.props.type} />
				) : (
					<ExistingItem
						carrier={this.carrier}
						type={this.props.type}
						destination={this.props.destination}
						context={this.props.context}
					/>
				)}
				<button onClick={this.handleSubmit}>Add</button>
			</div>
		);
	}
}
