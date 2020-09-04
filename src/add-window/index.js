import React from "react";

import { navigator } from "../index.js";

import { ItemDetermination } from "./item-determination.js";
import { TypeSelection } from "./type-selection.js";

export class AddWindow extends React.Component {
	constructor(props) {
		super(props);
		this.backToTypeSelect = this.backToTypeSelect.bind(this);
		this.goToItemDetermination = this.goToItemDetermination.bind(this);
		this.state = {
			typeSelection: !!this.props.context.itemType,
			newItem: true,
			itemType: this.props.context.collectionType,
		};
	}

	backToTypeSelect() {
		this.setState({ typeSelection: true });
	}

	goToItemDetermination(newItem, itemType) {
		this.setState({ typeSelection: false, newItem, itemType });
	}

	render() {
		return (
			<div className="popup-container">
				{this.props.context.itemType && !this.state.typeSelection ? (
					<button className="back" onClick={this.backToTypeSelect}>
						Back
					</button>
				) : null}

				<button
					className="close"
					onClick={() => navigator.hideAddWindow()}
				>
					Close
				</button>

				{this.state.typeSelection ? (
					<TypeSelection
						className="popup"
						next={this.goToItemDetermination}
						destination={this.props.destination}
						context={this.props.context.itemType}
					/>
				) : (
					<ItemDetermination
						className="popup"
						destination={this.props.destination}
						type={this.state.itemType}
						new={this.state.newItem}
						context={this.props.context}
					/>
				)}
			</div>
		);
	}
}
