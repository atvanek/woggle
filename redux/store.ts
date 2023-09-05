import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/gameSlice';

const store = configureStore({
	reducer: {
		game: gameReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;
