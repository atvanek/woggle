'use client';

import { useRootDispatch, useRootSelector } from '@/redux/hooks';
import { validateWord, createAlert} from '@/redux/slices/gameSlice';
import PlayWordButton from '../views/PlayWordButton';
import { MouseEventHandler } from 'react';

function PlayWordButtonContainer() {
	const { currentWord, playedWords } = useRootSelector((state) => state.game);
	const dispatch = useRootDispatch();

	const handlePlayWord: MouseEventHandler<HTMLButtonElement> = () => {
		if (currentWord.length < 3) {
			dispatch(createAlert('length'));
			return;
		}
		if (playedWords.includes(currentWord)) {
			dispatch(createAlert('played'));
			return;
		}
		dispatch(validateWord(currentWord));
	};

	return <PlayWordButton handlePlayWord={handlePlayWord} />;
}

export default PlayWordButtonContainer;
