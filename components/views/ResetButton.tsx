'use client';

import { useRootDispatch } from '@/redux/hooks';
import { resetBoard } from '@/redux/slices/gameSlice';
import { Button } from '@mui/material';

function ResetButton() {
	const dispatch = useRootDispatch();
	return <Button onClick={() => dispatch(resetBoard())}>Reset Word</Button>;
}

export default ResetButton;
