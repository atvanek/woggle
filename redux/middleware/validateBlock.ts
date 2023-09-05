'use client';

import { Middleware } from '@reduxjs/toolkit';
import { startWord } from '../slices/gameSlice';
import coordinates from '@/utils/coordinates';
import { createAlert } from '../slices/gameSlice';

const validateBlockMiddleware: Middleware = (store) => (next) => (action) => {
	if (action.type === 'game/selectLetter') {
		const { selectedBlocks, wordStarted, possibleMoves } =
			store.getState().game;
		console.log(wordStarted);
		const { id } = action.payload;
		const { dispatch } = store;
		const currentCoordinates = coordinates[id];
		if (selectedBlocks.includes(String(currentCoordinates))) {
			return dispatch(createAlert('selected'));
		}
		if (wordStarted && !possibleMoves.includes(String(currentCoordinates))) {
			return dispatch(createAlert('adjacent'));
		}
		if (!selectedBlocks.length) {
			dispatch(startWord());
		}
	}
	return next(action);
};

export default validateBlockMiddleware;
