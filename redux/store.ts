import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/gameSlice';
import validateBlockMiddleware from './middleware/validateBlock';
import validateWordMiddleware from './middleware/validateWord';

const store = configureStore({
	reducer: {
		game: gameReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			validateBlockMiddleware,
			validateWordMiddleware
		),
});
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;
