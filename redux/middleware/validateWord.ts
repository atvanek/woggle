import { Middleware } from '@reduxjs/toolkit';
import handleAlert from '../helpers/handleAlert';

const validateWordMiddleware: Middleware = (store) => (next) => (action) => {
	if (action.type === 'game/validateWord') {
		const { currentWord, playedWords } = store.getState().game;
		const { dispatch } = store;
		if (currentWord.length < 3) {
			handleAlert(dispatch, 'length', 3000);
			return;
		}
		if (playedWords.includes(currentWord)) {
			handleAlert(dispatch, 'played', 3000);
			return;
		}
	}
	return next(action);
};

export default validateWordMiddleware;
