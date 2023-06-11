import TimeLimit from './TimeLimit';

function Host({ socket, started, id, starting, timeLimit, setTimeLimit }) {
	function handleMultiStart() {
		socket.emit('game-start', id, timeLimit);
	}
	return (
		<>
			<TimeLimit
				timeLimit={timeLimit}
				setTimeLimit={setTimeLimit}
				handleGameStart={handleMultiStart}
				show={!started && !starting}
			/>
		</>
	);
}

export default Host;
