import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();
	return (
		<>
			<h1>Login-page</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const username = e.target[0].value;
					const password = e.target[1].value;
					if (username.length < 5) {
						window.alert('Username must be at least 5 characters long.');
						return;
					}
					if (password.length < 8) {
						window.alert('Password must be at least 8 characters long.');
						return;
					}
					fetch('/api/login', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ username, password }),
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.verified === false) {
								window.alert(`Invalid login credentials`);
								return;
							}
							window.alert(`Successfully logged in`);
							navigate('/', {
								replace: true,
								state: { user: username, loggedIn: true },
							});
						});
				}}>
				<label>Username: </label>
				<input type='text' />
				<label>Password: </label>
				<input type='password' />
				<button type='submit'>Login</button>
			</form>
			<Link to='/'>
				<p>Return to Home Page</p>
			</Link>
		</>
	);
}

export default Login;
