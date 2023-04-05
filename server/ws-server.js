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

const users = [];

io.on('connect', (socket) => {
	//USER JOINS A ROOM
	socket.on('join-room', (user, id) => {
		users.push(socket.id);
		socket.join(id);
		if (user === 'guest') {
			rooms[id].push(`${user}${rooms[id].length + 1}`);
		} else {
			rooms[id].push(user);
		}
		console.log('joined room', id, users, rooms);
		io.in(id).emit('user-added', rooms[id]);
	});

	//SERVER GENERATED LETTERS (WILL MOVE TO OWN MODULE)
	function generateLetters() {
		const lettersGrid = [];
		const blocks = [
			'AAEEGN',
			'ABBJOO',
			'ACHOPS',
			'AFFKPS',
			'AOOTTW',
			'CIMOTU',
			'DEILRX',
			'DELRVY',
			'DISTTY',
			'EEGHNW',
			'EEINSU',
			'EHRTVW',
			'EIOSST',
			'ELRTTY',
			'HIMNQU',
			'HLNNRZ',
		];

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
	//USER LEAVES ROOM
	socket.on('room-leave', (user, id) => {
		console.log('disconnecting', socket.id);
		rooms[id].splice(rooms[id].indexOf(user), 1);
		users.splice(users.indexOf(socket.id), 1);
		console.log(rooms, users);
	});
});
