import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../components/Board.jsx';

function Room() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { id } = useParams();
	const [users, setUsers] = React.useState([]);
	const [serverLetters, setServerLetters] = React.useState([]);
	const [socketId, setSocketId] = React.useState(null);
	const [username, setUsername] = React.useState(null);
	const [started, setStarted] = React.useState(false);

	//creates connection to websocket server
	const socket = io('http://localhost:3000/');

	//emits join room event upon mount
	//grabs socketId
	React.useEffect(() => {
		socket.on('connect', () => {
			setSocketId(socket.id);
			socket.emit('join-room', state.user, id, socket.id);
		});
	}, []);

	//ALL RECEIVED EVENTS
	socket.on('disconnect', () => {
		console.log('disconnected');
	});
	socket.on('user-added', (newUsers) => {
		setUsers(JSON.parse(newUsers));
	});
	socket.on('letters-ready', (letters) => {
		setStarted(true);
		setServerLetters(letters);
	});
	socket.on('username-generated', (newUsername) => {
		setUsername(newUsername);
	});
	socket.on('game-end', () => {
		setStarted(false);
		socket.disconnect();
	});

	return (
		<>
			<h1>{`Room ${id}`}</h1>
			<div className='flex column center-all'>
				<h2>You are "{username}"</h2>
				{!started && (
					<button
						className='button-size room-content'
						onClick={() => {
							//emits room-leave event
							socket.emit('room-leave', state.user, id, socketId);
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
				<div>
					<h4>Current Players</h4>
					<ul>
						{users.map((obj, i) => (
							<li key={i}>{obj.user.username}</li>
						))}
					</ul>
				</div>
				{serverLetters.length > 0 && (
					<Board
						serverLetters={serverLetters}
						room={id}
						socketId={socketId}
						user={state.user}
					/>
				)}
			</div>
		</>
	);
}

export default Room;
