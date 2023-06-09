import React from 'react';
import { TextField } from '@mui/material';

function UsernameInput({ error, setError }) {
	return (
		<TextField
			type='string'
			size='small'
			label='Username'
			error={error.type === 'username'}
			helperText={error.type === 'username' && error.message}
			required
			variant='filled'
			onChange={() => setError({ type: '', message: '' })}
			margin='normal'
			sx={{
				input: {
					backgroundColor: 'white',
				},
			}}
		/>
	);
}

export default UsernameInput;
