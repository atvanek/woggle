'use client';

import { useRootDispatch, useRootSelector } from '@/redux/hooks';
import { validateWord } from '@/redux/slices/gameSlice';
import PlayWordButton from '../views/PlayWordButton';
import { MouseEventHandler } from 'react';
import handleAlert from '@/redux/helpers/handleAlert';

function PlayWordContainer() {
	const { currentWord, playedWords } = useRootSelector((state) => state.game);
	const dispatch = useRootDispatch();

	const handlePlayWord: MouseEventHandler<HTMLButtonElement> = () => {
		if (currentWord.length < 3) {
			handleAlert(dispatch, 'length', 3000);
			return;
		}
		if (playedWords.includes(currentWord)) {
			handleAlert(dispatch, 'played', 3000);
			return;
		}
		dispatch(validateWord());
	};

	return <PlayWordButton handlePlayWord={handlePlayWord} />;
}

export default PlayWordContainer;
