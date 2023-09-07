'use client';

import {
	Switch,
	ToggleButtonGroup,
	Collapse,
	ToggleButton,
	Button,
} from '@mui/material';
import { useState } from 'react';

function TimeToggle() {
	const [open, setOpen] = useState(false);
	const [timeLimit, setTimeLimit] = useState(1);
	return (
		<>
			<h4>Timed</h4>
			<Switch color='secondary' onClick={() => setOpen((prev) => !prev)} />
			<Collapse in={open}>
				<div className='flex '>
					<div className='flex flex-col items-center'>
						<h3>Choose Time Limit</h3>
						<ToggleButtonGroup
							value={timeLimit}
							onChange={(e, limit) => {
								setTimeLimit(limit);
							}}
							sx={{
								margin: '10px',
								button: {
									backgroundColor: 'white',
									textTransform: 'none',
									'&:hover': {
										transform: 'none',
									},
								},
							}}
							exclusive>
							<ToggleButton value={1}>1 min</ToggleButton>
							<ToggleButton value={2}>2 min</ToggleButton>
							<ToggleButton value={3}>3 min</ToggleButton>
						</ToggleButtonGroup>
						<div className='flex flex-col'>
							<p>Time Limit: {String(timeLimit)} min</p>
							<Button variant='contained'>
								Start Game
							</Button>
						</div>
					</div>
				</div>
			</Collapse>
		</>
	);
}

export default TimeToggle;
