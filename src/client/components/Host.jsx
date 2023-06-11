import { useState } from 'react';
import TimeLimit from './TimeLimit';

function Host({ socket, started, id, starting }) {
	const [timeLimit, setTimeLimit] = useState(1);

	function handleMultiStart() {
		socket.emit('game-start', id, timeLimit);
		// } else {
		//   socket.emit('game-end', id);
		// }
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
