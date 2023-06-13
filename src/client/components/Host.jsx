import TimeLimit from './TimeLimit';
import { useContext } from 'react'
import Context from '../context/context';

function Host({ started, timeLimit, setTimeLimit }) {
	const {room, starting, socket} = useContext(Context)
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
