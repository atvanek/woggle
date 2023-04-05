import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

function Room() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const socket = io('http://localhost:4000/');
	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		socket.emit('new-user', state.user, id);
		console.log('entered into room');
	}, []);

	socket.on('disconnect', () => {
		console.log('disconnected');
	});
	socket.on('user-added', (newUsers) => {
		console.log(newUsers, 'new users event');
		setUsers(newUsers);
	});

	return (
		<>
			<h1>{`you are in room ${id}`}</h1>
			<button
				className='button-size'
				onClick={() => socket.emit('button-press', id)}>
				Test click
			</button>
			<button
				className='button-size'
				onClick={() => {
					socket.emit('room-leave', state.user, id);
					socket.disconnect();
					navigate('/');
				}}>
				Leave Room
			</button>
			<div>
				<h4>Current Players</h4>
				{users.length && users.map((user) => <p>{user}</p>)}
			</div>
		</>
	);
}

export default Room;
