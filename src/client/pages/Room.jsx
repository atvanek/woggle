import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import Controls from '../components/Controls';
import Context from '../context';
import Played from '../components/Played';
import { CircularProgress } from '@mui/material';

function Room() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [users, setUsers] = React.useState([]);
	const [serverLetters, setServerLetters] = React.useState([]);
	const [username, setUsername] = React.useState(null);
	const [started, setStarted] = React.useState(false);
	const [playerScores, setPlayerScores] = React.useState([]);
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
		setConnection,
	} = useContext(Context);

	//creates connection to websocket server
	const socket = io('http://localhost:3000/');
	//emits join room event upon mount
	useEffect(() => {
		socket.on('connect', () => {
			setSocketId(socket.id);
			setRoom(id);
			socket.emit('join-room', user, id, socket.id);
		});

		setPlayedWords(new Set());
		setScore(0);
		setConnection(socket);
		return () => {
			socket.disconnect(id);
		};
	}, []);

	useEffect(() => {
		if (score > 0) {
			socket.emit('update-score', room, score + wordPoints, socketId);
		}
	}, [score]);

	//ALL RECEIVED EVENTS

	//individual username generated
	socket.on('username-generated', (newUsername) => {
		setUsername(newUsername);
	});

	//new user joins room
	socket.on('user-added', (newUsers) => {
		setUsers(JSON.parse(newUsers));
	});

	//board generated on server
	socket.on('letters-ready', (letters) => {
		setStarted(true);
		setMultiplayer(true);
		setServerLetters(letters);
		setPossibleMoves(new Set());
	});

	//new players scores
	socket.on('new-scores', (newScores) => {
		//sets player scores
		const parsedScores = JSON.parse(newScores);
		setPlayerScores(parsedScores);
	});

	//end game logic
	socket.on('end-game', (scores) => {
		//generates string for end-game pop-up
		//determines winner
		let highScore = 0;
		let winner = '';
		const parsedScores = JSON.parse(scores);
		const finalScores = parsedScores.map((user) => {
			if (user.score > highScore) {
				highScore = user.score;
				winner = user.username;
			}
			return `${user.username}: ${user.score}\n`;
		});
		//pop-up
		window.alert(
			`Game ended!\nFinal Scores:\n${finalScores.join(
				''
			)}\n${winner} is the winner!`
		);
		//re-route to homescreen
		navigate('/');
	});
	socket.on('game-end', () => {
		setStarted(false);
	});
	socket.on('disconnect', () => {
		console.log('disconnected');
	});

	return (
		<>
			<h1>{`Room ${id}`}</h1>
			{!username ? (
				<CircularProgress />
			) : (
				<div className='flex column center-all'>
					<h2>You are "{username}"</h2>

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
					<button
						className='button-size'
						onClick={() => {
							if (!started) {
								socket.emit('game-start', id);
								setStarted(true);
							} else {
								socket.emit('game-end', id);
							}
						}}>
						{!started ? `Start Game` : 'End Game'}
					</button>
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
			)}
		</>
	);
}

export default Room;
