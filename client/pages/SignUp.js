import React from 'react';
import Nav from '../components/Nav';
function SignUp() {
	return (
		<>
			<Nav />
			<h2>This is the Sign-Up Page</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					fetch('/api/user', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							username: e.target[0].value,
							password: e.target[1].value,
						}),
					}).then((res) => {
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
