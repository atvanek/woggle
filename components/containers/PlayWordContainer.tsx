'use client';

import { useRootDispatch, useRootSelector } from '@/redux/hooks';
import { handleAlert, validateWord } from '@/redux/slices/gameSlice';
import PlayWordButton from '../PlayWordButton';
import { MouseEventHandler } from 'react';

function PlayWordButtonContainer() {
	const { currentWord, playedWords } = useRootSelector((state) => state.game);
	const dispatch = useRootDispatch();

	const handlePlayWord: MouseEventHandler<HTMLButtonElement> = () => {
		if (currentWord.length < 3) {
			dispatch(handleAlert('length'));
			return;
		}
		if (playedWords.includes(currentWord)) {
			dispatch(handleAlert('played'));
			return;
		}
		dispatch(validateWord(currentWord));
	};

	return <PlayWordButton handlePlayWord={handlePlayWord} />;
}

export default PlayWordButtonContainer;
