const express = require('express');
const app = express();
const PORT = 3000;
const userController = require('./controllers/userController');

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

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
