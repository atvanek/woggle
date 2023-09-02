import { createSlice } from '@reduxjs/toolkit';
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
};

const initialState: GameState = {
	currentWord: '',
	wordStarted: false,
	selectedBlocks: new Set(),
	possibleMoves: new Set(),
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
			state.selectedBlocks = blocks;
			const currentBox = document.getElementById(id);
			currentBox?.classList.add('selected');
			state.currentWord += letter;
		},
		resetWord: (state) => {
			state.currentWord = '';
			state.wordStarted = false;
			state.selectedBlocks = new Set();
			state.possibleMoves = new Set();
		},
	},
});

export const gameReducer = gameSlice.reducer;
export const { selectLetter, resetWord } = gameSlice.actions;
export default gameSlice;
