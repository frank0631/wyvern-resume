import React from "react";

class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Search,
					{this.props.username}
				</h1>
			</div>
		);
	}
}

export default Search;
