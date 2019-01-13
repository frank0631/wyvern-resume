import axios from "axios";
import Cookies from "js-cookie";

export default class APIService {
	getAPI() {
		return new Promise((resolve, reject) => {
			var token = Cookies.get("oidc_id_token");
			console.log("session in js " + Cookies.get("session"));
			console.log("JSESSIONID in js " + Cookies.get("JSESSIONID"));
			console.log("oidc_id_token in js " + Cookies.get("oidc_id_token"));

			var config = {
				headers: {
					Authorization: "Bearer " + token
				}
			};

			var bodyParameters = {
				key: "value"
			};

			axios
				.get(`api`, bodyParameters, config)
				.then(response => {
					if (response.data) {
						resolve({
							data: response.data
						});
					}
				})
				.catch(error => reject(error.message));
		});
	}
}
