import React from "react";

const getLocations = locations => {
	console.log(locations);
	return (
		<div className="card-deck">
			{locations.map(location => (
				<h1>
					{" "}
					location:
					{location.a},{location.b}{" "}
				</h1>
			))}{" "}
		</div>
	);
};

const LocationList = props => <div>{getLocations(props.locations)} </div>;

LocationList.defaultProps = {
	locations: ["loading"]
};

export default LocationList;
