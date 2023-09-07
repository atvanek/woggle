'use client';

import { Middleware } from '@reduxjs/toolkit';
import { startWord } from '../slices/gameSlice';
import coordinates from '@/utils/coordinates';
import handleAlert from '../helpers/handleAlert';

const validateBlockMiddleware: Middleware = (store) => (next) => (action) => {
	if (action.type === 'game/selectLetter') {
		const { selectedBlocks, wordStarted, possibleMoves } =
			store.getState().game;
		const { id } = action.payload;
		const { dispatch } = store;
		const currentCoordinates = coordinates[id];
		if (selectedBlocks.includes(String(currentCoordinates))) {
			handleAlert(dispatch, 'selected');
			return;
		}

		if (wordStarted && !possibleMoves.includes(String(currentCoordinates))) {
			handleAlert(dispatch, 'adjacent');
			return;
		}
		if (!selectedBlocks.length) {
			dispatch(startWord());
		}
	}
	return next(action);
};

export default validateBlockMiddleware;
