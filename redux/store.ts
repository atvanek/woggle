import { configureStore} from '@reduxjs/toolkit';
import { gameReducer } from './slices/gameSlice';
import validateBlockMiddleware from './middleware/validateBlock';

const store = configureStore({
	reducer: {
		game: gameReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(validateBlockMiddleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;
