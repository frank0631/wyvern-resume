import axios from "axios";

export default class LocationService {
	getLocations() {
		return new Promise((resolve, reject) => {
			axios
				.get(`/locations`)
				.then(response => {
					if (response.data && response.data.results) {
						resolve({
							data: response.data.results
						});
					}
				})
				.catch(error => reject(error.message));
		});
	}
}
