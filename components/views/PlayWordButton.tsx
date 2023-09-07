'use client';

import { useRootDispatch } from '@/redux/hooks';
import { validateWord } from '@/redux/slices/gameSlice';

function PlayWordButton() {
	const dispatch = useRootDispatch();
	return <button onClick={() => dispatch(validateWord())}>Play Word</button>;
}

export default PlayWordButton;
