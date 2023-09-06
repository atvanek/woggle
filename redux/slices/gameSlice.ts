import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { generateMoves } from '@/utils/generateMoves';
import { AlertColor } from '@mui/material';
import coordinates from '@/utils/coordinates';
import handleAlert from '../helpers/handleAlert';
import { RootState } from '../store';
import { MouseEventHandler } from 'react';
type Alert = {
	active: boolean;
	message: string;
	type: AlertColor;
	timerId: NodeJS.Timeout | null;
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
			let points: number;
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
		triggerAlert: (
			state,
			action: PayloadAction<{ type: string; newTimerId: NodeJS.Timeout }>
		) => {
			const { type, newTimerId } = action.payload;
			const { timerId } = state.alert;
			if (timerId) {
				clearTimeout(timerId);
			}
			const newAlert: Alert = {
				message: '',
				type: 'error',
				active: true,
				timerId: newTimerId,
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
					newAlert.message = `${state.currentWord.toLowerCase()} is not a word`;
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
	async (
		{ id, letter }: { id: string; letter: string },
		{ dispatch, getState }
	) => {
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
