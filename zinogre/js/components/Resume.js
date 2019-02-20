import React from "react";
import {Route, Link} from "react-router-dom";

import ResumeParse from "./ResumeParse";
import ResumeList from "./ResumeList";

const ResumeHome = () => <h2> Resume Home </h2>;
const ParsePage = () => <ResumeParse userid={user_info_id} />;
const ListPage = () => <ResumeList userid={user_info_id} />;

class Resume extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/resume/parse"> Parse </Link>
						</li>
						<li>
							<Link to="/resume/list"> List </Link>
						</li>
					</ul>
				</nav>
				<Route path="/resume" exact component={ResumeHome} />
				<Route path="/resume/parse" component={ParsePage} />
				<Route path="/resume/list" component={ListPage} />
			</div>
		);
	}
}

Resume.defaultProps = {
	resumeJson: {}
};

export default Resume;
