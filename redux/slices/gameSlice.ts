import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { generateMoves } from '@/utils/generateMoves';
import coordinates from '@/utils/coordinates';
import handleAlert from '../helpers/handleAlert';
import { RootState } from '../store';
import calculatePoints from '../helpers/calculatePoints';
import generateAlert from '../helpers/generateAlert';
import { GameState } from '@/types/types';

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
		timerId: null,
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
		playWord: (state) => {
			const { currentWord } = state;
			state.playedWords.push(currentWord);
			state.score += calculatePoints(currentWord);
		},

		resetBoard: (state) => {
			state.currentWord = '';
			state.wordStarted = false;
			state.selectedBlocks = [];
			state.possibleMoves = [];
			const selected = document.querySelectorAll('.selected');
			selected.forEach((block) => block.classList.remove('selected'));
		},
		triggerAlert: (
			state,
			action: PayloadAction<{ type: string; newTimerId: NodeJS.Timeout }>
		) => {
			const { type, newTimerId } = action.payload;
			const { timerId } = state.alert;
			if (timerId) {
				clearTimeout(timerId);
			}
			state.alert = generateAlert(type, newTimerId, state.currentWord);
		},
		resetAlert: (state) => {
			state.alert = {
				active: false,
				type: 'error',
				message: '',
				timerId: null,
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
	async (_, { dispatch, getState }) => {
		const { currentWord, playedWords } = (getState() as RootState).game;

		if (currentWord.length < 3) {
			handleAlert(dispatch, 'length', 3000);
			return;
		}
		if (playedWords.includes(currentWord)) {
			handleAlert(dispatch, 'played', 3000);
			return;
		}

		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord.toLowerCase()}`
			);
			if (res.ok) {
				dispatch(playWord());
			} else {
				handleAlert(dispatch, 'invalid', 3000);
			}
		} catch (err) {
			console.log(err);
		}
		dispatch(resetBoard());
	}
);

export const validateBlock = createAsyncThunk(
	'validateBlock',
	({ id, letter }: { id: string; letter: string }, { dispatch, getState }) => {
		const { selectedBlocks, possibleMoves, wordStarted } = (
			getState() as RootState
		).game;
		const currentCoordinates = coordinates[id];
		if (selectedBlocks.includes(String(coordinates))) {
			handleAlert(dispatch, 'selected', 3000);
			return;
		}
		if (wordStarted && !possibleMoves.includes(String(currentCoordinates))) {
			handleAlert(dispatch, 'adjacent', 3000);
			return;
		}
		if (selectedBlocks.length === 0) {
			dispatch(startWord());
		}
		dispatch(selectLetter({ letter, id }));
	}
);

export const gameReducer = gameSlice.reducer;
export const {
	selectLetter,
	resetBoard,
	playWord,
	triggerAlert,
	resetAlert,
	startWord,
	toggleTimed,
} = gameSlice.actions;
export default gameSlice;
