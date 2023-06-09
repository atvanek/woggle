//username, room, websocket, score data
const rooms = {
	1: [],
	2: [],
	3: [],
	4: [],
};

import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.1/oakCors.ts';
import { serve } from 'https://deno.land/std@0.166.0/http/server.ts';
import { Server } from 'https://deno.land/x/socket_io@0.2.0/mod.ts';
import generateLetters from '../utils/generateLetters.js';
const app = new Application();
const router = new Router();
const io = new Server({
	cors: {
		origin: 'http://localhost:8080',
		methods: ['GET', 'POST'],
	},
});

app.use(router.routes());

app.use(oakCors({ origin: ['http://localhost:8080'] }));

router.post('/api/testWord', async ({ request, response }) => {
	console.log(request);
	const { word } = await request.body().value;
	console.log(word);
	const res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
	);
	const data = await res.json();
	response.body = { word: `${Array.isArray(data) ? 'valid' : 'invalid'}` };
});

//websocket logic
io.on('connection', (socket) => {
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

	//GAME STARTED
	socket.on('game-start', (id) => {
		const letters = generateLetters();
		// lets all rooms know letters are ready to be rendered
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

const handler = io.handler(async (req) => {
	return (await app.handle(req)) || new Response(null, { status: 404 });
});

await serve(handler, {
	port: 3000,
});

app.listen({ port: 3000 });
