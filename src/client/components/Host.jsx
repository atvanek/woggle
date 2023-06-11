import TimeLimit from './TimeLimit';
import { useContext } from 'react'
import Context from '../context';

function Host({ socket, started, starting, timeLimit, setTimeLimit }) {
	const {room} = useContext(Context)
	function handleMultiStart() {
		socket.emit('game-start', room.id, timeLimit);
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
