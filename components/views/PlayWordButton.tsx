'use client';

import { useRootDispatch } from '@/redux/hooks';
import { validateWord } from '@/redux/slices/gameSlice';
import { Button } from '@mui/material';

function PlayWordButton() {
	const dispatch = useRootDispatch();
	return (
		<Button variant='contained' onClick={() => dispatch(validateWord())}>
			Play
		</Button>
	);
}

export default PlayWordButton;
