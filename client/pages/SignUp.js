import React from 'react';
import Nav from '../components/Nav';
import { Navigate } from 'react-router-dom';

function SignUp() {
	return (
		<>
			<Nav />
			<h2>This is the Sign-Up Page</h2>
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
					fetch('/api/user', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ username, password }),
					}).then((res) => {
						window.location.replace('/');
						window.alert(
							`Successfully created account for ${e.target[0].value}`
						);
					});
				}}>
				<label>Username</label>
				<input type='text' />
				<label>Password</label>
				<input type='password' />
				<button type='submit'>Create Account</button>
			</form>
		</>
	);
}

export default SignUp;
