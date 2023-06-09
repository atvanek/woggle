import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../context.jsx';
import {TextField} from '@mui/material'

function SignUp() {
	const navigate = useNavigate();
	const { setUser } = useContext(Context);
	function handleSubmit(e) {
		e.preventDefault();
		if (e.target[1].value !== e.target[2].value) {
			window.alert('Passwords must match.');
			return;
		}
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
			window.alert(`Successfully created account for ${username}`);
			setUser(username);
			navigate('/');
		});
	}
	return (
		<>
			<h1>Sign-Up</h1>
			<div className='flex column center-all auth-wrapper'>
				<form onSubmit={handleSubmit}>
				<TextField
					type='string'
					size='small'
					label='Username'
					required
					variant='outlined'
					margin='normal'
				/>

				<TextField
					type='password'
					size='small'
					color='primary'
					label='Password'
					required
					variant='outlined'
					margin='normal'
					/>
						<TextField
					type='password'
					size='small'
					color='primary'
					label='Confirm Password'
					required
					variant='outlined'
					margin='normal'
				/>
					<button type='submit'>Create Account</button>
				</form>
				<Link to='/'>
					<p>Return to Home Page</p>
				</Link>
			</div>
		</>
	);
}

export default SignUp;
