import { io } from 'socket.io-client';

const ws = io('http://localhost:3000/', {
	autoConnect: false,
});

export default ws;
