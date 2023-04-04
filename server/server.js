const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

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

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
