import React from "react";
import ResumeService from "../services/ResumeService";
import styles from "../styles/app-stylesheet.css";

const resumeService = new ResumeService();

class ResumeParse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			resumeJson: {},
			resumeBlob: ""
		};

		this.handleParseResume = this.handleParseResume.bind(this);
		this.postResume = this.postResume.bind(this);
	}

	postResume(ev) {
		ev.preventDefault();
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
					
					if(results.data.blob && results.data.blob.includes('\n')){
						//let blob = results.data.blob.replace(/(?:\r\n|\r|\n)/g, '<br />')
						let blob = results.data.blob.split ('\n').map ((item, i) => <p key={i}>{item}</p>);

						this.setState(() => ({
							resumeBlob: blob,
							resumeJson: results.data
						}));
					}
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
				
				<h5>
				{this.state.resumeBlob}
				</h5>

				<button onClick={this.postResume}>Post Resume</button>
			</div>
		);
	}
}

export default ResumeParse;
