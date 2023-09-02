import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type GameState = {
	currentLetters: string[];
};

const initialState: GameState = { currentLetters: [] };

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		selectLetter: (state, action: PayloadAction<string>) => {
			state.currentLetters.push(action.payload);
		},
		resetWord: (state) => {
			state.currentLetters = [];
		},
	},
});

export const gameReducer = gameSlice.reducer;
export const { selectLetter, resetWord } = gameSlice.actions;
export default gameSlice;
