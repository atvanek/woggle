'use client';

import { useRootDispatch, useRootSelector } from '@/redux/hooks';
import { validateWord } from '@/redux/slices/gameSlice';

function PlayWordButton() {
	const word = useRootSelector((state) => state.game.currentWord);
	const dispatch = useRootDispatch();
	return (
		<button onClick={() => dispatch(validateWord(word))}>Play Word</button>
	);
}

export default PlayWordButton
