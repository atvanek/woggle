import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../components/Board';

function Room() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [users, setUsers] = React.useState([]);
	const [serverLetters, setServerLetters] = React.useState([]);

	const socket = io('http://localhost:4000/');
	React.useEffect(() => {
		socket.emit('join-room', state.user, id);
	}, []);

	socket.on('disconnect', () => {
		console.log('disconnected');
	});
	socket.on('user-added', (newUsers) => {
		setUsers(newUsers);
	});
	socket.on('letters-ready', (letters) => {
		console.log(letters);
		setServerLetters(letters);
	});

	return (
		<>
			<h1>{`you are in room ${id}`}</h1>
			<button
				className='button-size'
				onClick={() => {
					socket.emit('room-leave', state.user, id);
					socket.disconnect();
					navigate('/');
				}}>
				Leave Room
			</button>
			<button
				className='button-size'
				onClick={() => {
					socket.emit('game-start', id);
				}}>
				Start Game
			</button>
			<div>
				<h4>Current Players</h4>
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user}</li>
					))}
				</ul>
				{serverLetters.length > 0 && <Board serverLetters={serverLetters} />}
			</div>
		</>
	);
}

export default Room;
