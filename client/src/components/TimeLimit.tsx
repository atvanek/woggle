import { Collapse, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TimeLimitProps } from '../types/types';

function TimeLimit({
	timeLimit,
	setTimeLimit,
	handleGameStart,
	show,
}: TimeLimitProps) {
	return (
		<Collapse in={show}>
			<div className='flex center-all'>
				<div className='flex column center-all'>
					<h3>Choose Time Limit</h3>
					<ToggleButtonGroup
						value={timeLimit}
						onChange={(e, limit) => {
							console.log(limit)
							setTimeLimit(limit)
						}}
						sx={{
							backgroundColor: '#32ec70',
							margin: '10px',
							boxShadow: '3px 3px 5px black',
							button: {
								boxShadow: 'none',
								fontFamily: 'Georgia',
								backgroundColor: 'white',
								textTransform: 'none',
								'&:hover': {
									backgroundColor: 'rgb(255, 230, 89)',
									transform: 'none',
								},
							},
						}}
						exclusive>
						<ToggleButton value={1}>1 min</ToggleButton>
						<ToggleButton value={2}>2 min</ToggleButton>
						<ToggleButton value={3}>3 min</ToggleButton>
					</ToggleButtonGroup>
					<div className='flex column'>
						<p>Time Limit: {String(timeLimit)} min</p>
						<button className='green' onClick={handleGameStart}>
							Start Game
						</button>
					</div>
				</div>
			</div>
		</Collapse>
	);
}

export default TimeLimit;
