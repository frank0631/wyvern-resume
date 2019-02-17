import React from "react";
import ResumeService from "../services/ResumeService";

const resumeService = new ResumeService();

class Resume extends React.Component {
	constructor(props) {
		super(props);

		this.handleUploadImage = this.handleUploadImage.bind(this);
	}

	handleUploadImage(ev) {
		ev.preventDefault();
		var userID = this.props.userid;
		var resumeFile = this.uploadInput.files[0];
		resumeService.parse(userID, resumeFile);
	}

	render() {
		return (
			<div>
				<h1>
					Resume,
					{this.props.user_info}
				</h1>
				<form onSubmit={this.handleUploadImage}>
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
			</div>
		);
	}
}

Resume.defaultProps = {
	resumeJson: {}
};

export default Resume;
