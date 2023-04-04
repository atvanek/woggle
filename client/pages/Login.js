import React from 'react';
import { Link } from 'react-router-dom';


function Login() {


	return (
		<>
			<h2>This is the login-page</h2>
			<Link to='/'>
				<p>Return to Home Page</p>
			</Link>
		</>
	);
}

export default Login;
