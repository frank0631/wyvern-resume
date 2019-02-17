import React from "react";

class Analytics extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Analytics,
					{this.props.username}
				</h1>
			</div>
		);
	}
}

export default Analytics;
