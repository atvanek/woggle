import React, { useContext, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';
import { TextField } from '@mui/material';
import UsernameInput from '../components/UsernameInput';

function Login() {
	const navigate = useNavigate();
	const { setUser, setLoggedIn } = useContext(Context)!;
	const [error, setError] = useState({
		type: '',
		message: '',
	});
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const username = (target[0] as HTMLInputElement).value;
		const password = (target[1] as HTMLInputElement).value;
		//validates username/password based on length
		if (username.length < 5) {
			setError({
				type: 'username',
				message: 'Username must be at least 5 characters long.',
			});
			return;
		}
		if (password.length < 8) {
			setError({
				type: 'username',
				message: 'Password must be at least 8 characters long.',
			});
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
				setLoggedIn(true);
				navigate('/');
			});
	}

	return (
		<div className='flex column center-all auth-wrapper'>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<UsernameInput error={error} setError={setError} />

				<TextField
					type='password'
					size='small'
					color='primary'
					label='Password'
					required
					variant='filled'
					margin='normal'
					sx={{
						backgroundColor: 'white',
					}}
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
