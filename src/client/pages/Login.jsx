import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Context from '../context.jsx';
import { TextField } from '@mui/material';

function Login() {
	const navigate = useNavigate();
	const { setUser } = useContext(Context);
	function handleSubmit(e) {
		e.preventDefault();
		const username = e.target[0].value;
		const password = e.target[1].value;
		//validates username/password based on length
		if (username.length < 5) {
			window.alert('Username must be at least 5 characters long.');
			return;
		}
		if (password.length < 8) {
			window.alert('Password must be at least 8 characters long.');
			return;
		}
		//fetch request
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
				setUser(username);
				navigate('/');
			});
	}

	return (
		<div className='flex column center-all auth-wrapper'>
			<h1>Login</h1>
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
				<button type='submit'>Login</button>
			</form>
			<Link to='/'>
				<p>Return to Home Page</p>
			</Link>
		</div>
	);
}

export default Login;
