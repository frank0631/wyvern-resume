import axios from "axios";

export default class ResumeService {
	
//	parse(userID, resumeFile) {
//		//console.log("userID: " + userID);
//		//console.log("resumeFile size: " + resumeFile.size);
//
//		let data = new FormData();
//		data.append("file", resumeFile);
//		data.append("user", userID);
//
//		const header = {
//			headers: {
//				"Content-Type": "multipart/form-data"
//			}
//		};
//
//		axios.post(`/api/resume/parse`, data, header).then(res => {
//			console.log(res);
//			console.log(res.data);
//		});
//	}
//	
	parse(userID, resumeFile){
		
		let data = new FormData();
		data.append("file", resumeFile);
		data.append("user", userID);

		const header = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};
		
		return new Promise((resolve, reject) => {
			axios
				.post(`/api/resume/parse`, data, header)
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
	
	
	
	
	
	
	create(resume_json){
		
	}
	
	read(){
		
	}
	
	details(resume_id){
		
	}
	
	update(resume_id, resume_json){
		
	}
	
	del(resume_id){
		
	}
}
