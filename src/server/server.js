import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userController from './controllers/userController.js';
const app = express();
const PORT = 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:8080'],
	},
});

app.use(express.json());

app.get('/api/room/:id', (req, res) => {
	const { id } = req.params;
	res.status(200).json(`You are in room ${id}`);
});

app.post('/api/login', userController.verifyUser, (req, res) => {
	res.status(200).json({ verified: true });
});
app.post('/api/user', userController.createUser, (req, res) => {
	res.status(200).json(res.locals.newUser);
});

app.use('/api/testWord', (req, res) => {
	console.log(req.body);
	const { word } = req.body;
	console.log(req.body);
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			if (!Array.isArray(data)) {
				console.log('invalid');
				res.json({ word: 'invalid' });
			} else {
				res.json({ word: 'valid' });
			}
		});
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ error: err });
});

import generateLetters from '../utils/generateLetters.js';
import blocks from '../utils/blocks.js';

//username, room, websocket, score data
const rooms = {
	1: [],
	2: [],
	3: [],
	4: [],
};

//websocket logic
io.on('connect', (socket) => {
	console.log('CONNECTION');
	//USER JOINS A ROOM
	socket.on('join-room', (user, room, socketId) => {
		socket.join(room);
		//generate username if not logged-in
		const username = user === 'guest' ? `guest${rooms[room].length + 1}` : user;
		//add user to room obj
		rooms[room].push({ user: { username: username, socketId: socketId } });
		//emit user-added event to all users in current room
		io.in(room).emit('user-added', JSON.stringify(rooms[room]), username);
		//emits username-generated event to new socket
		io.to(socketId).emit('username-generated', username);
	});
	socket.on('new-board', (room) => {
		//adds board to room
		socket.join(room);
	});

	//SERVER GENERATED LETTERS (WILL MOVE TO OWN MODULE)
	function generateLetters() {
		const blocksCopy = [...blocks];
		const lettersGrid = [];
		let column = 0;
		let row = 0;
		let id = 1;
		let currentRow = [];
		while (blocksCopy.length) {
			const randomIndex = Math.floor(Math.random() * blocksCopy.length);
			const randomBlock = blocksCopy[randomIndex];
			const randomLetterIndex = Math.floor(Math.random() * 6);
			currentRow.push(randomBlock[randomLetterIndex]);
			blocksCopy.splice(randomIndex, 1);
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
		//lets all rooms know letters are ready to be rendered
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
			}
		}
		console.log(rooms[room]);
		io.in(room).emit('new-scores', JSON.stringify(rooms[room]));
	});
	//GAME ENDED
	socket.on('game-end', (room) => {
		io.in(room).emit('end-game', JSON.stringify(rooms[room]));
		rooms[room] = [];
	});
	//USER LEAVES ROOM
	socket.on('room-leave', (user, room, socketId) => {
		console.log('disconnecting', socket.id, rooms[room], room);
		rooms[room] = rooms[room].filter((obj) => obj.user.socketId !== socketId);
		io.in(room).emit('user-added', JSON.stringify(rooms[room]));
		console.log(rooms);
	});
});

httpServer.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
