import React from 'react';
import Row from './Row';
import { Link } from 'react-router-dom';

function Board({ serverLetters }) {
	const [letters, setLetters] = React.useState([]);
	const [wordStarted, setWordStarted] = React.useState(false);
	const [selectedBoxes, setSelectedBoxes] = React.useState(new Set());
	const [possibleMoves, setPossibleMoves] = React.useState(new Set());
	const [currentWord, setCurrentWord] = React.useState('');
	const [score, setScore] = React.useState(0);
	const [playedWords, setPlayedWords] = React.useState(new Set());
	const [boxCoords, setBoxCoords] = React.useState({});

	function populateBoard() {
		const coordinates = {};
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
			coordinates[id] = [row, column];
			column++;
			id++;
			if (column === 4) {
				lettersGrid.push(currentRow);
				currentRow = [];
				column = 0;
				row++;
			}
		}

		setLetters(lettersGrid);
		setBoxCoords(coordinates);
	}

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

	function handleBoxClick(e) {
		const coordinates = boxCoords[e.target.id];
		if (selectedBoxes.has(String(coordinates))) {
			window.alert('please select new box');
			return;
		}
		if (wordStarted && !possibleMoves.has(String(coordinates))) {
			window.alert('please select adjacent box');
			return;
		}

		if (selectedBoxes.size === 0) {
			setWordStarted(true);
		}
		console.log(e.target.innerText);
		calculatePossibleMoves(coordinates);
		setCurrentWord((prev) => {
			const newWord = prev + e.target.innerText;
			return newWord;
		});
		e.target.classList.add('selected');
	}

	function clearBoard() {
		setWordStarted(false);
		setPossibleMoves(new Set());
		setSelectedBoxes(new Set());
		setCurrentWord('');
		document
			.querySelectorAll('.box')
			.forEach((node) => node.classList.remove('selected'));
	}

	function validateWord(e) {
		if (currentWord.length < 3) {
			window.alert('word must be at least 3 letters');
			return;
		}
		if (playedWords.has(currentWord)) {
			window.alert('word has already been played. Please choose new word.');
			return;
		}
		e.preventDefault();
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
				} else {
					window.alert(`${currentWord} is not a word!`);
				}
				clearBoard();
			});
	}

	React.useEffect(() => {
		populateBoard();
		if (serverLetters?.length) {
			setLetters(serverLetters);
		}
	}, []);

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
		<main className='flex around'>
			<section id='board' className='flex column center'>
				{rows}
				<div id='score'>Score: {score}</div>
				<div className='flex around m-10'>
					<button className='button-size' onClick={validateWord}>
						Validate word
					</button>

					<button
						className='button-size'
						onClick={() => {
							console.log(currentWord);
							clearBoard();
						}}>
						Reset Word
					</button>
				</div>
			</section>
			<section id='played-list' className='flex border column'>
				<h3>Played words</h3>
				{playedWords.size > 0 &&
					[...playedWords].map((word, i) => <p key={i}>{word}</p>)}
			</section>
		</main>
	);
}
export default Board;
