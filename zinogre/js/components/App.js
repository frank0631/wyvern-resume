import Hello from "./Hello";
import Resume from "./Resume";

import React from "react";
import ReactDOM from "react-dom";
import {Route, Link} from "react-router-dom";

const Index = () => (
	<div>
		<h2> Home </h2>
		<Hello username={user_info_name} />
	</div>
);
const ResumePage = () => (
	<div>
		<h2> Resume </h2>
		<Resume userid={user_info_id} />
	</div>
);

//const Index = () => <h2>Home</h2>;
const About = () => <h2> About </h2>;
const Users = () => <h2> Users </h2>;

const App = () => (
	<div>
		<nav>
			<ul>
				<li>
					<Link to="/"> Home </Link>
				</li>
				<li>
					<Link to="/about/"> About </Link>
				</li>
				<li>
					<Link to="/users/"> Users </Link>
				</li>
				<li>
					<Link to="/resume/"> Resume </Link>
				</li>
			</ul>
		</nav>
		<Route path="/" exact component={Index} />
		<Route path="/about/" component={About} />
		<Route path="/users/" component={Users} />
		<Route path="/resume/" component={ResumePage} />
	</div>
);

export default App;
