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

	return seconds > 0 ? <p>{seconds} seconds left</p> : <p>Time's Up</p>;
}

export default Timer;
