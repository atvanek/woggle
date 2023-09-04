import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import coordinates from '@/utils/coordinates';
import { generateMoves } from '@/utils/generateMoves';
import { enableMapSet } from 'immer';

enableMapSet();

export type GameState = {
	currentWord: string;
	selectedBlocks: string[];
	possibleMoves: string[];
	wordStarted: boolean;
	score: number;
	alert: {
		active: boolean;
		message: string;
		timerId: NodeJS.Timeout | null;
	};
	playedWords: string[];
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
		timerId: null,
	},
	playedWords: [],
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
				currentCoordinates: [number, number];
			}>
		) => {
			const { letter, id, currentCoordinates } = action.payload;
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
		validateBlock: (state, action) => {},
		createAlert: (
			state,
			action: PayloadAction<{ type: string; timerId: NodeJS.Timeout }>
		) => {
			const { timerId } = action.payload;
			if (state.alert.timerId) {
				clearTimeout(state.alert.timerId);
			}

			state.alert = {
				active: true,
				message: 'This is an alert',
				timerId,
			};
		},
		resetAlert: (state) => {
			state.alert = {
				active: false,
				message: '',
				timerId: null,
			};
		},
		startWord: (state) => {
			state.wordStarted = true;
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
				dispatch(handleAlert('invalidWord'));
			}
		} catch (err) {
			console.log(err);
		}
		dispatch(resetBoard());
	}
);

export const handleAlert = createAsyncThunk(
	'handleAlert',
	async (type: string, { dispatch }) => {
		const timerId = setTimeout(() => {
			dispatch(resetAlert());
		}, 3000);
		dispatch(createAlert({ type, timerId }));
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
} = gameSlice.actions;
export default gameSlice;
