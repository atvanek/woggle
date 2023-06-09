import React, { useContext } from 'react';
import { Collapse, Alert } from '@mui/material';
import Context from '../context';

function Alerts() {
	const { open, alert } = useContext(Context);
	return (
		<div id='alert-wrapper'>
			<Collapse in={open}>
				<Alert severity={alert.type}>{alert.message}</Alert>
			</Collapse>
		</div>
	);
}

export default Alerts;
