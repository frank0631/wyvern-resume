import Hello from "./Hello";
import Resume from "./Resume";
import Analytics from "./Analytics";
import Search from "./Search";
import styles from '../styles/app-stylesheet.css';

import React from "react";
import ReactDOM from "react-dom";
import {Route, Link} from "react-router-dom";

const Index = () => ( 
		<div>
			<Hello username={user_info_name} userid={user_info_id}  />
		</div> 
	);
const About = () => <h2> About </h2>;

const ResumePage = () => <Resume userid={user_info_id} />;
const AnalyticsPage = () => <Analytics username={user_info_name}/>;
const SearchPage = () => <Search username={user_info_name}/>;


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
					<Link to="/resume/"> Resume </Link>
				</li>
				<li>
					<Link to="/analytics/"> Analytics </Link>
				</li>
				<li>
					<Link to="/search/"> Search </Link>
				</li>
			</ul>
		</nav>
		<Route path="/" exact component={Index} />
		<Route path="/about/" component={About} />
		<Route path="/resume/" component={ResumePage} />
		<Route path="/analytics/" component={AnalyticsPage} />
		<Route path="/search/" component={SearchPage} />
	</div>
);

export default App;
