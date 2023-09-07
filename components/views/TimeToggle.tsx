'use client';

import { Switch, ToggleButtonGroup, Collapse, ToggleButton } from '@mui/material';
import { useRootDispatch } from '@/redux/hooks';
import { useState } from 'react';

function TimeToggle() {
	const dispatch = useRootDispatch();
	const [open, setOpen] = useState(false)
	const [timeLimit, setTimeLimit] = useState(1)
	return (
		<>
			<h4>Timed</h4>
			<Switch onClick={() => setOpen(prev => !prev)} />
			<Collapse in={open}>
			<div className='flex '>
				<div className='flex flex-col items-center'>
					<h3>Choose Time Limit</h3>
					<ToggleButtonGroup
						value={timeLimit}
						onChange={(e, limit) => {
							setTimeLimit(limit)
						}}
						sx={{
							backgroundColor: '#32ec70',
							margin: '10px',
							boxShadow: '3px 3px 5px black',
							button: {
								boxShadow: 'none',
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
						<button className='green' >
							Start Game
						</button>
					</div>
				</div>
			</div>
		</Collapse>
		</>
	);
}

export default TimeToggle;
