import React, { useEffect } from 'react';

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
			return `${mins.toFixed(0)} mins ${secs} seconds left`;
		} else if (seconds > 1) {
			return `${seconds} seconds left`;
		} else {
			return `1 second left`;
		}
	}
	return seconds > 0 ? <p>{readableTime()}</p> : <p>Time's Up</p>;
}

export default Timer;
