import React, {Component} from "react";

import LocationService from "../services/LocationService";
import APIService from "../services/APIService";
import LocationList from "./LocationList";

const locationService = new LocationService();
const apiService = new APIService();

export default class Locations extends Component {
	constructor() {
		super();

		this.state = {
			locations: []
		};
	}

	componentDidMount() {
		locationService
			.getLocations()
			.then(locs => {
				if (locs.data) {
					this.setState(() => ({
						locations: locs.data
					}));
				}
			})
			.catch(error => console.log(error.message));

		apiService
			.getAPI()
			.then(res => {
				if (res.data) {
					console.log(res.data);
					//          this.setState(() => ({ locations: locs.data }));
				}
			})
			.catch(error => console.log(error.message));
	}

	render() {
		return (
			<div
				className="container-fluid"
				style={{
					marginLeft: "-15px"
				}}>
				<div className="d-flex flex-row">
					<div className="col-sm-12">
						<LocationList locations={this.state.locations} />{" "}
					</div>{" "}
				</div>{" "}
			</div>
		);
	}
}
