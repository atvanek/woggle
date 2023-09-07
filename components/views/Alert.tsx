'use client';

import { Collapse, Alert as MUIAlert } from '@mui/material';
import { useRootSelector } from '@/redux/hooks';

function Alert() {
	const { active, type, message } = useRootSelector(
		(state) => state.game.alert
	);

	return (
		<div id='alert-wrapper'>
			<Collapse in={active}>
				<MUIAlert severity={type}>{message}</MUIAlert>
			</Collapse>
		</div>
	);
}

export default Alert;
