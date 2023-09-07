import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { generateMoves } from '@/utils/generateMoves';
import coordinates from '@/utils/coordinates';
import handleAlert from '../helpers/handleAlert';
import { RootState } from '../store';
import calculateScore from '../helpers/calculateScore';
import createAlert from '../helpers/createAlert';
import { AlertType, GameState } from '@/types/gameSliceTypes';

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
			state.score += calculateScore(currentWord);
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
			action: PayloadAction<{ type: AlertType; newTimerId: NodeJS.Timeout }>
		) => {
			const { type, newTimerId } = action.payload;
			const { currentWord } = state;
			const { timerId } = state.alert;
			if (timerId) {
				clearTimeout(timerId);
			}
			state.alert = createAlert(type, currentWord, newTimerId);
		},
		resetAlert: (state) => {
			state.alert = {
				active: false,
				type: state.alert.type,
				message: state.alert.message,
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
	async (_, { getState, dispatch }) => {
		const { currentWord, playedWords } = (getState() as RootState).game;
		if (currentWord.length < 3) {
			handleAlert(dispatch, 'length');
			return;
		}
		if (playedWords.includes(currentWord)) {
			handleAlert(dispatch, 'played');
			return;
		}
		try {
			const { currentWord } = (getState() as RootState).game;
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord.toLowerCase()}`
			);
			if (res.ok) {
				dispatch(playWord());
				handleAlert(dispatch, 'validated');
			} else {
				handleAlert(dispatch, 'invalid');
			}
		} catch (err) {
			handleAlert(dispatch, 'fetchError');
		}
		dispatch(resetBoard());
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
