const io = require('socket.io')(4000, {
	cors: {
		origin: ['http://localhost:8080'],
	},
});

const users = new Set();

io.on('connection', (socket) => {
	console.log(`connected`);

	socket.on('button-press', (id) => {
		console.log(id);
	});

	socket.on('room-enter', (id, user) => {
		users.add(`${user}${socket.id}`);
		console.log(users);
		console.log(`Room ${id} connected to websocket server`);
	});
	socket.on('room-leave', (user) => {
		console.log(socket.id, `${user}${socket.id}`);
		users.delete(`${user}${socket.id}`);
		console.log(users);
	});
});
