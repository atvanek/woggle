import TimeLimit from './TimeLimit';
import { useContext } from 'react';
import Context from '../context/context';
import { HostProps } from '../types/types';

function Host({ started, timeLimit, setTimeLimit }: HostProps) {
	const { room, starting, socket } = useContext(Context)!;
	function handleMultiStart() {
		console.log('timeLimit from handleMultiStart', timeLimit)
		socket.emit('game-start', room.id, timeLimit);
	}

	console.log('timeLimit from Host', timeLimit)
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