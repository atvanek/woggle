import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

function Room() {
	const { id } = useParams();
	const socket = io('http://localhost:4000/');
	return <h1>{`you are in room ${id}`}</h1>;
}

export default Room;
