import React from 'react';
import Row from './Row.jsx';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import boxCoords from '../../utils/coordinates.js';
import generateLetters from '../../utils/generateLetters';
import Timer from './Timer.jsx';
import {
	Alert,
	Switch,
	Collapse,
	ToggleButtonGroup,
	ToggleButton,
	CircularProgress,
} from '@mui/material';

function Board({ serverLetters, room, socketId, user }) {
	const [letters, setLetters] = React.useState([]);
	const [wordStarted, setWordStarted] = React.useState(false);
	const [selectedBoxes, setSelectedBoxes] = React.useState(new Set());
	const [possibleMoves, setPossibleMoves] = React.useState(new Set());
	const [currentWord, setCurrentWord] = React.useState('');
	const [score, setScore] = React.useState(0);
	const [playedWords, setPlayedWords] = React.useState(new Set());
	const [multiplayer, setMultiplayer] = React.useState(false);
	const [playerScores, setPlayerScores] = React.useState([]);
	const navigate = useNavigate();
	const [timed, setTimed] = React.useState(false);
	const [timeLimit, setTimeLimit] = React.useState(1);
	const [timerStarted, setTimerStarted] = React.useState(false);
	const [alert, setAlert] = React.useState({ type: '', message: '' });
	const [alertTimer, setAlertTimer] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	//connect to websocket
	const socket = io('http://localhost:3000/');

	function calculatePossibleMoves(coordinates) {
		const x = coordinates[0];
		const y = coordinates[1];
		const adjacent = new Set();
		for (let i = x - 1; i < x + 2; i++) {
			if (i >= 0 && i <= 3) {
				for (let j = y - 1; j < y + 2; j++)
					if (j >= 0 && j <= 3 && !(i === x && j === y)) {
						adjacent.add(String([i, j]));
					}
			}
		}
		setSelectedBoxes((prev) => new Set(prev).add(String(coordinates)));
		setPossibleMoves(adjacent);
	}

	function handleBoxClick(id, letter) {
		const coordinates = boxCoords[id];

		//validating selected box
		if (selectedBoxes.has(String(coordinates))) {
			handleAlert('selected');
			return;
		}
		if (wordStarted && !possibleMoves.has(String(coordinates))) {
			handleAlert('adjacent');
			return;
		}
		//initiates new word
		if (selectedBoxes.size === 0) {
			setWordStarted(true);
		}

		//calculates next possible moves
		calculatePossibleMoves(coordinates);
		//updates current word
		setCurrentWord((prev) => {
			const newWord = prev + letter;
			return newWord;
		});
		//adds CSS styling
		const currentBox = document.getElementById(id);
		currentBox.classList.add('selected');
	}

	//logic for resetting board
	function clearBoard() {
		setWordStarted(false);
		setPossibleMoves(new Set());
		setSelectedBoxes(new Set());
		setCurrentWord('');
		document
			.querySelectorAll('.cube')
			.forEach((node) => node.classList.remove('selected'));
	}

	function handleAlert(type) {
		clearTimeout(alertTimer);
		setOpen(true);
		switch (type) {
			case 'length':
				setAlert({ type: 'error', message: 'Word must be at least 3 letters' });
				break;
			case 'played':
				setAlert({
					type: 'error',
					message: 'Word has already been played. Please choose new word',
				});
				break;
			case 'invalid':
				setAlert({ type: 'error', message: `${currentWord} is not a word` });
				break;
			case 'selected':
				setAlert({ type: 'error', message: 'Box already selected' });
				break;
			case 'adjacent':
				setAlert({ type: 'error', message: 'Please select adjacent box' });
				break;
		}

		setAlertTimer(
			setTimeout(() => {
				setOpen(false);
			}, 4000)
		);
	}
	//validates word
	function validateWord(e) {
		//checks word length
		if (currentWord.length < 3) {
			handleAlert('length');
			return;
		}
		//checks if player has already been played
		if (playedWords.has(currentWord)) {
			handleAlert('played');
			return;
		}
		e.preventDefault();
		// sends post request to server with selected word
		fetch('/api/testWord', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word: currentWord.toLowerCase() }),
		})
			.then((res) => res.json())
			.then((data) => {
				const { word } = data;
				console.log(word);
				if (word === 'valid') {
					setPlayedWords((prev) => new Set(prev).add(currentWord));
					//determines points of word
					let points;
					//calculates points based on word length
					if (currentWord.length < 5) {
						points = 1;
					} else if (currentWord.length < 6) {
						points = 2;
					} else if (currentWord.length < 7) {
						points = 3;
					} else if (currentWord.length < 8) {
						points = 5;
					} else {
						points = 11;
					}
					setScore((prev) => prev + points);
					//sends updated score to websocket server if in multiplayer mode
					if (multiplayer) {
						socket.emit('update-score', user, room, score + points, socketId);
					}
				} else {
					handleAlert('invalid');
				}
				//reset board
				clearBoard();
			});
	}

	//logic for initial render of board and letters
	React.useEffect(() => {
		setLetters(generateLetters());
		//if Board is rendered as passed letters from server
		if (serverLetters?.length) {
			//use those letters
			setLetters(serverLetters);
			//multiplayer-mode
			setMultiplayer(true);
			//adds board to room via websocket server
			socket.emit('new-board', room);
		}
	}, []);

	//ALL EMITTED EVENTS

	//any player adds to current score
	socket.on('new-scores', (newScores) => {
		//sets player scores
		setPlayerScores(JSON.parse(newScores));
	});

	//end game logic
	socket.on('end-game', (scores) => {
		//generates string for end-game pop-up
		//determines winner
		let highScore = 0;
		let winner = '';
		const parsedScores = JSON.parse(scores);
		const finalScores = parsedScores.map((obj) => {
			if (obj.user.score > highScore) {
				highScore = obj.user.score;
				winner = obj.user.username;
			}
			return `${obj.user.username}: ${obj.user.score}\n`;
		});
		//pop-up
		window.alert(
			`Game ended!\nFinal Scores:\n${finalScores.join(
				''
			)}\n${winner} is the winner!`
		);
		socket.disconnect();
		//re-route to homescreen
		navigate('/');
	});

	const rows = letters.map((arr, i) => (
		<Row
			id={`row-${i + 1}`}
			row={i + 1}
			key={i + 1}
			letters={arr}
			handleClick={handleBoxClick}
		/>
	));

	return (
		<main className='flex around m-10'>
			{multiplayer && (
				<section id='players-scores' className='flex column m-10'>
					<h3>Players Scores</h3>
					{playerScores.length > 0 &&
						playerScores.map((obj, i) => (
							<p key={i}>
								{obj.user.username}: {obj.user?.score}
							</p>
						))}
				</section>
			)}
			<section id='board' className='flex column center'>
				<div
					id='timed-wrapper'
					className={`flex center-all m-10 ${timed ? 'timed' : ''}`}>
					untimed
					<Switch
						color='warning'
						onChange={(e) => {
							if (timed) {
								setScore(0);
								setTimerStarted(false);
							}
							setTimed(e.target.checked);
						}}
					/>
					timed
				</div>

				<div id='block-container'>
					{letters.length > 1 ? (
						rows
					) : (
						<div className='flex' style={{ height: '100%' }}>
							<CircularProgress sx={{ margin: 'auto' }} />
						</div>
					)}
				</div>
				<div id='alert-wrapper'>
					<Collapse in={open}>
						<Alert severity={alert.type}>{alert.message}</Alert>
					</Collapse>
				</div>

				<div id='score'>Score: {score}</div>
				<Collapse in={timed && !timerStarted}>
					<div className='flex center-all'>
						<div className='flex column center-all'>
							<h3>Choose Time Limit</h3>
							<ToggleButtonGroup
								value={timeLimit}
								onChange={(e, limit) => setTimeLimit(limit)}
								sx={{
									backgroundColor: '#32ec70',
									margin: '10px',
									boxShadow: '3px 3px 5px black',
									button: {
										boxShadow: 'none',
										fontFamily: 'Georgia',
										backgroundColor: 'white',
										textTransform: 'none',
										'&:hover': {
											backgroundColor: 'rgb(255, 230, 89)',
											transform: 'none',
										},
									},
								}}
								exclusive>
								<ToggleButton value={1}>1 min</ToggleButton>
								<ToggleButton value={2}>2 min</ToggleButton>
								<ToggleButton value={3}>3 min</ToggleButton>
							</ToggleButtonGroup>
							<div className='flex column'>
								<p>Time Limit: {timeLimit} min</p>
								<button
									className='green'
									onClick={(e) => {
										setTimerStarted(true);
										setScore(0);
										setLetters(generateLetters);
									}}>
									Start Game
								</button>
							</div>
						</div>
					</div>
				</Collapse>
				<div className='flex center-all'>
					{timed && timerStarted && <Timer time={timeLimit * 60} />}
				</div>
				<div className='flex around m-10'>
					<button
						id='validate'
						className='button-size'
						onClick={validateWord}
						disabled={timed && !timerStarted}>
						Validate word
					</button>

					<button
						id='reset'
						className='button-size'
						onClick={() => {
							console.log(currentWord);
							clearBoard();
						}}
						disabled={timed && !timerStarted}>
						Reset Word
					</button>
				</div>
			</section>
			<section id='played-list' className='flex column p-10'>
				<h3>Played words</h3>
				<div id='played-words'>
					{[...playedWords].map((word) => {
						return (
							<div className='played-box-container'>
								{word.split('').map((letter) => {
									return (
										<span className='played-box center-all'>{letter}</span>
									);
								})}
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
}
export default Board;
