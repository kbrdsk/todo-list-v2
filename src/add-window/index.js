import React from "react";

import { navigator } from "../index.js";

import { ItemDetermination } from "./item-determination.js";
import { TypeSelection } from "./type-selection.js";

import "./style.css";

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

	backToTypeSelect(event) {
		event.stopPropagation();
		this.setState({ typeSelection: true });
	}

	goToItemDetermination(newItem, itemType) {
		this.setState({ typeSelection: false, newItem, itemType });
	}

	render() {
		return (
			<div
				id="popup-background"
				onClick={() => navigator.hideAddWindow()}
			>
				<div id="popup-container">
					{this.props.context.itemType &&
					!this.state.typeSelection ? (
						<button
							className="back"
							onClick={this.backToTypeSelect}
						>
							Back
						</button>
					) : null}

					{this.state.typeSelection ? (
						<TypeSelection
							next={this.goToItemDetermination}
							destination={this.props.destination}
							context={this.props.context.itemType}
						/>
					) : (
						<ItemDetermination
							destination={this.props.destination}
							type={this.state.itemType}
							new={this.state.newItem}
							context={this.props.context}
						/>
					)}
				</div>
			</div>
		);
	}
}
