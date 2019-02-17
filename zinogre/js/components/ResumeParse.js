import React from "react";
import ResumeService from "../services/ResumeService";

const resumeService = new ResumeService();

class ResumeParse extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			resumeJson: {}
		};

		this.handleParseResume = this.handleParseResume.bind(this);
	}

	handleParseResume(ev) {
		ev.preventDefault();
		var userID = this.props.userid;
		var resumeFile = this.uploadInput.files[0];
		//resumeService.parse(userID, resumeFile);
		
		resumeService
			.parse(userID, resumeFile)
			.then(results => {
				if (results.data) {
					this.setState(() => ({
						resumeJson: results.data
					}));
				}
			})
			.catch(error => console.log(error.message));
		
	}

	render() {
		return (
			<div>
				<h1>
					Resume,
					{this.props.user_info}
				</h1>
				<form onSubmit={this.handleParseResume}>
					<div>
						<input
							ref={ref => {
								this.uploadInput = ref;
							}}
							type="file"
						/>
					</div>
					<br />
					<div>
						<button> Upload </button>
					</div>
				</form>
				
			<h4>
			{JSON.stringify(this.state.resumeJson, null, 2) }
			</h4>
				
			</div>
		);
	}
}


export default ResumeParse;
