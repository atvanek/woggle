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

app.get('room/:id', (req, res) => {
	const { id } = req.params;
	res.status(200).json(`You are in room ${id}`);
});

app.post('/login', userController.verifyUser, (_req, res) => {
	res.status(200).json({ verified: true });
});
app.post('user', userController.createUser, (_req, res) => {
	res.status(200).json(res.locals.newUser);
});

app.use('/testWord', (req, res) => {
	const { word } = req.body;
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (!Array.isArray(data)) {
				res.json({ word: 'invalid' });
			} else {
				res.json({ word: 'valid' });
			}
		});
});

app.use((err, _req, res, _next) => {
	console.log(err);
	res.status(500).send({ error: err });
});

import generateLetters from '../utils/generateLetters.js';

//username, room, websocket, score data
const users = {};

//websocket logic
io.on('connect', (socket) => {
	//USER JOINS A ROOM
	socket.on('join-room', (user, room, socketId) => {
		//add user to room
		socket.join(room);
		console.log('this is the roommm', room);
		//retrieve list of socket ids in current room
		const currentRoom = [...io.sockets.adapter.rooms.get(room)];
		console.log(currentRoom);
		//generate username if not logged-in
		const username = !user ? `guest${currentRoom.length + 1}` : user;
		const host = currentRoom.length === 1
		//add user to users obj
		users[socketId] = { username, score: 0, host };
		//grab all usernames in current room
		const roomUsers = currentRoom.map((socketId) => {
			const { username } = users[socketId];
			return username;
		});
		
		//emit user-added event to all users in current room
		io.in(room).emit('user-added', JSON.stringify(roomUsers));
		// emits username-generated event to new socket
		io.to(socketId).emit('username-generated', username, host);
	});
	socket.on('new-board', (room) => {
		//adds board to room
		socket.join(room);
	});
	//GAME STARTED
	socket.on('game-start', (id) => {
		const letters = generateLetters();
		//lets all rooms know letters are ready to be rendered
		io.in(id).emit('letters-ready', letters);
	});

	//UPDATE SCORE
	socket.on('update-score', (room, score, socketId) => {
		const currentRoom = [...io.sockets.adapter.rooms.get(room)];
		//set new score for current user
		users[socketId].score = score;
		//grab username and scores of all players in room
		const scores = currentRoom.map((socketId) => {
			const { username, score } = users[socketId];
			return { username, score };
		});
		//send new scores to all players
		io.in(room).emit('new-scores', JSON.stringify(scores));
	});
	//GAME ENDED
	socket.on('game-end', (room) => {
		const currentRoom = [...io.of('/').adapter.rooms.get(room)];
		const scores = currentRoom.map((socketId) => {
			const { username, score } = users[socketId];
			return { username, score };
		});
		//send final scores to all players
		io.in(room).emit('end-game', JSON.stringify(scores));
	});
	//USER LEAVES ROOM
	socket.on('disconnect', () => {
		delete users[socket.id];
		console.log('disconndexted');
	});
});

httpServer.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
