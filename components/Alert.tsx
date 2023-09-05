'use client';

import { Collapse, Alert } from '@mui/material';
import { useRootSelector } from '@/redux/hooks';

function Alerts() {
	const { active, type, message } = useRootSelector(
		(state) => state.game.alert
	);
	return (
		<div id='alert-wrapper'>
			<Collapse in={active}>
				<Alert severity={type}>{message}</Alert>
			</Collapse>
		</div>
	);
}

export default Alerts;
