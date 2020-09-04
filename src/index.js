import React from "react";
import ReactDOM from "react-dom";

import { NavMenu } from "./nav-menu/index.js";
import { AddWindow } from "./add-window/index.js";
import { Display } from "./display/index.js";

import { TodoManager } from "./model/todo.js";
import { save, load, reset } from "./model/storage.js";

import "./style.css";

const nullItemDestination = {add(){}};

const navigator = {
	goTo(focus) {
		this.hideAddWindow();
		this.app.setState({ focus });
	},
	hideAddWindow() {
		this.app.setState({
			addWindowItemDestination: nullItemDestination,
			addWindowVisible: false,
		});
	},
	showAddWindow(addWindowItemDestination = nullItemDestination) {
		this.app.setState({
			addWindowItemDestination,
			addWindowVisible: true,
		});
	},
};

const itemManager = new TodoManager();

class App extends React.Component {
	constructor(props) {
		super(props);
		navigator.app = this;
		itemManager.app = this;
		load();
		this.state = {
			focus: itemManager.projects,
			addWindowItemDestination: null,
			addWindowVisibility: false,
		};
	}

	render() {
		save();
		return (
			<div>
				<button onClick={reset}>Reset</button>
				<NavMenu></NavMenu>
				<Display focus={this.state.focus}></Display>
				{this.state.addWindowVisible ? (
					<AddWindow
						destination={this.state.addWindowItemDestination}
						context={this.state.focus}
					></AddWindow>
				) : null}
			</div>
		);
	}
}

export { navigator, itemManager };

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
