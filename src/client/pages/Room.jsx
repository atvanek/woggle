import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import Controls from '../components/Controls';
import Context from '../context';
import Played from '../components/Played';
import Host from '../components/Host';
import Timer from '../components/Timer';

function Room() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [users, setUsers] = React.useState([]);
	const [serverLetters, setServerLetters] = React.useState([]);
	const [username, setUsername] = React.useState(null);
	const [started, setStarted] = React.useState(false);
	const [playerScores, setPlayerScores] = React.useState([]);
	const [host, setHost] = React.useState(false);
	const [duration, setDuration] = React.useState(null);
	const {
		setPossibleMoves,
		setMultiplayer,
		room,
		setRoom,
		socketId,
		setSocketId,
		user,
		score,
		setScore,
		wordPoints,
		setPlayedWords,
		starting,
		setStarting,
	} = useContext(Context);

	function resetGame() {
		setPlayedWords(new Set());
		setScore(0);
	}

	function startGame(letters) {
		setStarting(true);
		setTimeout(() => {
			setStarted(true);
			setMultiplayer(true);
			setServerLetters(letters);
			setPossibleMoves(new Set());
			setStarting(false);
		}, 3000);
	}

	function handleLeave() {
		socket.disconnect();
		navigate('/');
	}

	//creates connection to websocket server
	const socket = io('http://localhost:3000/');
	//emits join room event upon mount
	useEffect(() => {
		socket.on('connect', () => {
			setSocketId(socket.id);
			setRoom(id);
			socket.emit('join-room', user, id, socket.id);
		});
		resetGame();
		return () => {
			socket.disconnect(id);
		};
	}, []);

	useEffect(() => {
		if (score > 0) {
			socket.emit('update-score', room, score + wordPoints, socketId);
		}
	}, [score]);

	const props = {
		username,
		socket,
		started,
		setStarted,
		serverLetters,
		playerScores,
		score,
		users,
		id,
		starting,
	};
	//ALL RECEIVED EVENTS

	//individual username generated
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
		setDuration(duration);
		startGame(letters);
	});

	//new players scores
	socket.on('new-scores', (newScores) => {
		//sets player scores
		const parsedScores = JSON.parse(newScores);
		setPlayerScores(parsedScores);
	});
	let message;
	//end game logic
	socket.on('end-game', (scores) => {
		//generates string for end-game pop-up
		//determines winner
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
			message =
				winners.length > 1
					? `It's a tie! The winners are ${winners.map(
							(winner) => winner + ' '
					  )} with a score of ${highScore}!`
					: `The winner is ${winners[0]}: ${highScore}\n`;
			return `${user.username}: ${user.score}\n`;
		});
		//pop-up
		window.alert(
			`Game ended!\nFinal Scores:\n${finalScores.join('')}\n${message}`
		);
		//re-route to homescreen
		socket.disconnect();
		navigate('/');
	});
	socket.on('game-end', () => {
		setStarted(false);
	});
	socket.on('disconnect', () => {
		resetGame();
		console.log('disconnected');
	});

	return (
		<>
			{starting && !started ? (
				<div className='flex center-all'>
					<h2>Game Starting in </h2>
					<Timer time={3} />
				</div>
			) : (
				<>
					<h1>{`Room ${id}`}</h1>
					{started && <Timer time={duration * 60} />}
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
				</>
			)}
		</>
	);
}

export default Room;
