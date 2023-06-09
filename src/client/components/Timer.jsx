import React, { useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

function Timer({ time }) {
	const [seconds, setSeconds] = React.useState(time);
	let timer;
	useEffect(() => {
		seconds <= 0
			? clearInterval(timer)
			: (timer = setInterval(() => {
					setSeconds((prev) => prev - 1);
			  }, 1000));
		return () => {
			clearInterval(timer);
		};
	}, []);

	function readableTime() {
		if (seconds > 60) {
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			return `${mins.toFixed(0)}:${secs.toString().padStart(2, 0)} `;
		} else {
			return `${seconds}`;
		}
	}
	return seconds > 0 ? (
		<>
			<Box sx={{ position: 'relative', display: 'inline-flex' }}>
				<CircularProgress
					sx={{
						height: '60px !important',
						width: '60px !important',
						color: `${seconds < 11 ? 'red' : seconds < 31 ? '#32ec70' : ''}`,
					}}
					variant='determinate'
					value={(100 / 60) * seconds}
				/>
				<Box
					className='flex center-all'
					sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
					<Typography
						sx={{ fontSize: '15px', letterSpacing: '1px', textWrap: 'nowrap' }}>
						{readableTime()}
					</Typography>
				</Box>
			</Box>
		</>
	) : (
		<p>Time's Up</p>
	);
}

export default Timer;
