import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/context';
import { TextField } from '@mui/material';
import UsernameInput from '../components/UsernameInput';

function SignUp() {
	const navigate = useNavigate();
	const { setUser } = useContext(Context);
	const [error, setError] = React.useState({
		type: '',
		message: '',
	});
	function handleSubmit(e) {
		e.preventDefault();
		if (e.target[1].value !== e.target[2].value) {
			setError({ type: 'password', message: 'Passwords must match.' });
			return;
		}
		const username = e.target[0].value;
		const password = e.target[1].value;
		if (username.length < 5) {
			setError({
				type: 'username',
				message: 'Username must be at least 5 characters long.',
			});
			return;
		}
		if (password.length < 8) {
			setError({
				type: 'password',
				message: 'Password must be at least 8 characters long.',
			});
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
					<UsernameInput error={error} setError={setError} />
					<TextField
						type='password'
						size='small'
						color='primary'
						label='Password'
						required
						variant='filled'
						onChange={() => setError({ type: '', message: '' })}
						error={error.type === 'password'}
						helperText={error.type === 'password' && 'Passwords must match'}
						margin='normal'
						sx={{
							input: {
								backgroundColor: 'white',
							},
						}}
					/>
					<TextField
						type='password'
						size='small'
						color='primary'
						label='Confirm Password'
						required
						variant='filled'
						margin='normal'
						onChange={() => setError({ type: '', message: '' })}
						sx={{
							backgroundColor: 'white',
						}}
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
