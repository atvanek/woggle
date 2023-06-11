import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Board from './Board.jsx';
import Controls from './Controls.jsx';
import Played from './Played.jsx';
import TimeLimit from './TimeLimit';

function Host({
	username,
	socket,
	started,
	setStarted,
	serverLetters,
	playerScores,
	score,
	users,
	id,
}) {
	const navigate = useNavigate();
	const [timeLimit, setTimeLimit] = useState(1);

	function handleMultiStart() {
		socket.emit('game-start', id);
		setStarted(true);
		// } else {
		//   socket.emit('game-end', id);
		// }
	}
	return (
		<div className='flex column center-all'>
			<h2>You are {username} - HOST'</h2>
			<TimeLimit
				timeLimit={timeLimit}
				setTimeLimit={setTimeLimit}
				handleGameStart={handleMultiStart}
				show={!started}
			/>
			{!started && (
				<button
					className='button-size room-content'
					onClick={() => {
						//emits room-leave event
						socket.disconnect();
						navigate('/');
					}}>
					Leave Room
				</button>
			)}
			{!started && (
				<div>
					<h4>Current Players</h4>
					<ul>
						{users.map((user, i) => (
							<li key={i}>{user}</li>
						))}
					</ul>
				</div>
			)}
			{serverLetters.length > 0 && (
				<div className='flex around width-100'>
					<section id='players-scores' className='flex column m-10'>
						<h3>Players Scores</h3>
						{playerScores.map((player, i) => {
							return (
								<p key={i}>
									{player.username}: {player.score}
								</p>
							);
						})}
					</section>
					<div className='m-10'>
						<Board letters={serverLetters} />
						Score: {score}
						<Controls />
					</div>
					<Played />
				</div>
			)}
		</div>
	);
}

export default Host;
