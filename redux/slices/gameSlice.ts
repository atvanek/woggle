import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { generateMoves } from '@/utils/generateMoves';
import { AlertColor } from '@mui/material';
import coordinates from '@/utils/coordinates';

type Alert = {
	active: boolean;
	message: string;
	type: AlertColor;
};

export type GameState = {
	currentWord: string;
	selectedBlocks: string[];
	possibleMoves: string[];
	wordStarted: boolean;
	score: number;
	alert: Alert;
	playedWords: string[];
	timed: boolean;
};

const initialState: GameState = {
	currentWord: '',
	wordStarted: false,
	selectedBlocks: [],
	possibleMoves: [],
	score: 0,
	alert: {
		active: false,
		message: '',
		type: 'error',
	},
	playedWords: [],
	timed: false,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		selectLetter: (
			state,
			action: PayloadAction<{
				letter: string;
				id: string;
			}>
		) => {
			const { letter, id } = action.payload;
			const currentCoordinates = coordinates[id];
			const [blocks, moves] = generateMoves(
				currentCoordinates,
				state.selectedBlocks
			);
			state.possibleMoves = moves;
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

		resetBoard: (state) => {
			state.currentWord = '';
			state.wordStarted = false;
			state.selectedBlocks = [];
			state.possibleMoves = [];
			const selected = document.querySelectorAll('.selected');
			selected.forEach((block) => block.classList.remove('selected'));
		},
		createAlert: (state, action: PayloadAction<string>) => {
			const type = action.payload;
			const newAlert: Alert = {
				message: '',
				type: 'error',
				active: true,
			};
			switch (type) {
				case 'length':
					newAlert.type = 'error';
					newAlert.message = 'Word must be at least 3 letters';
					break;
				case 'played':
					newAlert.type = 'error';
					newAlert.message =
						'Word has already been played. Please choose new word';
					break;
				case 'invalid':
					newAlert.type = 'error';
					newAlert.message = `${state.currentWord} is not a word`;
					break;
				case 'selected':
					newAlert.type = 'error';
					newAlert.message = 'Box already selected';
					break;
				case 'adjacent':
					newAlert.type = 'error';
					newAlert.message = 'Please select adjacent box';
					break;
			}
			state.alert = newAlert;
		},
		resetAlert: (state) => {
			state.alert = {
				active: false,
				type: 'error',
				message: '',
			};
		},
		startWord: (state) => {
			state.wordStarted = true;
		},
		toggleTimed: (state) => {
			state.timed = !state.timed;
		},
	},
});

export const validateWord = createAsyncThunk(
	'validateWord',
	async (word: string, { dispatch }) => {
		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
			);
			if (res.ok) {
				dispatch(validWord(word));
			} else {
				dispatch(createAlert('invalidWord'));
			}
		} catch (err) {
			console.log(err);
		}
		dispatch(resetBoard());
	}
);

export const gameReducer = gameSlice.reducer;
export const {
	selectLetter,
	resetBoard,
	validWord,
	createAlert,
	resetAlert,
	startWord,
	toggleTimed,
} = gameSlice.actions;
export default gameSlice;
