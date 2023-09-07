'use client';

import { useRootDispatch } from '@/redux/hooks';
import { validateWord } from '@/redux/slices/gameSlice';
import { Button } from '@mui/material';

function PlayWordButton() {
	const dispatch = useRootDispatch();
	return <Button onClick={() => dispatch(validateWord())}>Play Word</Button>;
}

export default PlayWordButton;
