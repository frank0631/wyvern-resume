import React from "react";
import Locations from "./Locations";

class Hello extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Hello,
					{this.props.username}
				</h1>
				<Locations />
			</div>
		);
	}
}

export default Hello;
