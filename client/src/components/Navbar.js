import React from 'react';
import { Link } from "react-router-dom"

const Navbar = ({ setSection }) => {
		return (
			<header className="z-1 nav-bar w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
			  <nav className="f6 fw6 ttu tracked flex justify-between">
			  	<div>
			  	<Link to="/nutrition">
				    <span className="link dim pointer outline-0 white dib ml5 mr3" 
				    		title="nutrition"
				    		onClick={setSection}>Nutrition</span>
			    </Link>
			    <Link to="/sleep">
				    <span className="link dim pointer outline-0 white dib mr3" 
				    		title="sleep"
				    		onClick={setSection}>Sleep</span>
			    </Link>
			    <Link to="/exercise">
				    <span className="link dim pointer outline-0 white dib mr3"
				    		title="exercise"
				    		onClick={setSection}>Exercise</span>
			    </Link>
			    </div>
			    <div>
				    <span className="link dim pointer outline-0 white dib mr3"
				    		title="exercise"
				    		onClick={logOut}>Log Out</span>
			    </div>
			  </nav>
			</header>
		);	
}

const logOut = () => {
	fetch('/api/logout', {
		method: "GET",
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then(res => {
		if (res.message === 'logged out') {
			window.location.href = "/"
		}
	})
}

export default Navbar;