'use client';

import { useRootDispatch } from '@/redux/hooks';
import { validateWord } from '@/redux/slices/gameSlice';
import { Button } from '@mui/material';

function PlayWord() {
	const dispatch = useRootDispatch();
	return <Button variant='contained' color='primary' onClick={() => dispatch(validateWord())}>Play Word</Button>;
}

export default PlayWord;
