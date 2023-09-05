'use client';

import { useRootDispatch } from '@/redux/hooks';
import { resetBoard } from '@/redux/slices/gameSlice';

function ResetButton() {
	const dispatch = useRootDispatch();
	return <button onClick={() => dispatch(resetBoard())}>Reset Word</button>;
}

export default ResetButton;
