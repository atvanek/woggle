import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
	const navigate = useNavigate();

	function handleSubmit(e) {
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
		fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		}).then((res) => {
			window.alert(`Successfully created account for ${e.target[0].value}`);
			navigate('/', {
				replace: true,
				state: { user: username, loggedIn: true },
			});
		});
	}
	return (
		<>
			<h1>Sign-Up</h1>
			<form onSubmit={handleSubmit}>
				<label>Username: </label>
				<input type='text' />
				<label>Password: </label>
				<input type='password' />
				<button type='submit'>Create Account</button>
			</form>
			<Link to='/'>
				<p>Return to Home Page</p>
			</Link>
		</>
	);
}

export default SignUp;