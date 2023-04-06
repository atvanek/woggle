const blocks = require('../client/data/blocks');

const io = require('socket.io')(4000, {
	cors: {
		origin: ['http://localhost:8080'],
	},
});

const rooms = {
	1: [],
	2: [],
	3: [],
	4: [],
};

io.on('connect', (socket) => {
	//USER JOINS A ROOM
	socket.on('join-room', (user, room, socketId) => {
		socket.join(room);
		const username =
			user === 'guest' ? `guest${rooms[room].length + 1}` : 'guest';
		rooms[room].push({ user: { username: username, socketId: socketId } });
		console.log('joined room', rooms);
		io.in(room).emit('user-added', JSON.stringify(rooms[room]), username);
		io.to(socketId).emit('username-generated', username);
	});
	socket.on('new-board', (room) => {
		socket.join(room);
	});

	//SERVER GENERATED LETTERS (WILL MOVE TO OWN MODULE)
	function generateLetters() {
		const lettersGrid = [];
		let column = 0;
		let row = 0;
		let id = 1;
		let currentRow = [];
		while (blocks.length) {
			const randomIndex = Math.floor(Math.random() * blocks.length);
			const randomBlock = blocks[randomIndex];
			const randomLetterIndex = Math.floor(Math.random() * 6);
			currentRow.push(randomBlock[randomLetterIndex]);
			blocks.splice(randomIndex, 1);
			column++;
			id++;
			if (column === 4) {
				lettersGrid.push(currentRow);
				currentRow = [];
				column = 0;
				row++;
			}
		}
		return lettersGrid;
	}
	//GAME STARTED
	socket.on('game-start', (id) => {
		const letters = generateLetters();
		io.in(id).emit('letters-ready', letters);
	});
	//UPDATE SCORE
	socket.on('update-score', (user, room, score, socketId) => {
		console.log(socketId);
		const target = rooms[room];
		console.log(target);
		for (let obj of target) {
			console.log(obj.user);
			if (obj.user.socketId === socketId) {
				obj.user.score = score;
				console.log('it worked');
			}
		}
		console.log(rooms[room])
		io.in(room).emit('new-scores', JSON.stringify(rooms[room]));
	});
	//GAME ENDED
	socket.on('game-end', (room) => {
		console.log(rooms, rooms[room])
		io.in(room).emit('end-game', JSON.stringify(rooms[room]));
	});
	//USER LEAVES ROOM
	socket.on('room-leave', (user, room, socketId) => {
		console.log('disconnecting', socket.id);
		rooms[room] = rooms[room].filter((obj) => obj.user.socketId !== socketId);
		console.log(rooms);
	});
});
