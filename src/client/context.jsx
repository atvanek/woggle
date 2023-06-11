import React, { createContext, useState } from 'react';
import { generateMoves } from '../utils/generateMoves.js';
import boxCoords from '../utils/coordinates.js';

const Context = createContext(null);

export function ContextProvider({ children }) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState('');
	const [selectedBoxes, setSelectedBoxes] = useState(new Set());
	const [wordStarted, setWordStarted] = useState(false);
	const [possibleMoves, setPossibleMoves] = useState(new Set());
	const [currentWord, setCurrentWord] = useState('');
	const [alert, setAlert] = useState({ type: '', message: '' });
	const [open, setOpen] = useState(false);
	const [alertTimer, setAlertTimer] = useState(null);
	const [timed, setTimed] = useState(false);
	const [timerStarted, setTimerStarted] = useState(false);
	const [score, setScore] = useState(0);
	const [playedWords, setPlayedWords] = useState(new Set());
	const [multiplayer, setMultiplayer] = useState(false);
	const [room, setRoom] = useState({});
	const [socket, setSocket] = useState();
	const [socketId, setSocketId] = useState();
	const [wordPoints, setWordPoints] = useState(0);
	const [starting, setStarting] = useState(false);

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
		const [boxes, moves] = generateMoves(coordinates, selectedBoxes);
		setPossibleMoves(moves);
		setSelectedBoxes(boxes);
		//updates current word
		setCurrentWord((prev) => {
			const newWord = prev + letter;
			return newWord;
		});
		//adds CSS styling
		const currentBox = document.getElementById(id);
		currentBox.classList.add('selected');
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
					setWordPoints(points);
					setScore((prev) => prev + points);

					//sends updated score to websocket server if in multiplayer mode
				} else {
					handleAlert('invalid');
				}
				//reset board
				clearBoard();
			});
	}

	function clearBoard() {
		setWordStarted(false);
		setPossibleMoves(new Set());
		setSelectedBoxes(new Set());
		setCurrentWord('');
		document
			.querySelectorAll('.cube')
			.forEach((node) => node.classList.remove('selected'));
	}

	function handleToggle(e) {
		if (timed) {
			setScore(0);
			setTimerStarted(false);
		}
		setTimed(e.target.checked);
	}

	return (
		<Context.Provider
			value={{
				loggedIn,
				setLoggedIn,
				user,
				setUser,
				setSelectedBoxes,
				setWordStarted,
				setPossibleMoves,
				currentWord,
				setCurrentWord,
				alert,
				open,
				handleAlert,
				handleBoxClick,
				timed,
				setTimed,
				timerStarted,
				setTimerStarted,
				validateWord,
				playedWords,
				setPlayedWords,
				clearBoard,
				multiplayer,
				setMultiplayer,
				room,
				setRoom,
				socket,
				setSocket,
				socketId,
				setSocketId,
				score,
				setScore,
				wordPoints,
				setWordPoints,
				handleToggle,
				starting,
				setStarting,
			}}>
			{children}
		</Context.Provider>
	);
}

export default Context;
