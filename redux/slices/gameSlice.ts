import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import coordinates from '@/utils/coordinates';
import { generateMoves } from '@/utils/generateMoves';
import { enableMapSet } from 'immer';

enableMapSet();

export type GameState = {
	currentWord: string;
	selectedBlocks: Set<string>;
	possibleMoves: Set<string>;
	wordStarted: boolean;
	score: number;
	alert: {
		active: boolean;
		message: string;
	};
	playedWords: string[];
};

const initialState: GameState = {
	currentWord: '',
	wordStarted: false,
	selectedBlocks: new Set(),
	possibleMoves: new Set(),
	score: 0,
	alert: {
		active: false,
		message: '',
	},
	playedWords: [],
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		selectLetter: (
			state,
			action: PayloadAction<{ letter: string; id: string }>
		) => {
			const { letter, id } = action.payload;
			const currentCoordinates = coordinates[id];
			if (state.selectedBlocks.has(String(coordinates))) {
				window.alert('block already selected');
				return;
			}
			if (
				state.wordStarted &&
				!state.possibleMoves.has(String(currentCoordinates))
			) {
				window.alert('please choose adjacent block');
				return;
			}
			if (state.selectedBlocks.size === 0) {
				state.wordStarted = true;
			}
			const [blocks, moves] = generateMoves(
				currentCoordinates,
				state.selectedBlocks
			);
			state.possibleMoves = moves;
			console.log(moves);
			state.selectedBlocks = blocks;
			const currentBox = document.getElementById(id);
			currentBox?.classList.add('selected');
			state.currentWord += letter;
		},
		validWord: (state, action) => {
			const word = action.payload;
			state.playedWords.push(word);
			let points: number;
			if (word.length < 5) {
				points = 1;
			} else if (word.length < 6) {
				points = 2;
			} else if (word.length < 7) {
				points = 3;
			} else if (word.length < 8) {
				points = 5;
			} else {
				points = 11;
			}
			state.score += points;
		},
		invalidWord: (state, action) => {
			const word = action.payload;
			state.alert = {
				active: true,
				message: word,
			};
		},
		resetBoard: (state) => {
			state.currentWord = '';
			state.wordStarted = false;
			state.selectedBlocks = new Set();
			state.possibleMoves = new Set();
			const selected = document.querySelectorAll('.selected');
			selected.forEach((block) => block.classList.remove('selected'));
		},
	},
});

export const validateWord = createAsyncThunk(
	'validateWord',
	async (word: string, { dispatch }) => {
		const res = await fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
		);
		const data = await res.json();
		if (Array.isArray(data)) {
			dispatch(validWord(word));
		} else {
			dispatch(invalidWord(word));
		}
		dispatch(resetBoard());
	}
);

export const gameReducer = gameSlice.reducer;
export const { selectLetter, resetBoard, invalidWord, validWord } =
	gameSlice.actions;
export default gameSlice;
