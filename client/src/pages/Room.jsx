import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import Controls from '../components/Controls';
import Context from '../context/context';
import Played from '../components/Played';
import Host from '../components/Host';
import Timer from '../components/Timer';
import FinalScores from '../components/FinalScores';
import { CircularProgress } from '@mui/material';

function Room() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [serverLetters, setServerLetters] = useState([]);
	const [username, setUsername] = useState(null);
	const [started, setStarted] = useState(false);
	const [playerScores, setPlayerScores] = useState([]);
	const [host, setHost] = useState(false);
	const [timeLimit, setTimeLimit] = useState(1);
	const [ended, setEnded] = useState(false);
	const [message, setMessage] = useState('');
	const [startTimer, setStartTimer] = useState(null)
	const [startingTimer, setStartingTimer] = useState(null)
	const {
		setPossibleMoves,
		setMultiplayer,
		room,
		socketId,
		setSocketId,
		socket,
		user,
		score,
		setScore,
		wordPoints,
		setPlayedWords,
		starting,
		setStarting,
	} = useContext(Context);

	//starts game with letters and game duration from server
	function startGame(letters, duration) {
		//invokes starting phase (3 second countdown)
		setStarting(true);
		setStartingTimer(setTimeout(() => {
			setStarted(true);
			setMultiplayer(true);
			setServerLetters(letters);
			setPossibleMoves(new Set());
			setStarting(false);
		}, 3000));
		//invokes gameplay phase (duration from server (seconds) + 3 second delay)
		setStartTimer(setTimeout(() => {
			socket.emit('game-end', room.id);
		}, 3000 + duration * 60 * 1000));
	}

	//helper invoked on mount/dismount to handle edge cases
	function resetGame() {
		setPlayedWords(new Set());
		setScore(0);
		setStarted(false);
		setStartingTimer(null)
		setStartTimer(null)
	}

	//click handler for leave room button
	function handleLeave() {
		socket.disconnect();
		resetGame()
		navigate('/');
	}

	//emits join room event upon mount
	useEffect(() => {
		socket.connect();
		socket.on('connect', () => {
			setSocketId(socket.id);
			socket.emit('join-room', user, room.id, socket.id);
		});
		resetGame();
		return () => {
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, []);

	//emits update-score event to server whenever current player score changes
	useEffect(() => {
		if (score > 0) {
			socket.emit('update-score', room.id, score + wordPoints, socketId);
		}
	}, [score]);

	//props for Host component
	const props = {
		username,
		started,
		setStarted,
		serverLetters,
		playerScores,
		users,
		timeLimit,
		setTimeLimit,
	};

	//event listeners for all ws connection
	useEffect(() => {
		socket.on('username-generated', (newUsername, host) => {
			setUsername(newUsername);
			if (host) {
				setHost(true);
			}
		});
		//new user joins room
		socket.on('user-added', (newUsers) => {
			setUsers(JSON.parse(newUsers));
		});
		//board generated on server
		socket.on('letters-ready', (letters, duration) => {
			setTimeLimit(duration)
			startGame(letters, duration);
		});
		//new players scores
		socket.on('new-scores', (newScores) => {
			//sets player scores
			const parsedScores = JSON.parse(newScores);
			setPlayerScores(parsedScores);
		});
		let winnerMessage;
		//end game logic
		socket.on('end-game', (scores) => {
			//generates string for end-game pop-up
			//determines winner
			setEnded(true);
			let highScore = 0;
			let winners = [];
			const parsedScores = JSON.parse(scores);
			const finalScores = parsedScores.map((user) => {
				if (user.score > highScore) {
					highScore = user.score;
					winners = [user.username];
				} else if (highScore === user.score) {
					winners.push(user.username);
				}
				winnerMessage =
					winners.length > 1 ? (
						<>
							<p>It's a tie!</p>
							<p>
								The winners are{' '}
								<strong>{winners.map((winner) => winner + ' ')}</strong> with a
								score of <strong>{highScore}</strong>!
							</p>
						</>
					) : (
						<>
							<p>The winner is...</p>
							<p>
								<strong>{winners[0]}</strong> with a score of{' '}
								<strong>{highScore}</strong>!
							</p>
						</>
					);
				return `${user.username}: ${user.score}\n`;
			});
			setMessage(
				<>
					<h4>Final Scores:</h4>
					{finalScores.map((score) => (
						<p>{score}</p>
					))}
					<br />
					<p>{winnerMessage}</p>
				</>
			);
		});
		socket.on('game-end', () => {
			setStarted(false);
		});
		socket.on('disconnect', () => {
			setStarting(false);
			clearTimeout(startingTimer);
			clearTimeout(startTimer);
			resetGame();
		});
	}, []);

	return (
		<>
			{!username && (
				<div className='flex center-all column m-10'>
					<CircularProgress />
					<p className='m-10'>connecting...</p>
				</div>
			)}
			{starting && !started ? (
				<div className='flex column center-all'>
					<h2>Game Starting in </h2>
					<Timer time={3} />
				</div>
			) : (
				<>
					<h1>{`Room ${room.emoji}`}</h1>
					{started && <Timer time={timeLimit * 60} />}
					<div className='flex center-all'>
						<h2>
							You are {username}
							{host && ' - HOST'}
						</h2>
					</div>
					{host && <Host {...props} />}
					<div className='flex column center-all'>
						{!host && !started && <h3>Waiting for host to start game...</h3>}
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
									<div className='flex center-all'>Score: {score}</div>
									<Controls />
								</div>
								<Played />
							</div>
						)}
						{!started && <button onClick={handleLeave}>Leave Room</button>}
					</div>
					<FinalScores open={ended} message={message} />
				</>
			)}
		</>
	);
}

export default Room;
