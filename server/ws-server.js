const io = require('socket.io')(4000, {
	cors: {
		origin: ['http://localhost:8080'],
	},
});

const rooms = {
	1: { usernames: [], users: new Set() },
	2: { usernames: [], users: new Set() },
	3: { usernames: [], users: new Set() },
	4: { usernames: [], users: new Set() },
};

io.on('connect', (socket) => {
	console.log('connected', socket.id);

	socket.on('new-user', (user, id) => {
		socket.join(id);
		if (user === 'guest') {
			rooms[id].usernames.push(`${user}${rooms[id].usernames.length + 1}`);
		} else {
			rooms[id].usernames.push(user);
		}
		rooms[id].users.add(`${user}${socket.id}`);
		io.in(id).emit('user-added', [rooms[id].usernames]);
		console.log('emitting user added event');
	});

	socket.on('button-press', (id) => {
		console.log(id);
	});

	socket.on('room-leave', (user, id) => {
		console.log('disconnecting', socket.id);
		rooms[id].usernames.splice(rooms[id].usernames.indexOf(user), 1);
		rooms[id].users.delete(`${user}${socket.id}`);
		console.log(rooms[id]);
	});
});
