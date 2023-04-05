import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

function Room() {
	const { state } = useLocation();
	const navigate = useNavigate();
	console.log(state);
	const { id } = useParams();
	const socket = io('http://localhost:4000/');

	socket.on('connect', () => {
		socket.emit('room-enter', id, state.user);
		console.log(`Room ${id} is connected to websocket server`);
	});
	socket.on('disconnect', () => {
		console.log('disconnected');
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
					socket.emit('room-leave', state.user);
					socket.disconnect();
					navigate('/');
				}}>
				Leave Room
			</button>
		</>
	);
}

export default Room;
